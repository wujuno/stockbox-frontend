import { Box, Button, ButtonGroup } from '@mui/material';

interface PeriodOption {
  [key: string]: number;
}

interface IPeriodBoxProps {
  setPeriod: (args: number) => void;
}

const PeriodBox: React.FC<IPeriodBoxProps> = ({ setPeriod }) => {
  const periodOpt: PeriodOption = { '1 주': 7, '1 달': 30, '3 달': 90, '1년': 365 };
  const IperiodOpt: Map<string, number> = new Map(Object.entries(periodOpt));

  const periodHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPeriod(Number(event.currentTarget.value));
  };

  return (
    <Box sx={{ position: 'absolute', right: '160px', top: '0' }}>
      <ButtonGroup variant="outlined" size="small" aria-label="outlined button group">
        {Array.from(IperiodOpt).map(([key, value]) => (
          <Button id={key} key={key} value={value} onClick={periodHandler}>
            {key}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default PeriodBox;
