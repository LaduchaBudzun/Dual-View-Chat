import { ChangeEvent,KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputUser } from "../../../store/chat/chat";

interface ChatInputUserProps {
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    addNewMessage: () => void;
    loading:boolean;
  }

const ChatInputUser: React.FC<ChatInputUserProps> = ({handleKeyDown,addNewMessage,loading})=>{
    const message = useSelector((state) => state.chat.inputUser)
    const dispatch = useDispatch()

    return (
        <div className="input-group">
            <input type="text" value={message} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setInputUser(e.target.value))} 
            onKeyDown={handleKeyDown}
            className="chat-input" placeholder="Type a message..."/>
            <button className="send-button"
             onClick={addNewMessage}
             disabled={loading || message.trim() === ''}
              >⇧</button>
        </div>
    )
}

export default ChatInputUser;