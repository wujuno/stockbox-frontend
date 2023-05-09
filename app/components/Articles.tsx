import { coArticleState, companyNameState, coTitleState } from '@/atoms';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const Articles = () => {
  const coName = useRecoilValue(companyNameState);
  const [aData, setAdata] = useRecoilState(coArticleState);
  const coTitle = useRecoilValue(coTitleState);
  const [isSame, setIsSame] = useState<boolean>();

  useEffect(() => {
    coName &&
      axios
        .get(`api/pairtrading/crawling/?query=${encodeURIComponent(coName)}&news_num=10`)
        .then(res => setAdata(JSON.parse(res.data)));
    setIsSame(coName === coTitle);
  }, [coName]);
  const aTitle: string[] = Object.values(aData.title);
  const aUrl: string[] = Object.values(aData.url);
  const imgUrl: string[] = Object.values(aData.img_url);
  const articleArr = aTitle.map((title, index) => ({
    title,
    url: aUrl[index],
    id: index,
    img: imgUrl[index]
  }));
  console.log(aData);
  return (
    <Stack
      sx={{
        overflowY: 'auto',
        maxHeight: '150px',
        mt: 2,
        '&::-webkit-scrollbar': {
          width: '6px',
          backgroundColor: '#F5F5F5'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '3px'
        }
      }}
      spacing={2}
    >
      {isSame ? (
        articleArr.map(obj => (
          <a href={obj.url} style={{ textDecoration: 'none' }} key={obj.id}>
            <Typography
              variant="subtitle2"
              sx={{
                '&:hover': {
                  color: 'blue'
                }
              }}
            >
              {obj.title}
            </Typography>
          </a>
        ))
      ) : (
        <p>로딩 중입니다</p>
      )}
    </Stack>
  );
};

export default Articles;
