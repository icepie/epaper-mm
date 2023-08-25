import { createCanvas } from '@napi-rs/canvas';
import Jimp from 'jimp';
import { Injectable } from '@nestjs/common';
import { Device } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

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
    const canvas = createCanvas(400, 300);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();

    const image = await Jimp.read(canvas.toBuffer('image/png'));
    // image.resize(400, 300);

    return image.getBufferAsync(Jimp.MIME_BMP);
  }
}
