import { createReadStream } from 'node:fs';
import { Extractor } from '.';

import type { ReadStream } from 'node:fs';

class FromFile extends Extractor<string> {
  stream: ReadStream;
  constructor(filename: string) {
    super(true);
    this.stream = createReadStream(filename, { encoding: 'utf8' });
  }

  override proxy() {
    return this.stream;
  }
}

export function fromFile(filename: string): FromFile {
  return new FromFile(filename);
}
