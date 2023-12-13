import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GetUserListReq, GetUserListResp } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // 获取用户列表 分页 搜索

  async getUsers(req: GetUserListReq): Promise<GetUserListResp> {
    const { page, pageSize, search } = req;

    const where = {};

    if (search) {
      Object.assign(where, {
        OR: [
          {
            username: {
              contains: search,
            },
          },
          {
            name: {
              contains: search,
            },
          },
        ],
      });
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          username: true,
          name: true,
          role: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      list: users,
      total,
    };
  }
}
