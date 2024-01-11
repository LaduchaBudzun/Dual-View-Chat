import { memo } from "react";
import { IMessage } from "../../../interfaces";

interface ChatMessagesProps {
    messages: IMessage[];
  }

const ChatMessages: React.FC<ChatMessagesProps> = memo(({messages})=>{
    return (
        <div className="chat-messages" >
        { messages.map(m => {
         return <div key={m.id} className="message message-user">{m.content}</div>
         })
         }
     </div>
    )
})

export default ChatMessages;