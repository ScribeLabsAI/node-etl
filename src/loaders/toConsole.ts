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
    console.log(Buffer.isBuffer(chunk) ? chunk.toString('utf8').trim() : chunk);
    callback();
  }
}

export function toConsole<T>(): ConsoleWriter<T> {
  return new ConsoleWriter();
}
