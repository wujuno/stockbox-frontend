import { coArticleState, coNameState, coTitleState } from '@/atoms';
import { Stack, Typography } from '@mui/material';
import { Link } from '@remix-run/react';
import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const Articles = () => {
  const coName = useRecoilValue(coNameState);
  const [aData, setAdata] = useRecoilState(coArticleState);
  const coTitle = useRecoilValue(coTitleState);
  const [isSame, setIsSame] = useState<boolean>();

  useEffect(() => {
    coName && axios.get(`api/pairtrading/crawling/?query=${encodeURIComponent(coName)}&news_num=10`).then(res => setAdata(JSON.parse(res.data)));
    setIsSame(coName === coTitle);
  }, [coName]);
  const aTitle: string[] = Object.values(aData.title);
  const aUrl: string[] = Object.values(aData.url);
  const articleArr = aTitle.map((title, index) => ({ title, url: aUrl[index], id: index }));
  console.log(isSame);
  return (
    <Stack sx={{ overflowY: 'auto', maxHeight: '150px', mt: 2 }} spacing={2}>
      {isSame ? (
        articleArr.map(obj => (
          <Typography key={obj.id} variant="subtitle2">
            <Link to={obj.url}>{obj.title}</Link>
          </Typography>
        ))
      ) : (
        <p>로딩 중입니다</p>
      )}
    </Stack>
  );
};

export default Articles;
