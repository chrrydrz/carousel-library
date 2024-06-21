import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Carousel from '../components/Carousel';

interface CarouselProps {
  isInfinite?: boolean;
  children: React.ReactNode[];
}

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

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
  children: Array.from({ length: 10 }, (_, i) => (
    <div style={{ backgroundColor: generateRandomColor(), height: '200px' }}>
      Slide {i + 1}
    </div>
  )),
};
