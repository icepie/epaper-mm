import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string): Promise<any> {
    // 查找用户
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    if (user.password !== pass) {
      throw new UnauthorizedException('密码错误');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      token: this.jwtService.sign(payload),
      userInfo: {
        username: user.username,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  async getProfile(userId: number): Promise<any> {
    // console.log('userId', userId);

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    return {
      username: user.username,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    };
  }
}
