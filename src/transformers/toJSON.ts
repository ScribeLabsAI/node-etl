import { Transformer } from './transformer';

import type { TransformCallback } from 'node:stream';

class JSONWriter<T> extends Transformer<T, string> {
  constructor() {
    super();
  }

  override _transform(chunk: T, _encoding: BufferEncoding, callback: TransformCallback) {
    this.push(JSON.stringify(chunk));
    callback();
  }
}

export function toJSON<T>(): JSONWriter<T> {
  return new JSONWriter();
}
