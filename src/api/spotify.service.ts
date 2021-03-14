import { receive } from "./api.service";

export const getCurrentUserProfile = () => receive("/me");

export const getUserPlaylists = () => receive("/me/playlists");
