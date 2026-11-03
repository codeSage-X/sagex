// Local / plain-Node entrypoint: serves public/ itself, then hands everything else to Nest.
import 'reflect-metadata';
import { join } from 'node:path';
import express from 'express';
import { createApp } from './create-app.js';

async function bootstrap() {
  const server = express();
  server.use(express.static(join(import.meta.dirname, '..', 'public'), { extensions: ['html'] }));
  const app = await createApp(server);
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`sagex listening on http://localhost:${port}`);
}

bootstrap();
