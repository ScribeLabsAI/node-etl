import { Readable } from 'node:stream';

import type { Loader } from '../loaders';
import type { Transformer } from '../transformers';

export abstract class Extractor<T> extends Readable {
  constructor() {
    super({ objectMode: true, encoding: 'utf8' });
  }

  abstract override _read(): void;

  chain(loader: Loader<T>): Loader<T>;
  chain<O>(transformer: Transformer<T, O>): Transformer<T, O>;
  chain<O>(next: Loader<T> | Transformer<T, O>): Loader<T> | Transformer<T, O> {
    this.pipe(next);
    return next;
  }
}
