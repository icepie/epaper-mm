export class InvalidStreamError extends Error {}

import { Writable, WritableOptions } from 'stream';

export interface Bufferable {
  toBuffer(): Buffer;
}

export class BufferableStream extends Writable implements Bufferable {
  private readonly chunks: any[];

  constructor(opts?: WritableOptions) {
    super(opts);
    this.chunks = [];
  }

  toBuffer(): Buffer {
    return this.chunksToBuffer();
  }

  _write(chunk: any, _: string, next: (error?: Error | null) => void): void {
    this.chunks.push(chunk);
    next();
  }

  private chunksToBuffer(): Buffer {
    return Buffer.concat(this.chunks);
  }
}

/**
 * @Method: Returns the content of the readable stream as a buffer
 * @Param {NodeJS.ReadableStream}
 * @Return {Promise<Buffer>}
 */
export async function streamToBuffer(
  stream: NodeJS.ReadableStream,
): Promise<Buffer> {
  if (!stream) {
    throw new InvalidStreamError('stream is not defined');
  }

  const bufferableStream = new BufferableStream();

  return new Promise(
    (resolve: (data: Buffer) => void, reject: (error: Error) => void): void => {
      stream
        .on('error', (error: Error): void => {
          bufferableStream.emit('error', error);
        })
        .pipe(bufferableStream)
        .on('finish', (): void => {
          resolve(bufferableStream.toBuffer());
        })
        .on('error', (error: Error): void => {
          reject(error);
        });
    },
  );
}
