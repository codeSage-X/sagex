// Cloudflare Workers entrypoint. Static files in public/ are served by Workers Static Assets
// before this code runs; only unmatched requests (e.g. /api/*) reach Nest.
import 'reflect-metadata';
import { createServer } from 'node:http';
import { httpServerHandler } from 'cloudflare:node';
import express from 'express';
import { createApp } from './create-app.js';

const server = express();

// Nest is initialised lazily on the first request (no async work allowed at Worker global scope).
// Its routes are registered on `server` after this middleware, so `next()` falls through to them.
let ready: Promise<unknown> | undefined;
server.use((_req, _res, next) => {
  ready ??= createApp(server)
    .then((app) => app.init())
    .catch((err) => {
      ready = undefined;
      throw err;
    });
  ready.then(() => next(), next);
});

export default httpServerHandler(createServer(server));
