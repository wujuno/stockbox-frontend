import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import axios from 'axios';
import qs from 'qs';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { tokenCookie } from '@/cookies';
import { getQsObjFromURL } from '@/lib/utils';

const getTokens = async (code: string) => {
  const query = qs.stringify({ code }, { addQueryPrefix: false });
  const { access, refresh } = await axios.get(`http://127.0.0.1:3000/api/auth/redirect/kakao?${query}`).then(({ data }) => data);
  return { accessToken: access, refreshToken: refresh };
};

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;

    const { code } = getQsObjFromURL(request.url);
    if (!code) return redirect('/signin');

    const tokens = await getTokens(code as string);
    return redirect('/', {
      headers: {
        'Set-Cookie': await tokenCookie.serialize(tokens)
      }
    });
  } catch (err) {
    console.error(err);
    return redirect('/');
  }
};

const OAuthCheck = () => null;
export default OAuthCheck;
