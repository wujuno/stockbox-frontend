import { DataFunctionArgs, redirect } from '@remix-run/node';
import axios from 'axios';
import { loaderCommonInit } from '@/lib/loaderCommon';
import { tokenCookie } from '@/cookies';

const getTokens = async (key: string | number) => {
  const { access, refresh } = await axios.get(`/api/auth/token/${key}`).then(({ data }) => data);
  return { accessToken: access, refreshToken: refresh };
};

export const loader = async ({ request, params }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;

    const tempKey = Number(params.tempKey);
    if (!tempKey) return redirect('/signin');

    const tokens = await getTokens(tempKey);
    return redirect('/', {
      headers: {
        'Set-Cookie': await tokenCookie.serialize(tokens)
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const OAuthCheck = () => null;
export default OAuthCheck;
