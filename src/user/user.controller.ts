import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(
    @Body() credentials: { username: string; password: string },
  ): Promise<any> {
    const user = this.userService.getUser(credentials.username);
    if (user && user.password === credentials.password) {
      return { message: 'Login successful', points: user.points };
    }
    return { message: 'Invalid credentials' };
  }
}
