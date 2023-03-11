import { DataFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from 'react-router';

export const loader = async ({ params }: DataFunctionArgs) => {
  console.log(params);
  return json(params);
};

const $tempKey = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);
  return null;
};

export default $tempKey;
