import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from '@remix-run/react';
import axios from 'axios';
import { useEffect } from 'react';

interface BoardListProps {
  data: {
    id: number;
    title: string;
    content: string;
    data_updated: string;
    user_id: number;
  }[];
}
function createData(id: number, title: string, author: string, date: string) {
  return { id, title, author, date };
}

const rows = [
  createData(1, '물고기를 키우는 것이 왜 좋은 선택인가요?sdfjsdkfjkldsjfldkjfldkjflkdsjfldjsdsfjdsklfjkldsjf', '김소월', '2023-04-11'),
  createData(2, '왜 교육은 우리 사회에서 중요한가요?', '한강sdfdfdsfdsfdsfs', '2023-04-13'),
  createData(3, '우주 여행이 우리 삶에 미치는 영향은 무엇일까요?', '하치도', '2023-04-14'),
  createData(4, '혁신적인 아이디어를 창출하는 방법은 무엇일까요?', '조정래', '2023-04-15'),
  createData(5, '기후 변화는 어떤 영향을 미칠까요?', '윤동주', '2023-04-16')
];

const BoardList = ({ data }: BoardListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell sx={{ minWidth: 250 }} align="center">
              title
            </TableCell>
            <TableCell sx={{ minWidth: 100 }} align="right">
              author
            </TableCell>
            <TableCell sx={{ minWidth: 100 }} align="right">
              createdAt
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .sort((a, b) => b.id - a.id)
            .map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell sx={{ maxWidth: 300, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} align="center">
                  {row.title}
                </TableCell>
                <TableCell sx={{ maxWidth: 100, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} align="right">
                  {row.author}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoardList;
