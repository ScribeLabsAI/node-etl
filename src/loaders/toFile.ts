import { createWriteStream } from 'node:fs';

import type { Writable } from 'node:stream';

export function toFile(filename: string, encoding: BufferEncoding = 'utf8'): Writable {
  return createWriteStream(filename, {
    encoding,
  });
}
