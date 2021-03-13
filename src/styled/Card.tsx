import styled from "styled-components";

type CardProps = {
  width?: string;
  height?: string;
};

export const CardImage = styled.div`
  width: "${(props: CardProps) => props.width}";
  height: ${(props: CardProps) => props.height};
  border-radius: 2rem;
  overflow: hidden;
  /* flex-basis: 50%; */
  /* margin-top: -4rem; */
`;

export const GameCard = styled.div`
  width: 300px;
  height: 300px;
  padding: 2rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.3);
  background: linear-gradient(
    to right bottom,
    rgba(0, 24, 24, 0.7),
    rgba(0, 14, 6, 0.9)
  );
  border-radius: 1rem;
  z-index: 2;
  backdrop-filter: blur(1rem) saturate(100%) contrast(45%) brightness(130%);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    background: rgba(0, 29, 10, 0.444);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.7);
    transform: translateY(-1rem);
  }
  /* border: 0.2px solid #616161; */
`;
