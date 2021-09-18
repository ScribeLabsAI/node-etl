import stringify from 'csv-stringify';
import { Transformer } from '.';

import type { Stringifier } from 'csv-stringify';

class ToCSVLine<T extends Record<string, unknown>> extends Transformer<T, string> {
  readonly stringifier: Stringifier;
  constructor(columns: string[] = [], delimiter = ',') {
    super(true);
    this.stringifier = stringify({
      header: true,
      ...(columns.length > 0 ? { columns } : null),
      delimiter,
    });
  }

  override proxy() {
    return this.stringifier;
  }
}

export function toCSVLine<T extends Record<string, unknown>>(
  columns: string[] = [],
  delimiter = ','
): ToCSVLine<T> {
  return new ToCSVLine(columns, delimiter);
}
