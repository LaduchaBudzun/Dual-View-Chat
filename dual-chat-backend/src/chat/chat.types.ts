export type OpenAIConfig = {
    Authorization: string;
}

export type Message =  {
    role: "user" | "assistant";
    content: string;
    id?: number
}

export type Messages = Message[]
