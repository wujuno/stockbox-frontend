import { postListState } from '@/atoms';
import { Box, Button, Divider, Fab, IconButton, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { useRecoilValue } from 'recoil';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import axios from 'axios';

interface IBoardListProps {
  currPage: number;
  pageDivNum: number;
  user_id: number;
}

const BoardList: React.FC<IBoardListProps> = ({ currPage, pageDivNum, user_id }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  //읽기 전용 값 깊은 복사
  const postData = [...useRecoilValue(postListState)].sort((a, b) => b.id - a.id);
  const dividedData = [];
  for (let i = 0; i < postData.length; i += pageDivNum) {
    dividedData.push(postData.slice(i, i + pageDivNum));
  }
  let viewData = dividedData[currPage - 1];

  const listClickHandler = (id: number, content: string, title: string, nickname: string, userId: number, upDated: string) => {
    navigate(`${id}`, { state: { content, title, nickname, userId, upDated } });
  };
  // popover
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // delete post
  const deleteHandler = async (id: number) => {
    await axios
      .delete(`/api/board/delete/${id}`)
      .then(res => console.log(res.status))
      .catch(error => console.log(error));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell sx={{ minWidth: 250 }} align="center">
                title
              </TableCell>
              <TableCell sx={{ minWidth: 100 }} align="right">
                nickname
              </TableCell>
              <TableCell sx={{ minWidth: 100 }} align="right">
                createdAt
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {viewData?.map(post => (
              <TableRow key={post.id} user_id={post.user.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 300,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                  align="center"
                  onClick={() => listClickHandler(post.id, post.content, post.title, post.user.nickname, post.user.id, post.date_updated)}
                >
                  {post.title}
                </TableCell>
                <TableCell sx={{ maxWidth: 100, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} align="right">
                  {post.user.nickname}
                </TableCell>
                <TableCell align="right">{post.date_updated.slice(0, 10)}</TableCell>
                <TableCell align="right" sx={{ maxWidth: 40 }}>
                  {user_id === post.user.id && (
                    <IconButton color="primary" sx={{ p: '0' }} onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                  )}
                  <Popover
                    sx={{ boxShadow: 'none' }}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    elevation={1}
                  >
                    <Stack>
                      <Button variant="text">
                        <Typography variant="subtitle2" color="primary">
                          edit
                        </Typography>
                      </Button>
                      <Divider />
                      <Button variant="text" onClick={() => deleteHandler(post.id)}>
                        <Typography variant="subtitle2" color="error">
                          delete
                        </Typography>
                      </Button>
                    </Stack>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BoardList;
