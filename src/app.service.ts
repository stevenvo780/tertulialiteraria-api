import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import admin from './utils/firebase-admin.config';

@Injectable()
export class AppService {
  constructor(private readonly connection: Connection) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getStatus(): Promise<{ database: string; firebase: string }> {
    const dbStatus = await this.checkDatabaseConnection();
    const firebaseStatus = this.checkFirebaseConnection();

    return {
      database: dbStatus,
      firebase: firebaseStatus,
    };
  }

  private async checkDatabaseConnection(): Promise<string> {
    try {
      await this.connection.query('SELECT 1');
      return 'Connected';
    } catch (error) {
      return 'Disconnected';
    }
  }

  private checkFirebaseConnection(): string {
    try {
      admin.auth();
      return 'Connected';
    } catch (error) {
      return 'Disconnected';
    }
  }
}
