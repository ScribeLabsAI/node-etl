import { describe, expect, test } from '@jest/globals';
import { resolve } from 'node:path';
import { finished } from 'node:stream/promises';

import ETL, { counter, fromFile, parseCSV } from '../../src';

type AddressesCSV = {
  Firstname: string;
  Lastname: string;
  Address: string;
  Town: string;
  State: string;
  Postcode: string;
};

describe('loading a CSV', function () {
  test('it loads a CSV file and counts the entries', async () => {
    const count = counter<AddressesCSV>();
    const pipeline = ETL.extract(fromFile(resolve('tests', 'assets', 'addresses.csv')))
      .chain(parseCSV<AddressesCSV>())
      .chain(count);
    await finished(pipeline);
    expect(count.getCount()).toEqual(6);
  });
});
