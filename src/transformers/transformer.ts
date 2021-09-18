import { Transform } from 'node:stream';

import type { TransformCallback, Writable } from 'node:stream';
import type { Extractor } from '../extractors';
import type { Loader } from '../loaders';

export abstract class Transformer<T, U> extends Transform {
  prev: Transformer<unknown, T> | Extractor<T> | undefined;
  next: Transformer<U, unknown> | Loader<U> | undefined;
  proxied: boolean;
  constructor(proxied = false) {
    super({
      objectMode: true,
      decodeStrings: false,
    });
    this.proxied = proxied;
  }

  override _transform(_chunk: T, _encoding: BufferEncoding, callback: TransformCallback): void {
    callback();
  }

  override push(chunk: U, encoding?: BufferEncoding): boolean {
    return super.push(chunk, encoding);
  }

  proxy(): Transform {
    return this;
  }

  override unpipe(dest?: Writable): this {
    if (this.proxied) this.proxy().unpipe(dest);
    else super.unpipe(dest);
    this.next?.end();
    return this;
  }

  chain<O>(transformer: Transformer<U, O>): Transformer<U, O>;
  chain(loader: Loader<U>): Loader<U>;
  chain<O>(next: Transformer<U, O> | Loader<U>): Transformer<U, O> | Loader<U> {
    this.next = next;
    next.prev = this;
    this.proxy().pipe(next.proxy());
    return next;
  }
}
