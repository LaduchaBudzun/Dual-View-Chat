
import AIChatBox from "./Chat/AIChatBox";
import UserChatBox from "./Chat/UserChatBox";

const Chat: React.FC = () => {
    return (
        <div className="chat-container">
            <UserChatBox />
            <AIChatBox />
    </div>
    )
}

export default Chat;