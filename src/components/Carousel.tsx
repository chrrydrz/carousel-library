import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  CarouselContainer,
  CarouselTrack,
  CarouselItem,
  PrevButton,
  NextButton,
  DotsContainer,
  Dot,
} from './Carousel.styles';

export interface CarouselProps {
  isInfinite?: boolean;
  children: React.ReactNode[];
}

const isMobileDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const Carousel: React.FC<CarouselProps> = ({ children, isInfinite = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const itemsCount = React.Children.count(children);

  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        setItemWidth(trackRef.current.offsetWidth);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    return () => {
      if (trackRef.current) {
        resizeObserver.unobserve(trackRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setTranslateX(-currentIndex * itemWidth);
  }, [currentIndex, itemWidth]);

  const handleNext = () => {
    if (currentIndex < itemsCount - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (isInfinite) {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (isInfinite) {
      setCurrentIndex(itemsCount - 1);
    }
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartTime(Date.now());
    setPrevTranslate(translateX);
  };

  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const moveX = clientX - startX;
    setTranslateX(prevTranslate + moveX);
  };

  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);

  const handleDragEnd = () => {
    setIsDragging(false);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    const movedBy = translateX - prevTranslate;
    const velocity = Math.abs(movedBy / elapsedTime);

    let newIndex = currentIndex;
    const direction = movedBy > 0 ? -1 : 1;

    if (velocity > 0.3) {
      newIndex += direction * Math.ceil(velocity * 2);
    } else if (Math.abs(movedBy) > itemWidth / 2) {
      newIndex += direction;
    }

    if (isInfinite) {
      newIndex = (newIndex + itemsCount) % itemsCount;
      if (newIndex < 0) {
        newIndex += itemsCount;
      }
    } else {
      newIndex = Math.max(0, Math.min(itemsCount - 1, newIndex));
    }

    setCurrentIndex(newIndex);
    setTranslateX(-newIndex * itemWidth);
  };

  const handleTouchEnd = handleDragEnd;

  const throttle = (func: (...args: any[]) => void, limit: number) => {
    let inThrottle: boolean;
    return function (...args: any[]) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const throttledHandleTouchMove = useCallback(
    throttle((e: React.TouchEvent) => handleTouchMove(e), 50),
    [handleTouchMove]
  );

  return (
    <CarouselContainer>
      {(isInfinite || currentIndex > 0) && (
        <PrevButton onClick={handlePrev} aria-label="Previous Slide">
          &lt;
        </PrevButton>
      )}
      <CarouselTrack
        translateX={translateX}
        ref={trackRef}
        onTouchStart={isMobileDevice() ? handleTouchStart : undefined}
        onTouchMove={isMobileDevice() ? throttledHandleTouchMove : undefined}
        onTouchEnd={isMobileDevice() ? handleTouchEnd : undefined}
        style={{
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          transform: `translateX(${translateX}px)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <CarouselItem key={index}>{child}</CarouselItem>
        ))}
      </CarouselTrack>
      {(isInfinite || currentIndex < itemsCount - 1) && (
        <NextButton onClick={handleNext} aria-label="Next Slide">
          &gt;
        </NextButton>
      )}
      <DotsContainer>
        {React.Children.map(children, (_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

export default Carousel;
