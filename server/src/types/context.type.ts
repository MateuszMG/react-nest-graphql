import { Request, Response } from 'express';
import { User } from 'src/features/users/user.model';

type Ctx = {
  req: Request & {
    user?: Pick<
      User,
      'id' | 'email' | 'username' | 'roles' | 'accessToken' | 'refreshToken'
    >;
  };
  res: Response;
};

export default Ctx;
