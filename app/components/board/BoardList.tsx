import { postListState } from '@/atoms';
import { Box, Button, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const BoardList = () => {
  //읽기 전용 값 깊은 복사
  const postData = [...useRecoilValue(postListState)];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
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
            {postData
              .sort((a, b) => b.id - a.id)
              .map(post => (
                <TableRow key={post.id} user_id={post.user.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell sx={{ maxWidth: 300, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} align="center">
                    {post.title}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 100, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} align="right">
                    {post.user.nickname}
                  </TableCell>
                  <TableCell align="right">{post.date_updated.slice(0, 10)}</TableCell>
                  <TableCell sx={{ maxWidth: 50 }}>
                    <Button> ﹕</Button>
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
