import { IsNumber, Max, Min } from "class-validator";

export class CreateDto {
    @Max(1000)
    @Min(1)
    @IsNumber()
    num: number;
}