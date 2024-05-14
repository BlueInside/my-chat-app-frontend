import styled, { keyframes } from 'styled-components';

// Keyframes for the dot bouncing effect
const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

// Styled component for the container of the dots
const DotsLoader = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  align-items: center;
  justify-content: center;
  top: 100%;
`;

// Styled component for each dot
const Dot = styled.div`
  background-color: #333; // Dark color for the dot
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin: 0 2px;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

export default function ThreeDotsLoader() {
  return (
    <DotsLoader>
      <Dot />
      <Dot />
      <Dot />
    </DotsLoader>
  );
}
