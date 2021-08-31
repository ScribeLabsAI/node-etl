import parse from 'csv-parse';
import { createReadStream } from 'node:fs';

import type { Parser } from 'csv-parse';

export function fromCSV(filename: string, delimiter = ','): Parser {
  return createReadStream(filename, { encoding: 'utf8' }).pipe(
    parse({
      columns: true,
      delimiter,
      trim: true,
      skipEmptyLines: true,
    })
  );
}
