import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import type { Express } from 'express';
import { AppModule } from './app.module.js';

/** Builds the Nest app on top of an existing Express instance (shared by Node and Workers entrypoints). */
export function createApp(server: Express): Promise<NestExpressApplication> {
  return NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server), {
    logger: ['error', 'warn'],
  });
}
