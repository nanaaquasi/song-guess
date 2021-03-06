import styled, { css } from "styled-components";

type StackProps = {
  isInline?: boolean;
  alignTop?: boolean;
  flexEnd?: boolean;
  noHeight?: boolean;
  spaceBetween?: boolean;
  center?: boolean;
  justify?: string;
  start?: boolean;
  wrap?: boolean;
  margin?: string;
};

type ContainerProps = {
  fluid?: boolean;
};

type HeadingProps = {
  size?: number;
  w?: string;
  center?: boolean;
};

type TextProps = {
  fontSize?: string;
  color?: string;
  bold?: boolean;
  medium?: boolean;
  heavy?: boolean;
};

type ButtonProps = {
  type?: "primary" | "secondary" | "tertiary";
};

// export const Stack = styled.div`
//   display: flex;
//   flex-basis: ${(props: StackProps) => props.flexBasis};
//   flex-direction: ${(props: StackProps) => (props.isInline ? "row" : "column")};
//   align-items: ${(props: StackProps) => props.align || "flex-start"};
//   justify-content: ${(props: StackProps) => props.justify || "start"};
//   > * :not(::first-child) {
//     margin-left: ${(props: StackProps) => props.spacing || "4px"};
//     margin-bottom: ${(props: StackProps) => props.spacing || "4px"};
//     margin-top: ${(props: StackProps) => props.spacing || "4px"};
//   }
// `;
export const Stack = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  margin: ${(props: StackProps) => props.margin || "0"};
  align-items: ${(props: StackProps) => (props.isInline ? "center" : "center")};
  flex-direction: ${(props: StackProps) => (props.isInline ? "row" : "column")};

  /* @media (max-width: 700px) {
    flex-direction: ${(props: StackProps) => props.isInline && "row"};
    margin: ${(props: StackProps) => props.margin && "4rem auto 0 auto"};
  } */

  ${(props: StackProps) =>
    props.spaceBetween &&
    css`
      width: 100%;
      justify-content: space-between;
    `}

  ${(props: StackProps) =>
    props.center &&
    css`
      justify-content: center;
    `}
    ${(props: StackProps) =>
    props.wrap &&
    css`
      flex-wrap: wrap;
    `}
  ${(props: StackProps) =>
    props.alignTop &&
    css`
      align-items: top;
    `};

  ${(props: StackProps) =>
    props.start &&
    css`
      align-items: start;
      justify-content: start;
    `};

  ${(props: StackProps) =>
    props.flexEnd &&
    css`
      justify-content: flex-end;
    `};

  ${(props: StackProps) =>
    props.noHeight &&
    css`
      height: 0;
    `};
`;

export const Cursor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: transparent !important;
  border: 3px solid #00af17 !important;
  transition: all 2s ease-in-out;
  transition-property: width, height, border;
  will-change: width, height, transform, border;
  pointer-events: none;
  z-index: 9999;

  &.pointer {
    border: 4px solid #00af17 !important;
  }
  &.hovered {
    background: transparent !important;
    width: 45px;
    height: 45px;
    border: 4px solid #1bf538;
  }
`;
export const Container = styled.div`
  position: relative;
  flex-grow: 1;
  width: auto;
  height: 100%;
  margin: 0 auto;
  padding: 1rem 3rem;

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
  text-align: ${(props: HeadingProps) => props.center && "center"};

  @media (max-width: 700px) {
    font-size: 36px;
    width: 100%;
  }
`;

export const Text = styled.p`
  @media (max-width: 700px) {
    font-size: 20px;
    width: 100% !important;
  }
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
  background-color: ${(props: ButtonProps) =>
    props.type === "secondary"
      ? "#64c986"
      : props.type === "tertiary"
      ? "#fff"
      : "#33ff4e"};

  color: ${(props: ButtonProps) =>
    props.type === "secondary" ? "rgb(0, 14, 6)" : "rgb(0, 14, 6)"};
  padding: 1rem 5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;

  &:hover {
    /* background-color: #00af17;
    color: rgb(248, 255, 251); */
    transform: scale(1.05);
  }
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid green;
  border-radius: 50%;
  padding: 2px;
  margin-right: 8px;

  @media (max-width: 700px) {
    width: 50px;
    height: 50px;
  }
`;

export const AvatarImage = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
