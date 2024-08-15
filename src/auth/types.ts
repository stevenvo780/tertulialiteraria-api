import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';

export interface RequestWithUser extends Request {
  user: DecodedIdToken;
}
