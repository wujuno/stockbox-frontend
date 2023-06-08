import { tokenCookie } from '@/cookies';
import { userSessionStorage } from '@/sessions';
import { redirect } from '@remix-run/node';

export const loaderCommonInit = async (request: Request) => {
  const session = await userSessionStorage.getSession(request.headers.get('Cookie'));
  const token: TokenCookie = await tokenCookie.parse(request.headers.get('Cookie'));
  console.log('TOKEN:::', token);
  const { pathname } = new URL(request.url);
  const needLogin = !/^\/(signin|signup|findaccount|oauth).*/.test(pathname);

  if (
    (needLogin && (!token || !token.accessToken)) ||
    (needLogin &&
      token?.autoSignin !== 'true' &&
      typeof session.get('user')?.user_id === 'undefined')
  ) {
    const headers = new Headers();
    headers.append('Set-Cookie', await tokenCookie.serialize(null));
    headers.append('Set-Cookie', await userSessionStorage.destroySession(session));
    return redirect('/signin', { headers });
  }

  return null;
};

export const getUser = async (request: Request) => {
  const token: TokenCookie = await tokenCookie.parse(request.headers.get('Cookie'));
  return token.body;
};
