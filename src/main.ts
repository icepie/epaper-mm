import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
// import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // const prismaService: PrismaService = app.get(PrismaService);

  // // 判断是否存在管理员用户
  // const adminUser = await prismaService.user.findFirst({
  //   where: { username: 'admin' },
  // });

  // if (!adminUser) {
  //   // 创建管理员用户
  //   await prismaService.user.create({
  //     data: {
  //       role: 'admin',
  //       username: 'admin',
  //       password: '123456',
  //     },
  //   });
  //   console.log('Admin user created successfully.');
  // } else {
  //   // 退出
  //   process.exit(1);
  // }

  app.enableCors();
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('e-paper example')
    .setDescription('The e-paper API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
