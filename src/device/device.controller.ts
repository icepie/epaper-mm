import { Body, Controller, Get, Post } from '@nestjs/common';

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
}
