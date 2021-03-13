import axios from "axios";
import jwtService from "./jwt.service";

export const logout = () => {
  jwtService.destroyItem("token");
};
