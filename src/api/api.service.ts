import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  health() {
    return { status: 'ok', service: 'sagex', time: new Date().toISOString() };
  }
}
