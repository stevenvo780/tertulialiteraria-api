import { Injectable, INestApplication } from '@nestjs/common';

@Injectable()
export class AppProvider {
  private app: INestApplication;

  setApp(app: INestApplication) {
    this.app = app;
  }

  getApp(): INestApplication {
    return this.app;
  }
}

export default AppProvider;
