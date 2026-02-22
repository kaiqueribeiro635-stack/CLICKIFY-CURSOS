import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [];

  create(user: any) {
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }
}
