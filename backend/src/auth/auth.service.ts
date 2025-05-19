import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { User } from 'src/user/schemas/user.schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(email: string, password: string): Promise<{ token: string }> {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create(email, hashedPassword);

    const payload = { sub: newUser._id, email: newUser.email, role: newUser.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }
  
  async login(email: string, password: string): Promise<{ token: string }> {
  const user = await this.userService.findByEmail(email);
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { sub: user._id, email: user.email, role: user.role };
  const token = this.jwtService.sign(payload);

  return { token };
}
}
