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
