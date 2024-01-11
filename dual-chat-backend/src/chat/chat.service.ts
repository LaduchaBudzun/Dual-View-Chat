import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OpenAIConfig, Message, Messages } from './chat.types';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import {MAX_MESSAGES_COUNT } from 'src/constants';


@Injectable()
export class ChatService {
    private messages: Message[] = [];

    constructor(private httpService: HttpService) {}

    async getAIResponse(question: string): Promise<Message> {
        try {
            this.addUserMessage(question);
            const response = await this.postToOpenAI();
            this.addAIMessage(response);
            return this.getLastMessage();
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

    private async postToOpenAI(): Promise<string> {
        const requestConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        };

        const params = {
            model: process.env.MODEL_AI,
            messages: this.messages,
        };

        const response: AxiosResponse = await firstValueFrom(
            this.httpService.post(`${process.env.BASE_URL_OPENIA}/v1/chat/completions`, params, requestConfig),
        );

        return response.data.choices[0].message.content;
    }

    private addAIMessage(aiResponse: string): void {
        if (this.messages.length > MAX_MESSAGES_COUNT) {
            this.messages = this.messages.slice(this.messages.length - MAX_MESSAGES_COUNT);
        }

        const aiMessage: Message = { role: 'assistant', content: aiResponse };
        this.messages.push(aiMessage);
    }

    private getLastMessage(): Message {
        return this.messages[this.messages.length - 1];
    }
}
