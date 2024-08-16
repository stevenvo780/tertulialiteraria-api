import { Request } from 'express';
import { User } from '../user/entities/user.entity';
import { DecodedIdToken } from 'firebase-admin/auth';

export interface RequestWithUser extends Request {
  user: User;
  token: DecodedIdToken;
}
