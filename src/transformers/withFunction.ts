import { Transform } from 'node:stream';

import type { TransformCallback } from 'node:stream';

class WithFunction<T, U> extends Transform {
  transformer: (arg: T) => U;

  constructor(transformer: (arg: T) => U) {
    super({
      objectMode: true,
      decodeStrings: false,
    });
    this.transformer = transformer;
  }

  override _transform(chunk: T, _: BufferEncoding, callback: TransformCallback) {
    this.push(this.transformer(chunk));
    callback();
  }
}

export function withFunction<T, U>(transformer: (arg: T) => U): WithFunction<T, U> {
  return new WithFunction(transformer);
}
