export const Filter = (currentItems, search, authors) => {
  const { minPrice, maxPrice, minYear, maxYear } = search;
  let data = currentItems;

  if (authors.length > 0) {
    data = data.filter((item) => authors.includes(item.author));
  }

  const filterByPrice = (item) => {
    const price = Number(item.price);
    return (
      (!minPrice || price >= Number(minPrice)) &&
      (!maxPrice || price <= Number(maxPrice))
    );
  };

  const filterByYear = (item) => {
    const year = Number(item.year);
    return (
      (!minYear || year >= Number(minYear)) &&
      (!maxYear || year <= Number(maxYear))
    );
  };

  data = data.filter(filterByPrice).filter(filterByYear);

  return data;
};
