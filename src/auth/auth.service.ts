import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new NotFoundException('Usuario no existe');
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Contraseña invalida');
  }

  async login(user: LoginDto) {
    const validatedUser = await this.validateUser(user.email, user.password);
    if (validatedUser) {
      const payload = { email: validatedUser.email, sub: validatedUser.id };
      const userData = await this.userService.findOneByEmail(
        validatedUser.email,
      );
      return {
        userData,
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new ConflictException('Error al validar');
  }

  async register(user: RegisterUserDto) {
    const userExist = await this.userService.findOneByEmail(user.email);
    if (userExist) {
      throw new ConflictException('El usuario ya existe');
    }
    const hashedPassword = bcrypt.hashSync(user.password, 8);
    user.password = hashedPassword;
    await this.userService.create(user);
    const userLogin = await this.login({
      email: user.email,
      password: user.password,
    });
    return userLogin;
  }
}
