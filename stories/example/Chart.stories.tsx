import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
import SChart from '@/components/Chart';

export default {
  title: 'Example/Chart',
  component: SChart,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof SChart> = args => <SChart {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  data: [
    {
      x: '02-05',
      y: 54
    },
    {
      x: '02-06',
      y: 66
    },
    {
      x: '02-07',
      y: 36
    },
    {
      x: '02-08',
      y: 20
    },
    {
      x: '02-09',
      y: 80
    },
    {
      x: '02-10',
      y: 55
    }
  ]
};
