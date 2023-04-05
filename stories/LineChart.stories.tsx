import { ComponentStory, ComponentMeta } from '@storybook/react';
import LineChart from '@/components/chart/LineChart';

export default {
  title: 'Chart/LineChart',
  component: LineChart
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = args => <LineChart {...args} />;

export const Line = Template.bind({});

Line.args = {};
