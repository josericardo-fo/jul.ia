import os

from dotenv import load_dotenv
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents.stuff import create_stuff_documents_chain
from langchain_chroma import Chroma
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

CHROMA_PATH = "chroma"


def get_api_key():
    """Carrega as variáveis de ambiente necessárias, como a chave da API."""
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError(
            "OPENAI_API_KEY não encontrada no ambiente. Verifique o arquivo .env."
        )
    return api_key


def main():
    """Função principal para interagir com o usuário."""
    conversational_rag_chain = RunnableWithMessageHistory(
        create_conversational_chain(),
        get_session_history,
        input_messages_key="input",
        history_messages_key="chat_history",
        output_messages_key="answer",
    )

    session_id = "abc123"  # Pode ser gerado dinamicamente em uma aplicação real

    while True:
        user_input = input("Você: ")
        if user_input.lower() in ["sair", "exit", "quit"]:
            print("Encerrando a conversa.")
            break

        answer = conversational_rag_chain.invoke(
            {"input": user_input},
            config={"configurable": {"session_id": session_id}},
        )["answer"]

        print(f"Jul.ia: {answer}\n")


def create_conversational_chain():
    """Cria a cadeia conversacional RAG com histórico de mensagens."""
    api_key = get_api_key()
    llm = ChatOpenAI(model="gpt-3.5-turbo-0125", api_key=api_key)

    # Carrega o vectorstore existente do Chroma
    vectorstore = Chroma(
        persist_directory=CHROMA_PATH, embedding_function=OpenAIEmbeddings()
    )

    # Configuração do prompt para contextualizar as perguntas do usuário
    contextualize_q_system_prompt = """
    Você é um assistente conversacional especializado em fornecer respostas contextualizadas com base em informações armazenadas.
    Reformule a pergunta do usuário se necessário, considerando o contexto fornecido pela história do chat. Caso a pergunta já esteja clara, retorne-a como está.
    """
    contextualize_q_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", contextualize_q_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )

    # Criação de um retriever consciente do histórico do chat
    retriever = vectorstore.as_retriever()
    history_aware_retriever = create_history_aware_retriever(
        llm, retriever, contextualize_q_prompt
    )

    # Configuração do prompt para responder às perguntas do usuário
    system_prompt = """
    Você é um assistente de IA pronto para responder perguntas baseadas em informações armazenadas.
    Se você não souber a resposta, diga apenas que não sabe. Use no máximo três frases e mantenha a resposta concisa.
    \n\n
    {context}
    """
    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )

    # Criação da cadeia de perguntas e respostas
    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    return rag_chain


store = {}


def get_session_history(session_id: str) -> BaseChatMessageHistory:
    """Retorna o histórico de mensagens para uma sessão específica."""
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]


if __name__ == "__main__":
    main()
