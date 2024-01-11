import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { HttpModule } from '@nestjs/axios';
import { OpenAIService } from 'src/openai/openai.service';

@Module({
  imports: [HttpModule],
  controllers: [ChatController],
  providers: [ChatService,OpenAIService],
  exports: [ChatService],
})
export class ChatModule {}
