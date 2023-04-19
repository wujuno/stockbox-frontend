import { postListState } from '@/atoms';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRecoilValue } from 'recoil';

interface IBoardListProps {
  currPage: number;
  pageDivNum: number;
}

const BoardList: React.FC<IBoardListProps> = ({ currPage, pageDivNum }) => {
  //읽기 전용 값 깊은 복사
  const postData = [...useRecoilValue(postListState)].sort((a, b) => b.id - a.id);
  const dividedData = [];
  for (let i = 0; i < postData.length; i += pageDivNum) {
    dividedData.push(postData.slice(i, i + pageDivNum));
  }
  let viewData = dividedData[currPage - 1];

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
