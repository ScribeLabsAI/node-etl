import { Transformer } from './transformer';

import type { TransformCallback } from 'node:stream';

class PassThrough<T> extends Transformer<T, T> {
  fct: (chunk: T) => void;

  constructor(fct: (chunk: T) => void) {
    super();
    this.fct = fct;
  }

  override _transform(chunk: T, _encoding: BufferEncoding, callback: TransformCallback) {
    this.fct(chunk);
    this.push(chunk);
    callback();
  }
}

export function passThrough<T>(fct: (chunk: T) => void): PassThrough<T> {
  return new PassThrough(fct);
}
