import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IMessage } from 'src/interfaces/Message';
import { MessageDTO } from 'src/interfaces/MessageDTO';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findById(@Param() params) {
    return this.messagesService.findById(Number(params.id)).catch((error) => {
      throw new NotFoundException(error.message);
    });
  }

  @Post()
  create(@Body() body: MessageDTO) {
    return this.messagesService.create(body);
  }

  @Put(':id')
  update(@Param() params, @Body() body: MessageDTO) {
    return this.messagesService
      .updateMessage(+params.id, body)
      .catch((error) => {
        throw new NotFoundException(error.message);
      });
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.messagesService.delete(+params.id).catch((error) => {
      throw new NotFoundException(error.message);
    });
  }
}
