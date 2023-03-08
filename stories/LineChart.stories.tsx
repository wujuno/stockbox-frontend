import { ComponentStory } from '@storybook/react';
import LineChart from '@/components/LineChart';

export default {
  title: 'Chart/LineChart',
  component: LineChart
};

const Template: ComponentStory<typeof LineChart> = args => <LineChart {...args} />;

export const Line = Template.bind({});

Line.args = {
  data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  title: 'test',
  dark: false
};
