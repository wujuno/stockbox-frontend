import { DataFunctionArgs, redirect } from '@remix-run/node';
import axios from 'axios';
import qs from 'qs';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { tokenCookie } from '@/cookies';
import { getQsObjFromURL } from '@/lib/utils';

const getTokens = async (code: string, isDevEnv: boolean) => {
  const query = qs.stringify(isDevEnv ? { code, env: 'development' } : { code }, { addQueryPrefix: false });
  console.log(`${process.env.API_URL}/api/auth/redirect/google?${query}`);
  const { access, refresh } = await axios.get(`${process.env.API_URL}/api/auth/redirect/google?${query}`).then(({ data }) => data);
  return { accessToken: access, refreshToken: refresh };
};

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;

    const { code } = getQsObjFromURL(request.url);
    if (!code) return redirect('/signin');

    const tokens = await getTokens(code as string, process.env.NODE_ENV !== 'production');
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

const GoogleOAuthCheck = () => null;
export default GoogleOAuthCheck;
