import { Track } from "./dts";

export const getParamValues = (url: string) => {
  return url
    .slice(1)
    .split("&")
    .reduce((prev: any, curr: any) => {
      const [title, value] = curr.split("=");
      prev[title] = value;
      return prev;
    }, {});
};

export const shuffleItems = (array: Track[]): Track[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
