import { Role } from '@modules/users/enums/role.enum';

export class User {
  userId: number;
  username: string;
  password: string;

  roles: Role[];
}
