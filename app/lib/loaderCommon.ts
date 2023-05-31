import { tokenCookie } from '@/cookies';
import { redirect } from '@remix-run/node';

export const loaderCommonInit = async (request: Request) => {
  const token: TokenCookie = await tokenCookie.parse(request.headers.get('Cookie'));
  console.log('TOKEN:::', token);
  const needLogin = !/^\/(signin|signup|findaccount|oauth).*/.test(
    request.url.replace(/https?:\/\//, '').replace(request.headers.get('Host') ?? '', '')
  );
  console.log('???', request.url, needLogin);

  if (needLogin && (!token || !token.accessToken)) {
    return redirect('/signin', {
      headers: {
        'Set-Cookie': await tokenCookie.serialize(null)
      }
    });
  }

  return null;
};

export const getUser = async (request: Request) => {
  const token: TokenCookie = await tokenCookie.parse(request.headers.get('Cookie'));
  return token.body;
};
