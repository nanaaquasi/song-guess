var dateFormat = require("dateformat");

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
  added_at: string;
  track: TrackItem;
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

const COLORS = [
  "#271f43",
  "#722e63",
  "#031634",
  "#FE4365",
  "#FF9C5B",
  "#F5634A",
  "#ED303C",
  "#2eb67a",
  "#332e4c",
];

const correctMessages = [
  "Awesome",
  "Well Done",
  "Genius",
  "You know your music",
  "Spot On",
  "Amazing",
  "Good One",
];

const wrongMessages = ["Huh", "Uh Oh", "Oops", "Wrong", "Nope"];

export const generateCorrectMessages = (): string => {
  return correctMessages[Math.floor(Math.random() * correctMessages.length)];
};

export const generateWrongMessages = (): string => {
  return wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
};

export const generateRandColor = (): string => {
  const colorsLength = COLORS.length;
  return COLORS[Math.floor(Math.random() * colorsLength)];
};

export const formatDate = (dateString: string) => {
  // const options = { year: "numeric", month: "long", day: "numeric" };
  return dateFormat(dateString, "mmmm d, yyyy,");
};

export const getRandom = (arr: Track[], n: number) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};
