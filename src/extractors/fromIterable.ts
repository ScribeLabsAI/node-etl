import { Extractor } from './extractor';

class FromIterable<T> extends Extractor<T> {
  readonly iterable: Iterable<T>;
  constructor(iterable: Iterable<T>) {
    super();
    this.iterable = iterable;
  }

  override _read() {
    for (const item of this.iterable) {
      this.push(item);
    }
    this.push(null);
  }
}

export function fromFunction<T>(iterable: Iterable<T>): FromIterable<T> {
  return new FromIterable(iterable);
}
