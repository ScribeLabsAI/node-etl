import { Transform } from 'node:stream';

import type { TransformCallback } from 'node:stream';

class JSONWriter<T> extends Transform {
  constructor() {
    super({
      objectMode: true,
      decodeStrings: false,
    });
  }

  override _transform(chunk: T, _: BufferEncoding, callback: TransformCallback) {
    this.push(JSON.stringify(chunk));
    callback();
  }
}

export function toJSON<T>(): JSONWriter<T> {
  return new JSONWriter();
}
