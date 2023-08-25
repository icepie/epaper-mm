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
}
