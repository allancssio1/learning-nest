import { Injectable } from '@nestjs/common';
import { IMessage } from 'src/interfaces/Message';
import { MessageDTO } from 'src/interfaces/MessageDTO';

@Injectable()
export class MessagesService {
  private messages: IMessage[] = [
    {
      id: 1,
      text: 'alguma',
    },
    {
      id: 2,
      text: 'coisa',
    },
  ];

  findAll() {
    return this.messages.filter(Boolean);
  }

  async findById(id: number): Promise<IMessage> {
    const message = this.messages.find((message) => message?.id === id);
    if (!message) throw new Error('mensagem nao encontrada');

    return message;
  }

  create(MessageDTO: MessageDTO) {
    const id = this.messages.length + 1;
    const message: IMessage = {
      id,
      ...MessageDTO,
    };
    this.messages.push(message);
    return message.id;
  }

  async updateMessage(id: number, body: MessageDTO) {
    const index = this.messages.findIndex(
      (message: IMessage) => message?.id === id,
    );

    if (index < 0) throw new Error('Mensagem não encontrada');

    const message: IMessage = {
      id,
      ...body,
    };

    this.messages[index] = message;
    return message;
  }

  async delete(id: number) {
    const index = this.messages.findIndex(
      (message: IMessage) => message?.id === id,
    );
    if (index < 0) throw new Error('Mensagem não encontrada');
    delete this.messages[index];
    return true;
  }
}
