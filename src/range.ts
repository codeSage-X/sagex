// HTTP byte-range support for static media. Workers Static Assets always answers 200 with the
// full body, but Safari (iOS especially) refuses to play <video> unless ranges get a 206.

export type ByteRange = { start: number; end: number }; // inclusive

/** Parses a single-range `Range` header. Returns null if absent/unsupported, 'invalid' if unsatisfiable. */
export function parseRange(header: string | null, size: number): ByteRange | null | 'invalid' {
  if (!header) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m || (m[1] === '' && m[2] === '')) return null; // multi-range or malformed: fall back to full body
  let start: number, end: number;
  if (m[1] === '') {
    // suffix range: last N bytes
    const n = Number(m[2]);
    if (n === 0) return 'invalid';
    start = Math.max(0, size - n);
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start >= size || start > end) return 'invalid';
  return { start, end };
}

/** Wraps a full 200 asset response so it honours the request's Range header. */
export async function withRangeSupport(request: Request, asset: Response): Promise<Response> {
  if (asset.status !== 200) return asset;

  const headers = new Headers(asset.headers);
  headers.set('Accept-Ranges', 'bytes');
  const rangeHeader = request.headers.get('Range');
  if (!rangeHeader) return new Response(request.method === 'HEAD' ? null : asset.body, { status: 200, headers });

  const body = await asset.arrayBuffer();
  const size = body.byteLength;
  const range = parseRange(rangeHeader, size);

  if (range === 'invalid') {
    headers.set('Content-Range', `bytes */${size}`);
    headers.delete('Content-Length');
    return new Response(null, { status: 416, headers });
  }
  if (range === null) {
    headers.set('Content-Length', String(size));
    return new Response(request.method === 'HEAD' ? null : body, { status: 200, headers });
  }

  headers.set('Content-Range', `bytes ${range.start}-${range.end}/${size}`);
  headers.set('Content-Length', String(range.end - range.start + 1));
  headers.delete('ETag'); // the partial body is not the entity the ETag describes
  const slice = body.slice(range.start, range.end + 1);
  return new Response(request.method === 'HEAD' ? null : slice, { status: 206, headers });
}
