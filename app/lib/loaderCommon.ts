import { tokenCookie } from '@/cookies';
import { redirect } from '@remix-run/node';

export const loaderCommonInit = async (request: Request) => {
  const token: TokenCookie = await tokenCookie.parse(request.headers.get('Cookie'));
  const needLogin = !/^\/(signin|signup).*/.test(request.url.replace(/https?:\/\//, '').replace(request.headers.get('Host') ?? '', ''));
  console.log('loaderCommonUrl', request.url, needLogin, token === null);
  if (needLogin && (!token || !token.accessToken)) {
    return redirect('/signin', {
      headers: {
        'Set-Cookie': await tokenCookie.serialize(null)
      }
    });
  }
  return null;
};
