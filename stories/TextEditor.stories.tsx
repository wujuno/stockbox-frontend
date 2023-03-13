import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextEditor from '@/components/board/TextEditor';

export default {
  title: 'Board/Editor',
  component: TextEditor
} as ComponentMeta<typeof TextEditor>;

const Template = args => <TextEditor {...args} />;

export const Editor = Template.bind({});
