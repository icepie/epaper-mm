import { Canvas, Textbox, Line } from 'fabric/node';

import Jimp from 'jimp';
import { Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

const WHITE = '#FFFFFF';
const RED = '#FF0000';
const BLACK = '#000000';

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

    canvas.backgroundColor = WHITE;

    const text = new Textbox('Hello World', {
      top: 50,
      left: 50,
      width: 150,
      height: 70,
      fill: RED,
    });

    const line = new Line([50, 50, 200, 50], {
      stroke: BLACK,
      strokeWidth: 5,
    });

    canvas.add(line);

    canvas.add(text);

    // canvas.add(rect);

    canvas.renderAll();

    console.log(canvas.toJSON());

    const png = canvas.getNodeCanvas().toBuffer('image/png');

    const image = await Jimp.read(png);
    // image.resize(400, 300);

    return image.getBufferAsync(Jimp.MIME_BMP);
  }
}
