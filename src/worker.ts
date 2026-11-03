// Cloudflare Workers entrypoint. Static files in public/ are served by Workers Static Assets
// before this code runs; only unmatched requests (e.g. /api/*) reach Nest. The exception is
// video (run_worker_first in wrangler.jsonc), which comes through here to get Range support.
import 'reflect-metadata';
import { createServer } from 'node:http';
import { httpServerHandler } from 'cloudflare:node';
import express from 'express';
import { createApp } from './create-app.js';
import { withRangeSupport } from './range.js';

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

const nest = httpServerHandler(createServer(server));

type Env = { ASSETS: { fetch(request: Request): Promise<Response> } };

export default {
  async fetch(request: Request, env: Env, ctx: unknown) {
    if (new URL(request.url).pathname.endsWith('.mp4')) {
      // Ask the asset store for the whole file; we answer the Range ourselves.
      const plain = new Request(request.url, { method: 'GET' });
      return withRangeSupport(request, await env.ASSETS.fetch(plain));
    }
    return nest.fetch(request, env, ctx);
  },
};
