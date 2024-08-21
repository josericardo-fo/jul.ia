import logoBlueBg from "../assets/hummingbird-blue-bg.png";
import sendBtn from "../assets/send.svg";
import userProfile from "../assets/user-profile.png";
import "../Styles/Chat.css";

function Chat() {
  return (
    <div className="main">
      <div className="chats">
        <div className="chat">
          <img className="chatImg" src={userProfile} alt="" />
          <p className="txt">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste sit
            cupiditate sequi, hic adipisci aliquam nemo eaque quisquam fugiat
            dolores, rem, optio totam? Adipisci incidunt optio ducimus magnam.
            Repellendus, culpa!
          </p>
        </div>
        <div className="chat bot">
          <img className="chatImg" src={logoBlueBg} alt="" />
          <p className="txt">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            dolorum dolore error ullam eveniet. Quas ut tempora hic? Quisquam
            deserunt velit quae beatae laudantium possimus, delectus pariatur
            sequi maxime deleniti commodi nulla quia laborum culpa amet nam,
            quas corrupti non quaerat numquam ea officia. Quisquam, esse maxime.
            Aspernatur doloribus unde veniam maiores aliquid eos beatae
            praesentium dicta, inventore suscipit ratione quaerat ut corporis
            modi nulla! Mollitia obcaecati soluta, eius assumenda modi magnam
            velit unde optio numquam nesciunt tempore, sint animi fugiat
            architecto maiores asperiores beatae vero? Recusandae fugit
            dignissimos molestias. Ut, facere autem! Maiores ab quia cumque
            necessitatibus quae labore.
          </p>
        </div>
      </div>
      <div className="chatFooter">
        <div className="inp">
          <input type="text" placeholder="Mensagem Jul.ia" />
          <button className="send">
            <img src={sendBtn} alt="Enviar" />
          </button>
        </div>
        <p>
          Jul.ia pode cometer erros. Considere verificar informações
          importantes.
        </p>
      </div>
    </div>
  );
}

export default Chat;
