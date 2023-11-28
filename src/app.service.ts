import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenido a humanizar, puedes ver la documentación en /api';
  }
}
