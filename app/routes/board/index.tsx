import { postListState } from '@/atoms';
import { Page } from '@/components/Layout';
import BoardList from '@/components/board/BoardList';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const PostMain = () => {
  const [postData, setPostData] = useRecoilState(postListState);

  useEffect(() => {
    axios
      .get('/api/board/?offset=4&limit=4')
      .then(res => setPostData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Page>
      <Container maxWidth="md">
        <Typography sx={{ mb: 5 }} variant="h3">
          Board
        </Typography>
        <Button variant="contained">게시물 등록</Button>
        <BoardList data={postData} />
      </Container>
    </Page>
  );
};

export default PostMain;
