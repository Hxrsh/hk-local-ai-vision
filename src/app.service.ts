import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    return 'HK Local AI vision service is up and running!';
  }
}