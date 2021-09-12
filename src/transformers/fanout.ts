import { Transform } from 'node:stream';

import type { TransformCallback, Writable } from 'node:stream';

class Fanout<T> extends Transform {
  readonly outputs: Writable[];

  constructor(outputs: Writable[]) {
    super({
      objectMode: true,
      decodeStrings: false,
    });
    this.outputs = outputs;
  }

  override _transform(chunk: T, _: BufferEncoding, callback: TransformCallback) {
    this.outputs.forEach((o) => o.write(chunk));
    callback();
  }

  override _flush(callback: TransformCallback) {
    this.outputs.forEach((o) => o.end());
    callback();
  }
}

export function fanout<T>(outputs: Writable[]): Fanout<T> {
  return new Fanout(outputs);
}
