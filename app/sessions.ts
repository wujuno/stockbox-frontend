import { createCookieSessionStorage } from '@remix-run/node';

export const userSessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'user_session',
    httpOnly: true
  }
});
