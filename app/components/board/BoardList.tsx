interface BoardListProps {
  data: {
    id: number;
    title: string;
    createdAt: string;
    watchCount: number;
  }[];
}

const BoardList = ({ data }: BoardListProps) => {
  return <div>BoardList</div>;
};

export default BoardList;
