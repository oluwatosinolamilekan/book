import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    {
      email: 'admin@test.com',
      password: 'admin',
      points: 100,
    },
  ];

  getUser(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
