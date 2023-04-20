import PostView from '@/components/board/PostView';
import { Page } from '@/components/Layout';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { DataFunctionArgs, json } from '@remix-run/node';

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;
    const user = await getUser(request);
    return { user };
  } catch (err) {
    console.error(err);
  }
  return json(null);
};

const View = () => {
  return (
    <Page>
      <PostView />
    </Page>
  );
};

export default View;
