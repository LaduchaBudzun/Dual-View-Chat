import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { MAX_MESSAGE_LENGTH, MIN_MESSAGE_LENGTH } from "src/constants";

export class ChatDto{
    @IsString()
    @IsNotEmpty() 
    @MaxLength(MAX_MESSAGE_LENGTH,{
        message: `Maximum message length ${MAX_MESSAGE_LENGTH} characters`,
    })
    @MinLength(MIN_MESSAGE_LENGTH,{
        message: `Message must contain at least ${MIN_MESSAGE_LENGTH} character`,
    })
    question:string;
}
