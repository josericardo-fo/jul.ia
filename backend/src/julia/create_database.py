import os
import shutil
from pathlib import Path

from dotenv import load_dotenv
from langchain.schema import Document
from langchain_community.vectorstores.chroma import Chroma
from langchain_openai import OpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader

CHROMA_PATH = "chroma"
DATA_PATH = Path(__file__).parents[2] / "data"


def main():
    generate_data_store()


def get_api_key():
    """Carrega as variáveis de ambiente necessárias, como a chave da API."""
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError(
            "OPENAI_API_KEY não encontrada no ambiente. Verifique o arquivo .env."
        )
    return api_key


def generate_data_store() -> None:
    documents = load_pdfs()
    chunks = split_text(documents)
    save_to_chroma(chunks)


def transcribe_audio(audio_path: str) -> str:
    client = OpenAI(api_key=get_api_key())
    with open(audio_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-1", file=audio_file
        )
    return transcription.text


def generate_audio(text: str, audio_path: str) -> None:
    speech_file_path = Path(audio_path).parent / "audio.mp3"

    client = OpenAI(api_key=get_api_key())
    response = client.audio.speech.create(model="tts-1", voice="shimmer", input=text)
    response.with_streaming_response(speech_file_path)
    response.with_streaming_response(speech_file_path)


def load_pdfs() -> list[Document]:
    pdfs = DATA_PATH.glob("*.pdf")
    documents = []
    for pdf in pdfs:
        for page in PdfReader(pdf).pages:
            documents.append(Document(page.extract_text()))
    return documents


def print_documents(documents: list[Document], limit: int = 5) -> None:
    for i, doc in enumerate(documents[:limit]):
        print(f"Documento {i}: {doc.page_content}")
    if len(documents) > limit:
        print(f"...e mais {len(documents) - limit} documentos.")


def split_text(documents: list[Document]) -> list[Document]:
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=512,
        chunk_overlap=100,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"{len(documents)} documentos divididos em {len(chunks)} chunks.")
    return chunks


def save_to_chroma(chunks: list[Document]):
    if os.path.exists(CHROMA_PATH):
        print(
            f"A pasta {CHROMA_PATH} já existe. Removendo ela para dar lugar a dados novos."
        )
        shutil.rmtree(CHROMA_PATH)

    Chroma.from_documents(chunks, OpenAIEmbeddings(), persist_directory=CHROMA_PATH)
    print(f"{len(chunks)} chunks salvos em {CHROMA_PATH}.")


if __name__ == "__main__":
    main()
