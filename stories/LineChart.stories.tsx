import { ComponentStory, ComponentMeta } from '@storybook/react';
import LineChart from '@/components/chart/LineChart';

export default {
  title: 'Chart/LineChart',
  component: LineChart
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = args => <LineChart {...args} />;

export const Line = Template.bind({});

Line.args = {
  data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  title: 'Example',
  dark: false
};
