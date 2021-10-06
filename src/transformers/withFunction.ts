import { Transformer } from './transformer';

import type { TransformCallback } from 'node:stream';

function isGenerator<T, U>(
  fct: (
    arg: T
  ) =>
    | Promise<U | null>
    | Generator<U | null, unknown, unknown>
    | AsyncGenerator<U | null, unknown, unknown>
): fct is (
  arg: T
) => Generator<U | null, unknown, unknown> | AsyncGenerator<U | null, unknown, unknown> {
  return ['GeneratorFunction', 'AsyncGeneratorFunction'].includes(fct?.constructor.name);
}

class WithFunction<T, U> extends Transformer<T, U> {
  readonly transformer: (
    arg: T
  ) =>
    | Promise<U | null>
    | Generator<U | null, unknown, unknown>
    | AsyncGenerator<U | null, unknown, unknown>;

  constructor(
    transformer: (
      arg: T
    ) =>
      | Promise<U | null>
      | Generator<U | null, unknown, unknown>
      | AsyncGenerator<U | null, unknown, unknown>
  ) {
    super();
    this.transformer = transformer;
  }

  override async _transform(chunk: T, _encoding: BufferEncoding, callback: TransformCallback) {
    if (isGenerator(this.transformer)) {
      for await (const res of this.transformer(chunk)) {
        if (res !== null) this.push(res);
      }
      callback();
    } else {
      const res = (await this.transformer(chunk)) as U | null;
      if (res !== null) this.push(res);
      callback();
    }
  }
}

export function withFunction<T, U>(
  transformer: (
    arg: T
  ) =>
    | Promise<U | null>
    | Generator<U | null, unknown, unknown>
    | AsyncGenerator<U | null, unknown, unknown>
): WithFunction<T, U> {
  return new WithFunction(transformer);
}
