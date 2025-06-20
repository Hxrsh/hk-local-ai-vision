import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiTags('Service status')
  @ApiOperation({
    description: 'API to fetch status of the service',
    summary: 'Get info if service is up and running or not',
  })
  @ApiResponse({ status: 200, description: 'Get service status' })
  @ApiResponse({ status: 400, description: 'Invalid request properties' })
  @ApiResponse({ status: 500, description: 'Internal Service Error.' })
  @Get('/healthcheck')
  getHello(): string {
    return this.appService.getHello();
  }
}
