import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaModule } from 'nestjs-prisma';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [DeviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
