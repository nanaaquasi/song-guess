import { receive } from "./api.service";

export const getCurrentUserProfile = () => receive("/me");

export const getUserPlaylists = () => receive("/me/playlists");

export const getTracksFromPlaylist = (id: string) =>
  receive(
    `playlists/${id}/tracks?market=ES&fields=items(added_at,track(id, preview_url, name, artists, popularity, duration_ms, album(name,href,images)))&limit=40&offset=5`
  );

export const getSeveralTracks = (ids: string) => receive(`/tracks?ids=${ids}`);
