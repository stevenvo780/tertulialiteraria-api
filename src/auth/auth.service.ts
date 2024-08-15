import { Injectable } from '@nestjs/common';
import admin from '../utils/firebase-admin.config';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  async register(user: RegisterUserDto) {
    try {
      const newUser = await admin.auth().createUser({
        email: user.email,
        password: user.password,
      });
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
