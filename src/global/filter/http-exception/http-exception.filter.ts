import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const status = exception.getStatus();

    console.log('exception', exception);

    // const message = exception.message ? exception.message : '请求失败';
    // if (!message) {

    let tmpMessage =
      exception.getResponse()['message'] || exception.message || '请求失败';

    if (typeof tmpMessage === 'object') {
      tmpMessage = tmpMessage[0];
    }

    const message = tmpMessage;
    // }

    const errorResponse = {
      code: status,
      message,
      // data: {},
    };

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
