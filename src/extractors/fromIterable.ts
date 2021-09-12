import { Readable } from 'node:stream';

class FromIterable<T> extends Readable {
  iterable: Iterable<T>;
  constructor(iterable: Iterable<T>) {
    super({ objectMode: true, encoding: 'utf8' });
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
