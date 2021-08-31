import { Transform } from 'node:stream';

import type { TransformCallback } from 'node:stream';

class ConsoleWriter extends Transform {
  constructor() {
    super({
      objectMode: true,
      decodeStrings: false,
    });
  }

  override _transform(chunk: unknown, _: BufferEncoding, callback: TransformCallback) {
    console.log(chunk);
    callback();
  }
}

export function toConsole(): Transform {
  return new ConsoleWriter();
}
