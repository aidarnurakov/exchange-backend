import * as bcrypt from 'bcryptjs';

export const encryptPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
