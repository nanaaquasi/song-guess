export type Image = {
  height?: string;
  width?: string;
  url?: string;
};

export type User = {
  name: string;
  profileImage: Image;
};

type Tracks = {
  total?: number;
  href: string;
};

type Owner = {
  display_name: string;
  type?: string;
};

export type PlaylistItem = {
  description: string;
  id: string;
  images?: Image[];
  name?: string;
  tracks?: Tracks;
  owner?: Owner;
};

export type Playlist = {
  total: number;
  items: PlaylistItem[];
};

export type Track = {
  added_at?: string;
  track?: TrackItem;
};

export type Album = {
  href?: string;
  name?: string;
  images?: Image[];
};

export type Artist = {
  id?: string;
  name?: string;
  uri?: string;
};

export type TrackItem = {
  id?: string;
  name?: string;
  popularity?: number;
  preview_url?: string;
  duration_ms?: number;
  artists?: Artist[];
  album?: Album;
};
