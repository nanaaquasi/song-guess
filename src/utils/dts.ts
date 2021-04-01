var dateFormat = require("dateformat");

export type Image = {
  height?: string | number;
  width?: string | number;
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

export const TEST_TRACKS: Track[] = [
  {
    added_at: "",
    track: {
      album: {
        href: "https://api.spotify.com/v1/albums/4OTAx9un4e6NfoHuVRiOrC",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/ab67616d0000b27394c9217a398f5174757c0c78",
            width: 640,
          },
        ],
        name: "Love In The Future (Expanded Edition)",
      },
      artists: [
        {
          id: "5y2Xq6xcjJb2jVM54GHK3t",
          name: "John Legend",
          uri: "spotify:artist:5y2Xq6xcjJb2jVM54GHK3t",
        },
      ],
      id: "3U4isOIWM3VvDubwSI3y7a",
      name: "All of Me",
      popularity: 87,
      preview_url:
        "https://p.scdn.co/mp3-preview/488c53471e56ff9f629652691444438951e880bb?cid=774b29d4f13844c495f206cafdad9c86",
    },
  },
  {
    added_at: "",
    track: {
      album: {
        href: "https://api.spotify.com/v1/albums/7pBwUBRsdgtIyX7tGOmaoy",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/ab67616d0000b273452bd32b5454a87f36ad8e8c",
            width: 640,
          },
        ],
        name: "Lady Day: The Complete Billie Holiday On Columbia (1933-1944)",
      },
      artists: [
        {
          id: "5y2Xq6xcjJb2jVM54GHK3t",
          name: "Billie Holiday",
          uri: "spotify:artist:1YzCsTRb22dQkh9lghPIrp",
        },
      ],
      id: "1LGqJ3nvxpVXDWpEzq4DJD",
      name: "All of Me",
      popularity: 65,
      preview_url:
        "https://p.scdn.co/mp3-preview/5b6f30e20eeb944b590e28cc4fc3b884efbf5454?cid=774b29d4f13844c495f206cafdad9c86",
    },
  },
  {
    added_at: "",
    track: {
      album: {
        href: "https://api.spotify.com/v1/albums/0JcMyAnJRTisEjYf9xEwkf",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/ab67616d0000b27304872b5f9c717fd2626f5058",
            width: 640,
          },
        ],
        name: "Love Someone",
      },
      artists: [
        {
          id: "5y2Xq6xcjJb2jVM54GHK3t",
          name: "Lukas Graham",
          uri: "spotify:artist:25u4wHJWxCA9vO0CzxAbK7",
        },
      ],
      id: "2JqnpexlO9dmvjUMCaLCLJ",
      name: "Love Someone",
      popularity: 65,
      preview_url:
        "https://p.scdn.co/mp3-preview/375df25b157b92d7a25a77b5114033904eba11bc?cid=b238b4dd0cd941b2a4945d31cdbdec17",
    },
  },
  {
    added_at: "",
    track: {
      album: {
        href: "https://api.spotify.com/v1/albums/2yQVxAYfAqBkUQyR5ROpAf",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/ab67616d0000b273622298782c28f18837e4cc9c",
            width: 640,
          },
        ],
        name: "Playing the Hits of Rihanna",
      },
      artists: [
        {
          id: "0rpos3tdyyc5uoxMM8Ptg9",
          name: "Tune Robbers",
          uri: "spotify:artist:0rpos3tdyyc5uoxMM8Ptg9",
        },
      ],
      id: "54u7NWUDaxf5RI2vcS80t1",
      name: "Love the Way You Lie - Piano Version",
      popularity: 7,
      preview_url:
        "https://p.scdn.co/mp3-preview/9141e3bb3426b66224d8ecb5265ce3b6b6bd4b81?cid=b238b4dd0cd941b2a4945d31cdbdec17",
    },
  },
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
