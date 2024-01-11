import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { HttpService } from '@nestjs/axios';
import { ChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly service:ChatService){

        }
        @Post('/message')
        @UsePipes(new ValidationPipe({ whitelist: true }))
        getModelAnswer(@Body() dto: ChatDto) {
           return this.service.getAIResponse(dto.question);
        }


}
 