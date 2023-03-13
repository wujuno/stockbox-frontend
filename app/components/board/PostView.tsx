import styled from '@emotion/styled';
import { Divider, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ReactHtmlParser from 'react-html-parser';

const Wrapper = styled(Paper)`
  .user_created-box {
    display: flex;
    justify-content: space-between;
  }
`;

type ViewProps = {
  data: {
    title: string;
    content: string;
  };
  nickName: string;
  createdAt: string;
};

const PostView = ({ data, nickName, createdAt }: ViewProps) => {
  return (
    <Wrapper sx={{ p: 5 }} variant="outlined">
      <div>
        <Typography sx={{ mb: 5 }} variant="h4">
          {data?.title}
        </Typography>
        <div className="user_created-box">
          <Typography sx={{ mb: 1 }} variant="body2">
            {nickName}
          </Typography>
          <Typography sx={{ mb: 1 }} variant="body2">
            {createdAt}
          </Typography>
        </div>
        <Divider />
      </div>
      <Box sx={{ pt: 2, pb: 2 }}>{ReactHtmlParser(data?.content)}</Box>
    </Wrapper>
  );
};

export default PostView;
