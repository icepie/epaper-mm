import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class GetUserListReq {
  @ApiProperty({ description: '页码', example: 1 })
  @IsNotEmpty({ message: '页码不能为空' })
  @IsInt({ message: '页码必须是整数' })
  readonly page: number;
  @ApiProperty({ description: '每页条数', example: 10 })
  @IsNotEmpty({ message: '每页条数不能为空' })
  @IsInt({ message: '每页条数必须是整数' })
  readonly pageSize: number;
  @ApiProperty({ description: '搜索关键字', example: '张三' })
  @IsString({ message: '搜索关键字必须是字符串' })
  @Length(0, 20, { message: '搜索关键字长度不能超过20' })
  readonly search?: string;
}

export class User {
  readonly id: number;
  readonly username: string;
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class GetUserListResp {
  total: number;
  users: User[];
}
