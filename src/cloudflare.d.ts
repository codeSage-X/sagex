declare module 'cloudflare:node' {
  import type { Server } from 'node:http';
  export function httpServerHandler(server: Server | { port: number }): ExportedHandler;
  type ExportedHandler = { fetch(request: unknown, env: unknown, ctx: unknown): Promise<unknown> };
}
