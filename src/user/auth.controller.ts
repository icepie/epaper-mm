import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserListReq } from './user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // 获取用户列表

  @Post('list')
  @ApiOperation({ summary: '获取用户列表' })
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async getUsers(@Body() req: GetUserListReq) {
    return this.userService.getUsers(req);
  }
}
