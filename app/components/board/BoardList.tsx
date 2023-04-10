interface BoardListProps {
  data: {
    id: number;
    title: string;
    content: string;
    data_updated: string;
    user_id: number;
  }[];
}

const BoardList = ({ data }: BoardListProps) => {
  return <div>BoardList</div>;
};

export default BoardList;
