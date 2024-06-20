import React from 'react';
export interface CarouselProps {
    isInfinite?: boolean;
    children: React.ReactNode[];
}
declare const Carousel: React.FC<CarouselProps>;
export default Carousel;
