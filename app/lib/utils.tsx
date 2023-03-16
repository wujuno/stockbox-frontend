import qs from 'qs';

export const getQsObjFromURL = (url: string) => {
  const idx = url.indexOf('?');
  if (idx < -1) return {};
  const qsObj = qs.parse(url.substring(idx + 1));
  return qsObj;
};
