import { DataFunctionArgs, redirect } from '@remix-run/node';
import axios from 'axios';
import qs from 'qs';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { tokenCookie } from '@/cookies';
import { getQsObjFromURL, getTokenBody } from '@/lib/utils';

const getTokens = async (code: string, isDevEnv: boolean) => {
  const query = qs.stringify(isDevEnv ? { code, env: 'development' } : { code }, { addQueryPrefix: false });
  console.log(`${process.env.API_URL}/api/auth/redirect/kakao?${query}`);
  const { access, refresh } = await axios.get(`${process.env.API_URL}/api/auth/redirect/kakao?${query}`).then(({ data }) => data);
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
    console.log(tokens);
    return redirect('/', {
      headers: {
        'Set-Cookie': await tokenCookie.serialize(tokens)
      }
    });
  } catch (err) {
    console.error(err + '');
    return redirect('/');
  }
};

const KakaoOAuthCheck = () => null;
export default KakaoOAuthCheck;
