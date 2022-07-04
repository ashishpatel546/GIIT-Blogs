import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { UserData } from 'src/user/user.service';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

const scrypt = promisify(_scrypt);

interface LoginCreds {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async signup(user: UserData) {
    const { email, password, name, mobile } = user;
    const findExistingUser = await this.userRepo.findOne({
      where: { email: email },
    });
    if (findExistingUser)
      throw new BadRequestException('user already exist with this email');
    const salt = randomBytes(16).toString('hex');
    const hash = (await scrypt(password.toString(), salt, 16)) as Buffer;
    const stringHashed = hash.toString('hex');
    const hashedPass = `${salt}.${stringHashed}`;
    const userParams = {
      email,
      password: hashedPass,
      name,
      mobile,
    };
    const newUser = this.userRepo.create(userParams);
    return this.userRepo.save(newUser);
  }

  async signin(loginCreds: LoginCreds) {
    const { email, password } = loginCreds;
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (!user) throw new NotFoundException('User not found');

    const storedPassword = user.password;

    const [salt, pass] = storedPassword.split('.');
    const stringHashed = (await scrypt(
      password.toString(),
      salt,
      16,
    )) as Buffer;

    const hashedPass = `${salt}.${stringHashed.toString('hex')}`;

    if (hashedPass !== storedPassword)
      throw new BadRequestException('User or Password does not match');

    const accessToken = sign(
      {
        email: email,
      },
      process.env.AUTH_SECRET,
      { expiresIn: '1h' },
    );
    const response = {
      token: accessToken,
    };
    return response;
  }

  verifyToken(token: string) {
    try {
      const decode = verify(token, process.env.AUTH_SECRET);
      return decode;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }

  findUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email: email } });
  }
}
