import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { Device } from '@prisma/client';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Post('/create')
  async createDevice(@Body() data: Device): Promise<Device> {
    return this.deviceService.createDevice(data);
  }

  @Get('/list')
  async getDevices(): Promise<Device[]> {
    return this.deviceService.getDevices();
  }

  @Get('/display')
  async display(@Res() res: Response) {
    const buffer = await this.deviceService.display();

    res.set({
      'Content-Type': 'image/bmp',
      'Content-Length': buffer.length,
    });

    res.send(buffer);
  }
}
