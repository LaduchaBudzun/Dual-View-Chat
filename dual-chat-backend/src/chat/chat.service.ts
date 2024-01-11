import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './chat.types';
import {MAX_MESSAGES_COUNT } from 'src/constants';
import { OpenAIService } from 'src/openai/openai.service';

@Injectable()
export class ChatService {
    private messages: Message[] = [];

    constructor(
        private readonly openAIService: OpenAIService 
    ) {}

    async getAIResponse(question: string): Promise<Message | undefined>{
        try {
            this.addUserMessage(question);
            const aiResponse = await this.openAIService.postToOpenAI(this.messages);
            return this.addAIMessage(aiResponse);
        } catch (error) {
            console.error('Error in getAIResponse:', error.response.status);
            if(Number(error?.response?.status) === HttpStatus.TOO_MANY_REQUESTS){
                throw new HttpException('The limit of requests to chatGPT has been exceeded.Try again in 1-10 minute', HttpStatus.TOO_MANY_REQUESTS);
            }else{
                throw new HttpException('Failed to get response from AI', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    private addUserMessage(question: string): void {
        const userMessage: Message = { role: 'user', content: question };
        this.messages.push(userMessage);
    }

    private addAIMessage(aiResponse: string): Message {
        if (this.messages.length > MAX_MESSAGES_COUNT) {
            this.messages = this.messages.slice(this.messages.length - MAX_MESSAGES_COUNT);
        }

        const aiMessage: Message = { role: 'assistant', content: aiResponse };
        this.messages.push(aiMessage);
        return aiMessage;
    }
}