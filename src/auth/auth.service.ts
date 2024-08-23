import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import admin from '../utils/firebase-admin.config';
import { RegisterUserDto } from './dto/register.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepositoy: Repository<User>,
  ) {}

  async register(user: RegisterUserDto): Promise<User> {
    try {
      const newUser = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.name,
      });

      const userEntity = new User();
      userEntity.email = newUser.email;
      userEntity.id = newUser.uid;
      userEntity.name = user.name;
      await this.userRepositoy.save(userEntity);

      return userEntity;
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        throw new ConflictException('El correo electrónico ya está registrado');
      }
      throw new Error(error.message);
    }
  }
}
