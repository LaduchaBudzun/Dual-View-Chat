import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Message } from '../chat/chat.types';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OpenAIService {
    constructor(private readonly httpService: HttpService) {}

    async postToOpenAI(messages: Message[]): Promise<string> {
        const requestConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        };

        const params = {
            model: process.env.MODEL_AI,
            messages,
        };

        const response = await firstValueFrom(
            this.httpService.post(`${process.env.BASE_URL_OPENIA}/v1/chat/completions`, params, requestConfig),
        );

        return response.data.choices[0].message.content;
    }
}