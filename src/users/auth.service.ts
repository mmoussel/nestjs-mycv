import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // find if user exists with this email
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('user already exists');
    }

    // hash the users password
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    // create a new user and save it
    const user = await this.usersService.create(email, result);

    return user;
  }

  async signin(email: string, password: string) {
    // find user with email
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new BadRequestException('Password is not correct');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // check password
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Password is not correct');
    }

    // return user
    return user;
  }
}
