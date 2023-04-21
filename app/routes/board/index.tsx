import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { DataFunctionArgs, json } from '@remix-run/node';

import { postListState } from '@/atoms';
import { Page } from '@/components/Layout';
import BoardList from '@/components/board/BoardList';
import { Box, Button, Container, Pagination, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from '@remix-run/react';

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

const PostMain = () => {
  const [postData, setPostData] = useRecoilState(postListState);
  const [currPage, setCurrPage] = useState(1);
  //보여지는 list 개수
  const PAGEDIVNUM = 8;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/board/')
      .then(res => {
        setPostData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Page>
      <Container maxWidth="md">
        <Box>
          <Typography sx={{ mb: 5 }} variant="h3">
            주식 종목 토론 게시판
          </Typography>
        </Box>
        <BoardList currPage={currPage} pageDivNum={PAGEDIVNUM} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Button variant="contained" sx={{ mb: 1 }} onClick={() => navigate('userId/newpost')}>
            게시물 등록
          </Button>
          <Stack spacing={2}>
            <Pagination count={Math.ceil(postData.length / PAGEDIVNUM)} color="primary" onChange={(e, value) => setCurrPage(value)} />
          </Stack>
        </Box>
      </Container>
    </Page>
  );
};

export default PostMain;
