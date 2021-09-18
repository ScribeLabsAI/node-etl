import parse from 'csv-parse';
import { Transformer } from '.';

import type { Parser } from 'csv-parse';

class FromCSV<T extends Record<string, unknown>> extends Transformer<string, T> {
  readonly parser: Parser;
  constructor(delimiter: string) {
    super(true);
    this.parser = parse({
      columns: true,
      delimiter,
      trim: true,
      skipEmptyLines: true,
    });
  }

  override proxy() {
    return this.parser;
  }
}

export function fromCSV<T extends Record<string, unknown>>(delimiter = ','): FromCSV<T> {
  return new FromCSV(delimiter);
}
