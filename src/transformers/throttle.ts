import { Transformer } from './transformer';
import _throttle from 'lodash/throttle';

import type { TransformCallback } from 'node:stream';
import type { DebouncedFunc } from 'lodash';

class Throttle<T> extends Transformer<T, T> {
  buffer: T[];
  throttled: DebouncedFunc<(callback: TransformCallback) => void>;
  constructor(delay: number) {
    super();
    this.buffer = [];
    this.throttled = _throttle(
      (callback: TransformCallback) => {
        this.push(this.buffer.splice(0, 1));
        console.log(new Date());
        callback();
      },
      delay,
      { leading: true }
    );
  }

  override _transform(chunk: T, _encoding: BufferEncoding, callback: TransformCallback) {
    this.buffer.push(chunk);
    this.throttled(callback);
  }
}

export function throttle<T>(delay: number): Throttle<T> {
  return new Throttle(delay);
}
