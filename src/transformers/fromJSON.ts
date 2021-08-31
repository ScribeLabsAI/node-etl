import { Transform } from 'node:stream';

import type { TransformCallback } from 'node:stream';

class JSONParser<T> extends Transform {
  constructor() {
    super({
      objectMode: true,
      decodeStrings: false,
    });
  }

  override _transform(chunk: string, _: BufferEncoding, callback: TransformCallback) {
    this.push(JSON.parse(chunk) as T);
    callback();
  }
}

export function fromJSON<T>(): Transform {
  return new JSONParser<T>();
}
