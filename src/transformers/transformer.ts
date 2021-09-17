import { Transform } from 'node:stream';

import type { TransformCallback } from 'node:stream';
import type { Loader } from '../loaders';

export abstract class Transformer<T, U> extends Transform {
  constructor() {
    super({
      objectMode: true,
      decodeStrings: false,
    });
  }

  abstract override _transform(
    chunk: T,
    _encoding: BufferEncoding,
    callback: TransformCallback
  ): void;

  chain<O>(transformer: Transformer<U, O>): Transformer<U, O>;
  chain(loader: Loader<U>): Loader<U>;
  chain<O>(next: Transformer<U, O> | Loader<U>): Transformer<U, O> | Loader<U> {
    this.pipe(next);
    return next;
  }
}
