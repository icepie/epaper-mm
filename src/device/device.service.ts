import { fabric } from 'fabric';

import Jimp from 'jimp';
import { Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { streamToBuffer } from 'src/utils/stream';
import { PNGStream } from 'canvas';

const WHITE = '#FFFFFF';
const RED = '#FF0000';
const BLACK = '#000000';

let gData = null;

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

  // 更新data
  async changeData(data: any) {
    gData = data;
  }

  async display(): Promise<Buffer> {
    const canvas = new fabric.StaticCanvas(null, { width: 400, height: 300 });

    try {
      canvas.loadFromJSON(gData, () => {
        console.log('loadFromJSON');
        canvas.renderAll();
        // console.log(a, o);
      });
    } catch (error: any) {
      console.log(error);
    }

    // // canvas.add(rect);

    const stream: PNGStream = await canvas.createPNGStream();

    const image = await Jimp.read(await streamToBuffer(stream));
    // image.resize(400, 300);

    return image.getBufferAsync(Jimp.MIME_BMP);
  }
}
