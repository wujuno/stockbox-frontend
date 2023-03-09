import { ComponentStory, ComponentMeta } from '@storybook/react';
import TreeMapChart from '@/components/TreeMapChart';

export default {
  title: 'Chart/TreemapChart',
  component: TreeMapChart
} as ComponentMeta<typeof TreeMapChart>;

const Template: ComponentStory<typeof TreeMapChart> = args => <TreeMapChart {...args} />;

export const Treemap = Template.bind({});

Treemap.args = {
  data: [
    {
      x: 'Apples',
      y: 14,
      value: 0.4
    },
    {
      x: 'Oranges',
      y: 12,
      value: 0.1
    },
    {
      x: 'Bananas',
      y: 10,
      value: -0.2
    },
    {
      x: 'Mangoes',
      y: 6,
      value: -2.1
    },
    {
      x: 'Pineapples',
      y: 4,
      value: 2.0
    },
    {
      x: 'Pears',
      y: 3,
      value: 1.5
    },
    {
      x: 'Grapes',
      y: 2,
      value: -1.1
    }
  ],
  title: 'Example',
  height: 350,
  width: 400,
  dark: false
};
