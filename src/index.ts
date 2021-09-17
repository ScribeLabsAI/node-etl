import type { Extractor } from './extractors';

export default {
  extract<T>(extractor: Extractor<T>): Extractor<T> {
    return extractor;
  },
};

export * from './extractors';
export * from './loaders';
export * from './transformers';
