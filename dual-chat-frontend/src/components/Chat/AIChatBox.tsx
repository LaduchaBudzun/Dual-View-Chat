import { RotatingSquare } from "react-loader-spinner";
import ChatMessages from "./ChatUI/ChatMessages";
import { useSelector } from "react-redux";

const AIChatBox: React.FC = () => {
    const messages = useSelector((state) => state.chat.messagesAI);
    const loading = useSelector((state) => state.chat.loadingAI);
    const error = useSelector((state) =>state.chat.error);

    return (
        <div className="chat-box" >
            <div className="chat-header">AI Chat</div>
            <ChatMessages messages={messages} />
            <div className="ai-response ai-loader">
            {error ? 
            <span className="ai-error">{error}</span>
            : <span>Responses from AI will appear here</span>
            }
            <RotatingSquare
                visible={loading}
                height="18"
                width="18"
                color="#4fa94d"
                ariaLabel="rotating-square-loading"
                wrapperStyle={{}}
                wrapperClass=""/>
            </div>
        </div>
    )
}

export default AIChatBox;