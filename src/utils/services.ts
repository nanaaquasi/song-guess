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
