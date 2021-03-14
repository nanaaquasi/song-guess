import React, { FC, ReactElement, ReactNode } from "react";
import { Avatar, AvatarImage, Stack } from "../styled/Shared";
import { User } from "../utils/dts";

interface NavProps {
  currentUser?: User;
  children?: ReactNode;
}

const Navbar: FC<NavProps> = ({ currentUser }: NavProps): ReactElement => {
  return (
    <Stack isInline spaceBetween>
      <Stack isInline>
        <h1>guesss.</h1>
      </Stack>
      {currentUser && (
        <Stack isInline flexEnd>
          <Avatar>
            <AvatarImage src={currentUser?.profileImage.url} />
          </Avatar>
          <h3>{currentUser?.name}</h3>
        </Stack>
      )}
    </Stack>
  );
};

export default Navbar;
