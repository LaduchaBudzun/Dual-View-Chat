import { KeyboardEvent,useCallback} from "react";
import { IMessage } from "../../interfaces";
import ChatMessages from "./ChatUI/ChatMessages";
import { ROLE_USER } from "../../constants/main-constants";
import { useDispatch, useSelector } from "react-redux";
import { addMessageUser, setInputUser } from "../../store/chat/chat";
import { sendMessageToAI } from "../../store/chat/chatThunk";
import ChatInputUser from "./ChatUI/ChatInputUser";


const UserChatBox: React.FC = () => {
    const messages = useSelector((state) => state.chat.messagesUser)
    const loading = useSelector((state) => state.chat.loadingAI)
    const message = useSelector((state)=> state.chat.inputUser)
    const dispatch = useDispatch()


    const addNewMessage = useCallback((): void=>{
        console.log('addNewMessage')
        if(loading) return
            
        const newMessage: IMessage = {
            role: ROLE_USER,
            content: message,
            id: new Date().getTime(),
            };

        dispatch(sendMessageToAI(newMessage.content))
        dispatch(addMessageUser(newMessage))
        dispatch(setInputUser(''))
    },[message])

    const handleKeyDown =  useCallback((e: KeyboardEvent<HTMLInputElement>): void =>{
        if (e.key === 'Enter') {
            addNewMessage();
        }
    },[addNewMessage])

    return (
        <div className="chat-box" id="user-chat">
            <div className="chat-header">User Chat</div>

            <ChatMessages messages={messages} />
            <ChatInputUser loading={loading} handleKeyDown={handleKeyDown} addNewMessage={addNewMessage} />

    </div>
    )
}

export default UserChatBox;
