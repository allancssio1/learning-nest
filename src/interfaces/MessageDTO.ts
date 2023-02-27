import { IsString, IsNotEmpty } from 'class-validator';

export class MessageDTO {
  @IsString()
  @IsNotEmpty()
  text: string;
}
