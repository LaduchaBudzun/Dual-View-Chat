import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { OpenAIService } from './openai/openai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ChatModule, ConfigModule.forRoot(),HttpModule],
  controllers: [AppController],
  providers: [AppService, OpenAIService],
})
export class AppModule {}
