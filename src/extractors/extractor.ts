import { Readable } from 'node:stream';

import type { Writable } from 'node:stream';
import type { Loader } from '../loaders';
import type { Transformer } from '../transformers';

export abstract class Extractor<T> extends Readable {
  next: Transformer<T, unknown> | Loader<T> | undefined;
  proxied: boolean;
  constructor(proxied = false) {
    super({ objectMode: true, encoding: 'utf8' });
    this.proxied = proxied;
  }

  proxy(): Readable {
    return this;
  }

  override push(chunk: T | null, encoding?: BufferEncoding): boolean {
    return super.push(chunk, encoding);
  }

  override destroy(err?: Error | undefined): void {
    if (this.proxied) this.proxy().destroy(err);
    else super.destroy(err);
  }

  override unpipe(_dest?: Writable): this {
    if (this.proxied) this.proxy().unpipe();
    else super.unpipe();
    this.next?.end();
    return this;
  }

  override _read(): void {
    this.push(null);
  }

  chain(loader: Loader<T>): Loader<T>;
  chain<O>(transformer: Transformer<T, O>): Transformer<T, O>;
  chain<O>(next: Loader<T> | Transformer<T, O>): Loader<T> | Transformer<T, O> {
    this.next = next;
    next.prev = this;
    this.proxy().pipe(next.proxy());
    return next;
  }
}
