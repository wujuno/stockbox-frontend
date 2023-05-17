import React, { useEffect } from 'react';
import { Page } from '@/components/Layout';
import { DataFunctionArgs, json } from '@remix-run/node';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { useLoaderData, useNavigate } from '@remix-run/react';

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;
    const user = await getUser(request);
    const { comId1, comId2 } = Object.fromEntries(new URL(request.url).searchParams.entries());
    return json({ user, comId1: comId1 as string, comId2: comId2 as string });
  } catch (err) {
    console.error(err);
  }
  return json(null);
};

const Compare = () => {
  const loaderData = useLoaderData<typeof loader>();
  console.log(loaderData);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loaderData?.comId1 || !loaderData?.comId2) navigate('/pairtrading');
  }, [loaderData, navigate]);

  return <Page>Hello</Page>;
};

export default Compare;
