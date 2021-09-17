import { Loader } from './loader';

class ConsoleWriter<T> extends Loader<T> {
  constructor() {
    super();
  }

  override _write(
    chunk: T,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    console.log(chunk);
    callback();
  }
}

export function toConsole<T>(): ConsoleWriter<T> {
  return new ConsoleWriter();
}
