import stringify from 'csv-stringify';

import type { Stringifier } from 'csv-stringify';

export function toCSVLine(columns: string[] = [], delimiter = ','): Stringifier {
  return stringify({ header: true, ...(columns.length > 0 ? { columns } : null), delimiter });
}
