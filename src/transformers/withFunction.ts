import { Transformer } from './transformer';

import type { TransformCallback } from 'node:stream';

class WithFunction<T, U> extends Transformer<T, U> {
  readonly transformer: (arg: T) => U;

  constructor(transformer: (arg: T) => U) {
    super();
    this.transformer = transformer;
  }

  override _transform(chunk: T, _encoding: BufferEncoding, callback: TransformCallback) {
    this.push(this.transformer(chunk));
    callback();
  }
}

export function withFunction<T, U>(transformer: (arg: T) => U): WithFunction<T, U> {
  return new WithFunction(transformer);
}
