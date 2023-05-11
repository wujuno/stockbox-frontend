import { companyArticleState, companyNameState } from '@/atoms';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const SHOW_MAX_NUM = 10;

const Articles = () => {
  const companyName = useRecoilValue(companyNameState);
  const [articleData, setArticledata] = useRecoilState(companyArticleState);

  useEffect(() => {
    companyName &&
      axios
        .get(
          `api/pairtrading/crawling/?query=${encodeURIComponent(
            companyName
          )}&news_num=${SHOW_MAX_NUM}`
        )
        .then(response => {
          setArticledata(response.data);
        });
  }, [companyName, setArticledata]);

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
