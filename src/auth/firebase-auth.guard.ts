import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import admin from '../utils/firebase-admin.config';
import { User, UserRole } from '../user/entities/user.entity';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userId = decodedToken.uid;
      const email = decodedToken.email;

      let user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user && email) {
        const isAdmin = this.isEmailAdmin(email); // Ejemplo de cómo asignar un rol
        const newUser = this.userRepository.create({
          id: userId,
          email,
          role: isAdmin ? UserRole.ADMIN : UserRole.USER,
        });
        user = await this.userRepository.save(newUser);
      }

      request['user'] = user;
      request['token'] = decodedToken;

      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private isEmailAdmin(email: string): boolean {
    const adminEmails = ['admin@example.com']; // Lista de correos de administradores
    return adminEmails.includes(email);
  }
}
