import { Injectable } from '@nestjs/common';
import { Message } from '@what-did-you-say/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
