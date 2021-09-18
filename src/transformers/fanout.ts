import { Transformer } from './transformer';

import type { TransformCallback, Writable } from 'node:stream';

class Fanout<T> extends Transformer<T, T> {
  outputs: Writable[];

  constructor(outputs: Writable[]) {
    super();
    this.outputs = outputs;
  }

  override unpipe(dest?: Writable): this {
    if (dest) {
      const ind = this.outputs.findIndex((v) => v === dest);
      if (ind !== -1) this.outputs.splice(ind, 1);
      dest.end();
    } else {
      this.outputs.forEach((o) => o.end());
    }
    return this;
  }

  override _transform(chunk: T, _encoding: BufferEncoding, callback: TransformCallback) {
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
