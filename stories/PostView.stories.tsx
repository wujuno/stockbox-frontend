import PostView from '../app/components/board/PostView';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Board/PostView',
  component: PostView
} as ComponentMeta<typeof PostView>;

const Template: ComponentStory<typeof PostView> = args => <PostView {...args} />;

export const View = Template.bind({});

View.args = {
  data: {
    title: '삼성전자 가즈아',
    content: '<p><strong>안녕하세요.</strong></p><p>view 컴포넌트입니다.</p><p><i>삼성전자, 하이닉스</i></p>'
  },
  nickName: 'wujuno',
  createdAt: '2023-03-05'
};
