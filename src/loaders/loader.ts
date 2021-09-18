import { Writable } from 'node:stream';

import type { Extractor } from '../extractors';
import type { Transformer } from '../transformers';

export abstract class Loader<T> extends Writable {
  prev: Transformer<unknown, T> | Extractor<T> | undefined;
  proxied: boolean;
  constructor(proxied = false) {
    super({
      objectMode: true,
      decodeStrings: false,
    });
    this.proxied = proxied;
  }

  proxy(): Writable {
    return this;
  }

  override _write(
    _chunk: T,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    callback();
  }
}
