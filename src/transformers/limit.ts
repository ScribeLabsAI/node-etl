import { Transformer } from './transformer';

import type { TransformCallback } from 'node:stream';

class Limit<T> extends Transformer<T, T> {
  readonly limit: number;
  current: number;

  constructor(limit: number) {
    super();
    this.limit = limit;
    this.current = 0;
  }

  override _transform(chunk: T, _encoding: BufferEncoding, callback: TransformCallback) {
    this.push(chunk);
    callback();
    this.current++;
    if (this.current === this.limit) {
      this.prev?.unpipe(this);
      this.unpipe(this.next);
    }
  }

  override _flush(callback: TransformCallback) {
    callback();
  }
}

export function limit<T>(limit: number): Limit<T> {
  return new Limit(limit);
}
