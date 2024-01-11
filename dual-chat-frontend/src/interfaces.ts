export interface IMessage {
    role: string;
    content: string;
    id: number;
  } 

 export interface IChatState {
    messagesUser: IMessage[];
    messagesAI: IMessage[];
    loadingAI: boolean;
    error: string | null; 
    inputUser: string;
  }

 export interface ErrorType {
    code: number;
    message: string;
  }
