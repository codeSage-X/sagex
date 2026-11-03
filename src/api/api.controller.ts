import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service.js';

@Controller('api')
export class ApiController {
  constructor(private readonly api: ApiService) {}

  @Get('health')
  health() {
    return this.api.health();
  }
}
