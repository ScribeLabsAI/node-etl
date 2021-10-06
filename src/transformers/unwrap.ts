import { Transformer } from './transformer';

import type { TransformCallback } from 'node:stream';

class Unwrap<T> extends Transformer<T[] | Promise<T[]>, T> {
  constructor() {
    super();
  }

  override async _transform(
    chunk: T[] | Promise<T[]>,
    _encoding: BufferEncoding,
    callback: TransformCallback
  ) {
    (await chunk).forEach((c) => this.push(c));
    callback();
  }
}

export function unwrap<T>(): Unwrap<T> {
  return new Unwrap();
}
