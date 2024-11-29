import * as bcrypt from 'bcryptjs';

export const encryptPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const getSkipPaginationValue = (page: number, limit: number): number => {
  if (page <= 0) {
    page = 1;
  }

  return page === 1 ? 0 : (page - 1) * limit;
};
