import { createAccessToken, createRefreshToken } from '../../utils/jwt.utils';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRoles } from './user.model';
import { LoginInput, RegisterInput } from './user.input';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usersModel: Model<UserDocument>) {}

  async findOne(email: string) {
    return await this.usersModel.findOne({ email }).select(['-__v']);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findOne(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) return null;

    return user;
  }

  async login(input: LoginInput) {
    const { id, username, email, roles } = await this.validateUser(
      input.email,
      input.password,
    );

    const accessToken = createAccessToken({
      id,
      username,
      email,
      roles,
    });

    await this.usersModel.findByIdAndUpdate(id, { accessToken });

    return { accessToken };
  }
  async register(input: RegisterInput) {
    const { username, email, password, confirmPassword } = input;
    if (password !== confirmPassword) {
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new this.usersModel({
      username,
      email,
      password: hashPassword,
      roles: [UserRoles.USER],
      accessToken: '',
      refreshToken: '',
    });
    await newUser.save();

    const refreshToken = createRefreshToken({
      id: newUser.id,
      username: newUser.username,
      roles: newUser.roles,
      email: newUser.email,
    });

    const accessToken = createAccessToken({
      id: newUser.id,
      username: newUser.username,
      roles: newUser.roles,
      email: newUser.email,
    });

    await this.usersModel.findByIdAndUpdate(
      { _id: newUser._id },
      { accessToken, refreshToken },
    );

    return { accessToken };
  }
}
