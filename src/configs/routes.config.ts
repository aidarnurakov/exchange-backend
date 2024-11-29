const roots = {
  authRoot: '/auth',
  orderRoot: '/orders',
};

export default {
  root: '/',
  swagger: 'docs',
  auth: {
    root: roots.authRoot,
    signUp: 'sign-up',
    login: 'login',
    refreshToken: 'refresh-token',
    me: 'me',
  },
  order: {
    root: roots.orderRoot,
    create: '',
    findById: '/:id',
    updateById: '/:id',
    list: '',
    deleteById: '/:id',
  },
};
