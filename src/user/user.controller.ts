import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { RequestWithUser } from '../auth/types';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get all users (Super Admin only)' })
  @ApiOkResponse({ description: 'Return all users.', type: [User] })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get a user by ID (Super Admin only)' })
  @ApiOkResponse({ description: 'Return a user.', type: User })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get the authenticated user' })
  @ApiOkResponse({ description: 'Return the authenticated user.', type: User })
  @Get('me/data')
  getMe(@Request() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Update the role of a user by ID (Super Admin only)',
  })
  @ApiOkResponse({
    description: 'The user role has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Patch(':id')
  updateRole(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<Pick<User, 'role'>>,
  ) {
    return this.userService.updateRole(id, updateUserDto.role);
  }
}
