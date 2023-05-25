import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { DataFunctionArgs, json } from '@remix-run/node';
import { postListState } from '@/atoms';
import { Page } from '@/components/Layout';
import BoardList from '@/components/board/BoardList';
import { Box, Button, Container, Pagination, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { getBoardListAPI } from '@/services/board/getBoard';

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

interface IUserData {
  user: {
    exp: number;
    iat: number;
    jti: string;
    nickname: string;
    platform: string;
    token_type: string;
    user_id: number;
  };
}

const PostMain = () => {
  const { user } = useLoaderData<IUserData>();
  const [postData, setPostData] = useRecoilState(postListState);
  const [currPage, setCurrPage] = useState(1);
  //보여지는 list 개수
  const PAGEDIVNUM = 8;

  const navigate = useNavigate();
  const { t } = useTranslation('boardList');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getBoardListAPI();
        setPostData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Page>
      <Container maxWidth="md">
        <Box>
          <Typography sx={{ mb: 5 }} variant="h3">
            {t('headTitle')}
          </Typography>
        </Box>
        <BoardList currPage={currPage} pageDivNum={PAGEDIVNUM} user_id={user.user_id} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Button
            variant="contained"
            sx={{ mb: 1 }}
            onClick={() => navigate(`${user.user_id}/newpost`)}
          >
            {t('createPost')}
          </Button>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(postData.length / PAGEDIVNUM)}
              color="primary"
              onChange={(e, value) => setCurrPage(value)}
            />
          </Stack>
        </Box>
      </Container>
    </Page>
  );
};

export default PostMain;
