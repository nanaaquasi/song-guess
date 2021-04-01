import React, { FC, ReactElement, ReactNode } from "react";
import { useHistory } from "react-router";
import { Avatar, AvatarImage, Stack } from "../styled/Shared";
import { User } from "../utils/dts";

interface NavProps {
  currentUser?: User;
  children?: ReactNode;
}

const Navbar: FC<NavProps> = ({ currentUser }: NavProps): ReactElement => {
  const history = useHistory();
  return (
    <Stack isInline spaceBetween>
      <Stack isInline onClick={() => history.push("/welcome")}>
        <h1 style={{ color: "#1bf538" }}>guessify.</h1>
      </Stack>
      {currentUser && (
        <Stack isInline flexEnd>
          <Avatar>
            <AvatarImage src={currentUser?.profileImage.url || ""} />
          </Avatar>
          <h3>{currentUser?.name || ""}</h3>
        </Stack>
      )}
    </Stack>
  );
};

export default Navbar;
