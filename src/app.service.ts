import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection) { }

  getHello(): string {
    return 'Hello World!';
  }

  async checkMongoConnection() {
    try {
      const isConnected = this.connection.readyState === 1;
      return {
        status: isConnected ? 'connected' : 'disconnected',
        readyState: this.connection.readyState,
        message: isConnected ? 'MongoDB is connected' : 'MongoDB is not connected'
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Error checking MongoDB connection',
        error: error.message
      };
    }
  }
}
