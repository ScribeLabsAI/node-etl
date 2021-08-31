import { finished } from 'node:stream/promises';

import type { Readable, Transform, Writable } from 'node:stream';

export class ETL {
  input: Readable | undefined;
  output: Writable | undefined;
  transformers: Transform[];
  pipeline: Readable | Writable | Transform | undefined;

  constructor() {
    this.transformers = [];
  }

  extract(input: Readable): ETL {
    this.input = input;
    return this;
  }

  load(output: Writable): ETL {
    this.output = output;
    return this;
  }

  transform(...transformers: Transform[]): ETL {
    this.transformers.push(...transformers);
    return this;
  }

  start(): Readable | Writable | Transform {
    if (!this.input) throw new Error('Input undefined.');
    let src: Readable | Writable | Transform = this.input;
    for (const t of this.transformers) src = src.pipe(t);
    if (this.output) src = src.pipe(this.output);
    this.pipeline = src;
    return this.pipeline;
  }

  finished(): Promise<void> {
    if (!this.pipeline) throw new Error('Pipeline not started.');
    return finished(this.pipeline);
  }
}

export * from './extractors';
export * from './loaders';
export * from './transformers';
