import { Transform } from 'node:stream';

import type { TransformCallback } from 'node:stream';

class Collector<T> extends Transform {
  readonly batchSize: number;
  buffer: T[];

  constructor(batchSize: number) {
    super({
      objectMode: true,
      decodeStrings: false,
    });
    this.batchSize = batchSize;
    this.buffer = [];
  }

  override _transform(chunk: T, _: BufferEncoding, callback: TransformCallback) {
    this.buffer.push(chunk);
    if (this.buffer.length >= this.batchSize) {
      this.push(this.buffer.splice(0, this.batchSize));
    }
    callback();
  }

  override _flush(callback: TransformCallback) {
    this.push(this.buffer.splice(0));
    callback();
  }
}

export function collect<T>(batchSize: number): Transform {
  return new Collector<T>(batchSize);
}
