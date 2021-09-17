import { createReadStream } from 'node:fs';
import parse from 'csv-parse';
import { Extractor } from '.';

import type { Parser } from 'csv-parse';
import type { Loader, Transformer } from '..';

class FromCSV<T extends Record<string, unknown>> extends Extractor<T> {
  readonly parser: Parser;
  constructor(filename: string, delimiter: string) {
    super();
    this.parser = parse({
      columns: true,
      delimiter,
      trim: true,
      skipEmptyLines: true,
    });
    createReadStream(filename, { encoding: 'utf8' }).pipe(this.parser);
  }

  override chain(loader: Loader<T>): Loader<T>;
  override chain<O>(transformer: Transformer<T, O>): Transformer<T, O>;
  override chain<O>(next: Loader<T> | Transformer<T, O>): Loader<T> | Transformer<T, O> {
    this.parser.pipe(next);
    return next;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  override _read() {}
}

export function fromCSV<T extends Record<string, unknown>>(
  filename: string,
  delimiter = ','
): FromCSV<T> {
  return new FromCSV(filename, delimiter);
}
