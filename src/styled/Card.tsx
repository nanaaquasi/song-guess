import styled, { css } from "styled-components";

type CardProps = {
  width?: string;
  height?: string;
};

type TrackCardProps = {
  selected?: boolean;
};

type AnswerCardProps = {
  bg?: string;
};

export const CardImage = styled.div`
  width: "${(props: CardProps) => props.width}";
  height: ${(props: CardProps) => props.height};
  border-radius: 2rem;
  overflow: hidden;

  @media (max-width: 700px) {
    width: 300px !important;
    height: 300px !important;
    margin-top: 0 !important;
  }

  > img {
    @media (max-width: 700px) {
      transform: translate(0rem, 0rem) !important;
      width: 300px !important;
      height: 300px !important;
      object-fit: contain !important;
      object-position: center !important;
    }
  }

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

  @media (max-width: 700px) {
    width: 350px !important;
    height: 200px !important;
    padding: 1rem !important;

    margin-bottom: 2rem;
  }

  > img {
    @media (max-width: 700px) {
      width: 60px !important;
      height: 60px !important;
    }
  }

  &:hover {
    background: rgba(0, 29, 10, 0.444);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.7);
    transform: translateY(-1rem);
  }
  /* border: 0.2px solid #616161; */
`;

export const PlaylistWrapper = styled.div`
  &:not(:last-child) {
    margin-right: 2rem;

    @media (max-width: 700px) {
      margin-right: 0.5rem;
    }
  }
  &:hover {
    transform: translateY(-0.2rem);
  }
`;
export const PlaylistCard = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4rem;
  background-color: rgba(0, 14, 6, 0.4);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  * > p {
    @media (max-width: 700px) {
      text-align: start;
    }
  }

  @media (max-width: 700px) {
    width: 350px !important;
    margin-top: 2rem;
    align-items: center;
  }

  &:hover {
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
  }

  > img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-right: 8px;

    &:hover {
      filter: grayscale(80%);
      transform: scale(1.02);
    }

    @media (max-width: 700px) {
      width: 50px;
      height: 50px;
    }
  }
`;

export const TrackCard = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(0, 14, 6, 0.4);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  ${(props: TrackCardProps) =>
    props.selected &&
    css`
      border: "2px solid yellowgreen";
    `};

  @media (max-width: 700px) {
    padding: 1rem;
    align-items: flex-start;
    justify-content: start;
  }

  &:hover {
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
  }

  > * img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 10px;

    &:hover {
      filter: grayscale(80%);
      transform: scale(1.02);
    }

    @media (max-width: 700px) {
      width: 50px;
      height: 50px;
      margin: auto 1.5rem auto 0;
    }
  }
`;

export const AnswerCard = styled.div`
  background: ${(props: AnswerCardProps) => props.bg};
  padding: 4rem;
  border-radius: 20px;

  & > * img {
    @media (max-width: 700px) {
      width: 100px !important;
    }
  }
`;
