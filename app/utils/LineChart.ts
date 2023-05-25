const CORRECT_NUMBER = 1;
const SUNDAY = 0;
const SATURDAY = 6;

export const getStartDate = (period: number): Record<'startDate', string> => {
  const today = new Date();
  const daysAgo = new Date();
  daysAgo.setDate(today.getDate() - CORRECT_NUMBER);

  let daysToSubtract = period;

  while (daysToSubtract > 0) {
    daysAgo.setDate(daysAgo.getDate() - CORRECT_NUMBER);
    if (daysAgo.getDay() !== SUNDAY && daysAgo.getDay() !== SATURDAY) {
      daysToSubtract--;
    }
  }

  const year = daysAgo.getFullYear();
  const month = daysAgo.getMonth() + 1;
  const day = daysAgo.getDate();
  const startDate =
    year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
  return { startDate };
};
