import { postListState } from '@/atoms';
import { Page } from '@/components/Layout';
import BoardList from '@/components/board/BoardList';
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
      <BoardList data={postData} />
    </Page>
  );
};

export default PostMain;
