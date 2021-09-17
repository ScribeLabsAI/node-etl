import { Transformer } from './transformer';

import type { TransformCallback } from 'node:stream';

class JSONParser<T> extends Transformer<string, T> {
  constructor() {
    super();
  }

  override _transform(chunk: string, _encoding: BufferEncoding, callback: TransformCallback) {
    this.push(JSON.parse(chunk) as T);
    callback();
  }
}

export function fromJSON<T>(): JSONParser<T> {
  return new JSONParser();
}
