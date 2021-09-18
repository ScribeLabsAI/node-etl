import { Transformer } from './transformer';
import _throttle from 'lodash/throttle';

import type { TransformCallback } from 'node:stream';
import type { DebouncedFunc } from 'lodash';

class Throttle<T> extends Transformer<T, T> {
  buffer: T[];
  throttled: DebouncedFunc<(callback?: TransformCallback) => void>;
  constructor(delay: number) {
    super();
    this.buffer = [];
    this.throttled = _throttle(
      (callback?: TransformCallback) => {
        if (this.buffer.length > 0) this.push(this.buffer.splice(0, 1)[0]!);
        if (callback) callback();
      },
      delay,
      { leading: true }
    );
  }

  override _transform(chunk: T, _encoding: BufferEncoding, callback: TransformCallback) {
    this.buffer.push(chunk);
    this.throttled(callback);
  }

  override _flush(callback: TransformCallback) {
    while (this.buffer.length > 0) this.throttled();
    callback();
  }
}

export function throttle<T>(delay: number): Throttle<T> {
  return new Throttle(delay);
}
