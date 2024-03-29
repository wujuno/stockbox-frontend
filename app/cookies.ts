import { createCookie } from '@remix-run/node';

export const themeCookie = createCookie('theme', {
  maxAge: 604800,
  httpOnly: true,
  sameSite: true
});

export const langCookie = createCookie('lng', {
  maxAge: 604800,
  httpOnly: true,
  sameSite: true
});

export const tokenCookie = createCookie('token', {
  maxAge: 604800,
  httpOnly: true,
  sameSite: true
});
