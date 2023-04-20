import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import styled from '@emotion/styled';
import { Divider, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataFunctionArgs, json } from '@remix-run/node';
import { useLocation } from '@remix-run/react';
import ReactHtmlParser from 'react-html-parser';

const Wrapper = styled(Paper)`
  .user_created-box {
    display: flex;
    justify-content: space-between;
  }
`;

const PostView = () => {
  const { state } = useLocation();

  return (
    <Wrapper sx={{ p: 5 }} variant="outlined">
      <div>
        <Typography sx={{ mb: 5 }} variant="h4">
          {state.title}
        </Typography>
        <div className="user_created-box">
          <Typography sx={{ mb: 1 }} variant="body2">
            {state.nickname}
          </Typography>
          <Typography sx={{ mb: 1 }} variant="body2">
            {state.upDated}
          </Typography>
        </div>
        <Divider />
      </div>
      <Box sx={{ pt: 2, pb: 2 }}>{ReactHtmlParser(state.content)}</Box>
    </Wrapper>
  );
};

export default PostView;
