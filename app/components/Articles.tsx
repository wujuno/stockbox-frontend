import { companyArticleState, companyNameState } from '@/atoms';
import { getArticlesDataAPI } from '@/services/chart/getArticles';
import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const Articles = () => {
  const companyName = useRecoilValue(companyNameState);
  const [articleData, setArticledata] = useRecoilState(companyArticleState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getArticlesDataAPI(companyName);
        setArticledata(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    companyName && fetchData();
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
