import { Writable } from 'node:stream';

export abstract class Loader<T> extends Writable {
  constructor() {
    super({
      objectMode: true,
      decodeStrings: false,
    });
  }

  abstract override _write(
    chunk: T,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void;
}
