import parse from 'csv-parse';
import { Transformer } from '.';

import type { Parser } from 'csv-parse';

class ParseCSV<T extends Record<string, unknown>> extends Transformer<string, T> {
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

export function parseCSV<T extends Record<string, unknown>>(delimiter = ','): ParseCSV<T> {
  return new ParseCSV(delimiter);
}
