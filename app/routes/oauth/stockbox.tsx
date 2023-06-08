import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { tokenCookie } from '@/cookies';
import { getQsObjFromURL, getTokenBody } from '@/lib/utils';
import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { userSessionStorage } from '@/sessions';

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;

    const { access, refresh, autoSignin } = getQsObjFromURL(request.url);
    const body = getTokenBody(access as string);

    const tokens = {
      accessToken: access,
      refreshToken: refresh,
      autoSignin,
      body
    };

    const session = await userSessionStorage.getSession();
    session.set('user', body);

    const headers = new Headers();
    headers.append('Set-Cookie', await tokenCookie.serialize(tokens));
    headers.append('Set-Cookie', await userSessionStorage.commitSession(session));

    return json(null, { headers });
  } catch (err) {
    console.error(err + '');
    return redirect('/');
  }
};

const StockboxAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, []);

  return null;
};

export default StockboxAuthCheck;
