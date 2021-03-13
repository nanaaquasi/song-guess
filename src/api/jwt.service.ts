const key = "GUESS";
const storeItem = (item: any, type: string) =>
  localStorage.setItem(`${key}-${type}`, item);
const getItem = (type: string) => localStorage.getItem(`${key}-${type}`);
const destroyItem = (type: string) => localStorage.removeItem(`${key}-${type}`);

export default { storeItem, getItem, destroyItem };
