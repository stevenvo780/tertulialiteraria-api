import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { AppProvider } from './app.provider';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appProvider: AppProvider,
  ) {}

  @ApiOperation({ summary: 'Get a welcome message' })
  @ApiOkResponse({ description: 'Return a welcome message.' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Get application status' })
  @ApiOkResponse({ description: 'Return the status of the application.' })
  @Get('status')
  async getStatus() {
    return this.appService.getStatus();
  }

  @ApiOperation({ summary: 'Get all routes' })
  @ApiOkResponse({ description: 'Return all routes.', type: [String] })
  @Get('routes')
  getRoutes(): string[] {
    const routes = [];
    const server = this.appProvider.getApp().getHttpServer();
    const router = server._events.request._router;

    router.stack.forEach((middleware) => {
      if (middleware.route) {
        routes.push({
          method: Object.keys(middleware.route.methods)[0].toUpperCase(),
          path: middleware.route.path,
        });
      }
    });
    return routes;
  }
}
