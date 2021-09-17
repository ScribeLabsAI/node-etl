import { Loader } from './loader';

class Counter<T> extends Loader<T> {
  private count: number;

  constructor() {
    super();
    this.count = 0;
  }

  override _write(
    _chunk: T,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    this.count += 1;
    callback();
  }

  getCount(): number {
    return this.count;
  }
}

export function counter<T>(): Counter<T> {
  return new Counter();
}
