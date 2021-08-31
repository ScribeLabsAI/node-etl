import { describe, expect, test } from '@jest/globals';
import { resolve } from 'node:path';

import { ETL, fromCSV } from '../../src';

import type { Readable } from 'node:stream';

describe('loading a CSV', function () {
  test('it loads a CSV file and counts the entries', async () => {
    const pipeline = new ETL().extract(fromCSV(resolve('tests', 'assets', 'addresses.csv')));
    let count = 0;
    for await (const _ of pipeline.start() as Readable) {
      count++;
    }
    expect(count).toEqual(6);
  });
});
