import styled, { css } from "styled-components";

type StackProps = {
  isInline?: boolean;
  align?: string;
  justify?: string;
  spacing?: string;
  flexBasis?: string;
};

type ContainerProps = {
  fluid?: boolean;
};

type HeadingProps = {
  size?: number;
  w?: string;
};

type TextProps = {
  fontSize?: string;
  color?: string;
  bold?: boolean;
  medium?: boolean;
  heavy?: boolean;
};

type ButtonProps = {
  type?: "primary" | "secondary";
};

export const Stack = styled.div`
  display: flex;
  flex-basis: ${(props: StackProps) => props.flexBasis};
  flex-direction: ${(props: StackProps) => (props.isInline ? "row" : "column")};
  align-items: ${(props: StackProps) => props.align || "flex-start"};
  justify-content: ${(props: StackProps) => props.justify || "start"};
  > * :not(::first-child) {
    margin-left: ${(props: StackProps) => props.spacing || "4px"};
    margin-bottom: ${(props: StackProps) => props.spacing || "4px"};
    margin-top: ${(props: StackProps) => props.spacing || "4px"};
  }
`;

export const Container = styled.div`
  position: relative;
  flex-grow: 1;
  width: auto;
  height: 100%;
  margin: 0 auto;
  padding: 1rem 3.2rem;

  ${(props: ContainerProps) =>
    props.fluid &&
    css`
      margin: 0;
      padding: 0;
      max-width: 100%;
    `}

  @media (min-width: 1024px) {
    max-width: 100rem;
  }

  @media (min-width: 1216px) {
    max-width: 120.2rem;
  }

  @media (min-width: 1408px) {
    max-width: 124.4rem;
  }
`;

export const Heading = styled.h1`
  margin: 0.8rem 0;
  font-size: ${(props: HeadingProps) => props.size + "px" || "48px"};
  width: ${(props: HeadingProps) => props.w || "100%"};
  font-weight: bold;
  line-height: 1.2;
  font-family: "Euclid Square";
  text-align: center;
`;

export const Text = styled.p`
  text-align: center;

  font-size: ${(props: TextProps) => props.fontSize || "16px"};
  color: ${(props: TextProps) => props.color || "#fff"};
  ${(props: TextProps) =>
    props.bold &&
    css`
      font-weight: bold;
    `}

  ${(props: TextProps) =>
    props.medium &&
    css`
      font-weight: 600;
    `}

  ${(props: TextProps) =>
    props.heavy &&
    css`
      font-weight: 900;
    `}
`;

export const Button = styled.div`
  background-color: #33ff4e;
  color: rgb(0, 14, 6);
  padding: 1rem 5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #00af17;
    color: rgb(248, 255, 251);
    transform: scale(1.05);
  }
`;
