import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 2rem;
  z-index: 2000;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 700px) {
    width: 300px;
    height: 300px;
    margin: 2rem auto;
  }

  margin: 4rem auto;

  .modal-background {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1040;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-dialog {
    z-index: 1050;
    width: 100%;
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
  }
`;

const modalRoot = document.getElementById("modal-root");

type ModalProps = {
  children?: ReactNode;
};

const ModalItem: FC<ModalProps> = (props: ModalProps) => {
  React.useEffect(() => {}, []);
  return ReactDOM.createPortal(
    <StyledModal>
      <div className='modal-dialog'>{props.children}</div>
      <div className='modal-background'></div>
    </StyledModal>,
    modalRoot as HTMLElement
  );
};

export default ModalItem;
