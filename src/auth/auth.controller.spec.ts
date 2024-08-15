import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
//import admin from '../utils/firebase-admin.config';

jest.mock('../lib/firebaseAdmin', () => ({
  auth: jest.fn().mockReturnValue({
    createUser: jest.fn(),
  }),
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register a new user', async () => {
    const mockUser = { email: 'test@example.com', password: 'password' };
    //admin.auth().createUser.mockResolvedValue(mockUser);

    const result = await service.register(mockUser);
    expect(result).toEqual(mockUser);
  });
});
