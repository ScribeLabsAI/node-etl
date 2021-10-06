import { Extractor } from './extractor';

class FromIterable<T> extends Extractor<T> {
  readonly iterable: Iterable<T> | AsyncGenerator<T, unknown, unknown>;
  readonly skip: number;
  count: number;

  constructor(iterable: Iterable<T> | AsyncGenerator<T, unknown, unknown>, skip: number) {
    super();
    this.iterable = iterable;
    this.skip = skip;
    this.count = 0;
  }

  override async _read() {
    for await (const item of this.iterable) {
      if (this.count < this.skip) this.count += 1;
      else this.push(item);
    }
    this.push(null);
  }
}

export function fromIterable<T>(
  iterable: Iterable<T> | AsyncGenerator<T, unknown, unknown>,
  skip = 0
): FromIterable<T> {
  return new FromIterable(iterable, skip);
}
