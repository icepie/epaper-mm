// import { createCanvas } from '@napi-rs/canvas';

import { Canvas, Rect, Textbox, Line } from 'fabric/node';

import Jimp from 'jimp';
import { Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Readable } from 'node:stream';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  createDevice(data: any) {
    return this.prisma.device.create({
      data,
    });
  }

  getDevices(): Promise<Device[]> {
    return this.prisma.device.findMany();
  }

  async display(): Promise<Buffer> {
    const canvas = new Canvas(null, { width: 400, height: 300 });

    canvas.backgroundColor = '#fff';

    const rect = new Rect({
      top: 50,
      left: 50,
      width: 150,
      height: 70,
      fill: '#aa96da',
    });

    const text = new Textbox('Hello World', {
      top: 50,
      left: 50,
      width: 150,
      height: 70,
      fill: '#aa96da',
    });

    const line = new Line([50, 50, 200, 50], {
      stroke: 'red',
      strokeWidth: 5,
    });

    canvas.add(line);

    canvas.add(text);

    canvas.add(rect);

    canvas.renderAll();

    console.log(canvas.toJSON());

    // canvas.createPNGStream()
    const png = canvas.createPNGStream();

    const buff = await toBuffer(png);

    const image = await Jimp.read(buff);
    // image.resize(400, 300);

    return image.getBufferAsync(Jimp.MIME_BMP);
  }
}

async function toBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}
