import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaModule } from 'nestjs-prisma';
import { DeviceModule } from './device/device.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [DeviceModule, LoggerModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
