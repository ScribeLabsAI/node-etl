import { Transformer } from './transformer';

import type { TransformCallback } from 'node:stream';

class Limit<T, U> extends Transformer<T, U> {
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
      this.push(null);
      callback();
    }
  }
}

export function limit<T, U>(limit: number): Limit<T, U> {
  return new Limit(limit);
}
