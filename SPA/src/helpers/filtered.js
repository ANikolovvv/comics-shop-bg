export const filteredData = (info, price, year) => {
  let data = info;
  const filteredByPrice = (x) => {
    if (price && x.price < Number(price)) {
      return false;
    }
    return true;
  };
  const filteredByYear = (x) => {
    if (year && x.year < Number(year)) {
      return false;
    }
    return true;
  };
  data = data.filter(filteredByPrice).filter(filteredByYear);
  return data;
};
