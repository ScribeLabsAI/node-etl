import { createWriteStream } from 'node:fs';
import { Loader } from '.';

import type { WriteStream } from 'node:fs';

class ToFile extends Loader<string> {
  stream: WriteStream;
  constructor(filename: string, encoding: BufferEncoding = 'utf8') {
    super(true);
    this.stream = createWriteStream(filename, {
      encoding,
    });
  }

  override proxy() {
    return this.stream;
  }
}

export function toFile(filename: string, encoding: BufferEncoding = 'utf8'): ToFile {
  return new ToFile(filename, encoding);
}
