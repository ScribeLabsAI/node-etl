import StreamZip from 'node-stream-zip';
import { Extractor } from '.';

import type { ZipEntry } from 'node-stream-zip';

class FromZipEntries extends Extractor<ZipEntry> {
  zip: StreamZip;
  constructor(archive: string) {
    super();
    this.zip = new StreamZip({ file: archive, storeEntries: false });
    this.zip.on('entry', (entry) => {
      if (entry.isFile) this.push(entry);
    });
    this.zip.on('ready', () => {
      this.zip.close();
      this.push(null);
    });
  }

  override _destroy(_err: Error | null, callback: (error?: Error | null) => void): void {
    this.zip.close(callback);
  }
}

export function fromZipEntries(archive: string): FromZipEntries {
  return new FromZipEntries(archive);
}
