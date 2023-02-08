import { createCookie } from '@remix-run/node';

const isDevEnv = ['development', 'test'].includes(process.env.NODE_ENV) || true;
const secret = process.env.COOKIE_SECRET;

export const themeCookie = createCookie('theme', {
  maxAge: 604800,
  httpOnly: true,
  secure: !isDevEnv,
  secrets: [secret]
});

export const langCookie = createCookie('lng', {
  maxAge: 604800,
  httpOnly: true,
  secure: !isDevEnv,
  secrets: [secret]
});

export const tokenCookie = createCookie('token', {
  maxAge: 604800,
  httpOnly: true,
  secure: !isDevEnv,
  secrets: [secret]
});
