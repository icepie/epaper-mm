import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';

import { Device } from '@prisma/client';
import { DeviceService } from './device.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiProperty, ApiConsumes } from '@nestjs/swagger';

export class CreateFileManageDto {
  // 这里
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

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

  @Post('/change')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async changeData(
    @UploadedFile() file: Express.Multer.File,
    @Body() _fileInfo: CreateFileManageDto,
  ) {
    const data = JSON.parse(file.buffer.toString());

    return this.deviceService.changeData(data);
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
