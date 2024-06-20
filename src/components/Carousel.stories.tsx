import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Carousel from '../components/Carousel';

interface CarouselProps {
  isInfinite?: boolean;
  children: React.ReactNode[];
}

export default {
  title: 'Carousel',
  component: Carousel,
} as Meta;

const Template: StoryFn<CarouselProps> = (args) => (
  <div style={{ width: '100%', margin: '0 auto' }}>
    <Carousel {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isInfinite: true,
  children: [
    <div style={{ backgroundColor: '#f6f0dc', height: '200px' }}>Slide 1</div>,
    <div style={{ backgroundColor: '#c8e5a7', height: '200px' }}>Slide 2</div>,
    <div style={{ backgroundColor: '#80e285', height: '200px' }}>Slide 3</div>,
    <div style={{ backgroundColor: '#37b388', height: '200px' }}>Slide 4</div>,
    <div style={{ backgroundColor: '#00876a', height: '200px' }}>Slide 5</div>,
  ],
};
