import { companyArticleState, companyNameState } from '@/atoms';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const Articles = () => {
  const companyName = useRecoilValue(companyNameState);
  const [articleData, setArticledata] = useRecoilState(companyArticleState);
  //TODO: 상수화
  useEffect(() => {
    companyName &&
      axios
        .get(`api/pairtrading/crawling/?query=${encodeURIComponent(companyName)}&news_num=10`)
        .then(response => {
          setArticledata(response.data);
        });
  }, [companyName]);

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
      {articleData?.map((obj, index) => (
        <a
          href={obj.url}
          style={{ textDecoration: 'none' }}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
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
      ))}
    </Stack>
  );
};

export default Articles;
