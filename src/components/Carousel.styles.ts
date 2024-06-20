import styled from 'styled-components';

export const CarouselContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const CarouselTrack = styled.div<{ translateX: number }>`
  display: flex;
  transition: transform 0.3s ease;
  transform: ${({ translateX }) => `translateX(${translateX}px)`};
  will-change: transform;
`;

export const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 100%;
`;

export const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
`;

export const PrevButton = styled(Button)`
  left: 10px;
`;

export const NextButton = styled(Button)`
  right: 10px;
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 1;
`;

export const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'black' : 'gray')};
  margin: 0 5px;
  transition: background-color 0.3s ease;
`;
