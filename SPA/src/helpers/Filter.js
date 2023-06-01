export const Filter = (currentItems, search, authors) => {
  const { minPrice, maxPrice, minYear, maxYear } = search;
  let data = currentItems;

  if (authors.length > 0) {
    data = data.filter((item) => authors.includes(item.author));
  }

  const filterByPrice = (item) => {
    const price = Number(item.price);
    if (minPrice && price <= Number(minPrice)) {
      return false;
    }
    if (maxPrice && price >= Number(maxPrice)) {
      return false;
    }
    return true;
  };

  const filterByYear = (item) => {
    const year = Number(item.year);
    if (minYear && year <= Number(minYear)) {
      return false;
    }
    if (maxYear && year >= Number(maxYear)) {
      return false;
    }
    return true;
  };

  data = data.filter(filterByPrice).filter(filterByYear);
  return data;
};
