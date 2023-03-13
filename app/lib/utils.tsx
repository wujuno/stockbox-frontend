import qs from 'qs';

export const getQsObjFromURL = (url: string) => {
  const idx = url.indexOf('?');
  if (idx < -1) return {};
  console.log(url);
  const qsObj = qs.parse(url.substring(idx + 1));
  console.log(qsObj);
  return qsObj;
};
