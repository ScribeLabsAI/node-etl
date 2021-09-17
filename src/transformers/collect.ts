import { Transformer } from './transformer';

import type { TransformCallback } from 'node:stream';

class Collector<T> extends Transformer<T, T[]> {
  readonly batchSize: number;
  buffer: T[];

  constructor(batchSize: number) {
    super();
    this.batchSize = batchSize;
    this.buffer = [];
  }

  override _transform(chunk: T, _encoding: BufferEncoding, callback: TransformCallback) {
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

export function collect<T>(batchSize: number): Collector<T> {
  return new Collector(batchSize);
}
