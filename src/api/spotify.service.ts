import { receive } from "./api.service";

export const getCurrentUserProfile = () => receive("/me");
