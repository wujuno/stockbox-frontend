import { editContentsState, postListState } from '@/atoms';
import { Button, ClickAwayListener, Divider, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import axios from 'axios';

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
interface IBoardListProps {
  currPage: number;
  pageDivNum: number;
  user_id: number;
}

const BoardList: React.FC<IBoardListProps> = ({ currPage, pageDivNum, user_id }) => {
  const { user } = useLoaderData<IUserData>();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>();
  const setEditData = useSetRecoilState(editContentsState);

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
  const handleClick = (id: number) => {
    setOpen(true);
    if (id === selectedPostId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(id);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedPostId(null);
  };

  // delete post
  const deleteHandler = async (id: number) => {
    const confirmDelete = window.confirm('삭제 하시겠습니까?');
    if (confirmDelete) {
      await axios
        .delete(`/api/board/delete/${id}`)
        .then(res => {
          if (res.status === 204) {
            window.location.reload();
          }
        })
        .catch(error => console.log(error));
    }
  };
  //edit
  const editHandler = (id: number, title: string, content: string) => {
    setEditData({ title, content });
    navigate(`${user.user_id}/editpost/${id}`);
  };

  return (
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
            <TableRow key={post.id}>
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
              <TableCell align="center" sx={{ maxWidth: 40, position: 'relative' }}>
                {user_id === post.user.id && (
                  <IconButton color="primary" sx={{ p: '0' }} onClick={() => handleClick(post.id)}>
                    <MoreVertIcon />
                  </IconButton>
                )}
                {open && selectedPostId === post.id && (
                  <ClickAwayListener onClickAway={handleClose}>
                    <Paper elevation={3} sx={{ position: 'absolute', left: '-50px', top: '10px' }}>
                      <Stack>
                        <Button variant="text" onClick={() => editHandler(post.id, post.title, post.content)}>
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
                    </Paper>
                  </ClickAwayListener>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoardList;
