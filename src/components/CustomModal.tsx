import React, { FC, ReactNode } from "react";
import ModalItem from "./ModalItem";

type ModalProps = {
  isOpen: boolean;
  children?: ReactNode;
};

const CustomModal: FC<ModalProps> = (props: ModalProps) => {
  return <>{props.isOpen && <ModalItem>{props.children}</ModalItem>}</>;
};

export default CustomModal;
