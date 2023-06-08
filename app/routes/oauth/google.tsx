import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import axios from 'axios';
import qs from 'qs';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { tokenCookie } from '@/cookies';
import { getQsObjFromURL, getTokenBody } from '@/lib/utils';
import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { userSessionStorage } from '@/sessions';

const getTokens = async (code: string, isDevEnv: boolean) => {
  const query = qs.stringify(isDevEnv ? { code, env: 'development' } : { code }, {
    addQueryPrefix: false
  });
  console.log(`${process.env.API_URL}/api/auth/redirect/google?${query}`);
  const { access, refresh } = await axios
    .get(`${process.env.API_URL}/api/auth/redirect/google?${query}`)
    .then(({ data }) => data);
  const body: TokenBody = getTokenBody(access);
  return { accessToken: access, refreshToken: refresh, body };
};

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;

    const { code, env } = getQsObjFromURL(request.url);
    if (!code) return redirect('/signin');

    const tokens = await getTokens(code as string, env === 'development');

    const session = await userSessionStorage.getSession();
    session.set('user', tokens.body);

    const headers = new Headers();
    headers.append('Set-Cookie', await tokenCookie.serialize(tokens));
    headers.append('Set-Cookie', await userSessionStorage.commitSession(session));

    console.log(tokens);
    return json(null, {
      headers: {
        'Set-Cookie': await tokenCookie.serialize(tokens)
      }
    });
  } catch (err) {
    console.error(err + '');
    return redirect('/');
  }
};

const GoogleOAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, []);

  return null;
};

export default GoogleOAuthCheck;
