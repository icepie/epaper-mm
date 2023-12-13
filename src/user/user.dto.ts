import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUserListReq {
  @ApiProperty({ description: '页码', example: 1 })
  @IsNotEmpty({ message: '页码不能为空' })
  @IsInt({ message: '页码必须是整数' })
  readonly page: number;
  @ApiProperty({ description: '每页条数', example: 10 })
  @IsNotEmpty({ message: '每页条数不能为空' })
  @IsInt({ message: '每页条数必须是整数' })
  readonly pageSize: number;
  @ApiPropertyOptional({ description: '搜索关键字', example: '张三' })
  @IsOptional()
  @IsString({ message: '搜索关键字必须是字符串' })
  readonly search?: string;
}

// export class User {
//   readonly id: number;
//   readonly username: string;
//   readonly name: string;
//   readonly role: string;
//   readonly avatar: string;
//   readonly createdAt: Date;
//   readonly updatedAt: Date;
// }'

type User = {
  id: number;
  username: string;
  name: string;
  role: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export class GetUserListResp {
  total: number;
  list: User[];
}
