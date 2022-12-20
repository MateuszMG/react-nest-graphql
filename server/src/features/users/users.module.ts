import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UsersResolver } from './user.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
