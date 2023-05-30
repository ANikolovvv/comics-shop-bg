export const Filter = (currentItems, search) => {
  const { minPrice, maxPrice, minYear, maxYear, author } = search;
  let minP = Number(minPrice);
  let maxP = Number(maxPrice);
  let minY = Number(minYear);
  let maxY = Number(maxYear);

  let data = [];
  if (minP && maxP && minY && maxY && author !== "") {
    data = currentItems.filter(
      (x) =>
        x.price >= minP &&
        maxP < x.price &&
        x.year >= minY &&
        x.year < maxY &&
        x.author === author
    );
  } else if (minPrice === "" && maxP && minY && maxY && author !== "") {
    data = currentItems.filter(
      (x) =>
        maxP <= x.price &&
        x.year >= minY &&
        x.year <= maxY &&
        x.author === author
    );
  } else if (minP && maxPrice === "" && minY && maxY && author !== "") {
    data = currentItems.filter(
      (x) =>
        x.price >= minP &&
        x.year >= minY &&
        x.year <= maxY &&
        x.author === author
    );
  } else if (minP && maxP && minYear === "" && maxY && author !== "") {
    data = currentItems.filter(
      (x) =>
        x.price >= minP &&
        maxP < x.price &&
        x.year < maxY &&
        x.author === author
    );
  } else if (minP && maxP && minY && maxYear === "" && author !== "") {
    data = currentItems.filter(
      (x) =>
        x.price >= minP &&
        maxP < x.price &&
        x.year >= minY &&
        x.author === author
    );
  } else if (minP && maxP && minY && maxY && author === "") {
    data = currentItems.filter(
      (x) =>
        x.price >= minP && maxP < x.price && x.year >= minY && x.year < maxY
    );
  } else if (
    minPrice === "" &&
    maxPrice === "" &&
    minY &&
    maxY &&
    author !== ""
  ) {
    data = currentItems.filter(
      (x) => x.year >= minY && x.year < maxY && x.author === author
    );
  } else if (
    minP &&
    maxP &&
    minYear === "" &&
    maxYear === "" &&
    author !== ""
  ) {
    data = currentItems.filter(
      (x) => x.price >= minP && maxP < x.price && x.author === author
    );
  } else if (minPrice === "" && maxP && minY && maxY && author === "") {
    data = currentItems.filter(
      (x) => maxP < x.price && x.year >= minY && x.year < maxY
    );
  } else if (
    minPrice === "" &&
    maxP &&
    minYear === "" &&
    maxY &&
    author !== ""
  ) {
    data = currentItems.filter(
      (x) => maxP < x.price && x.year < maxY && x.author === author
    );
  } else if (
    minPrice === "" &&
    maxP &&
    minY &&
    maxYear === "" &&
    author !== ""
  ) {
    data = currentItems.filter(
      (x) => maxP < x.price && x.year >= minY && x.author === author
    );
  } else if (
    minPrice === "" &&
    maxPrice === "" &&
    minY &&
    maxY &&
    author === ""
  ) {
    data = currentItems.filter((x) => x.year >= minY && x.year < maxY);

    data.map((x) => console.log(x.year));
  } else if (
    minP &&
    maxP &&
    minYear === "" &&
    maxYear === "" &&
    author === ""
  ) {
    data = currentItems.filter((x) => x.price >= minP && x.price < maxP);
    data.map((x) => console.log(x.price));
  } else if (
    minP &&
    maxPrice === "" &&
    minYear === "" &&
    maxYear === "" &&
    author === ""
  ) {
    data = currentItems.filter((x) => x.price === minP);
  } else if (
    minPrice === "" &&
    maxP &&
    minYear === "" &&
    maxYear === "" &&
    author === ""
  ) {
    data = currentItems.filter((x) => maxP === x.price);
  } else if (
    minPrice === "" &&
    maxP &&
    minYear === "" &&
    maxYear === "" &&
    author !== ""
  ) {
    data = currentItems.filter((x) => maxP === x.price && author === x.author);
  } else if (
    minY &&
    minPrice === "" &&
    maxPrice === "" &&
    maxYear === "" &&
    author === ""
  ) {
    data = currentItems.filter((x) => x.year === minY);
  } else if (
    minYear === "" &&
    minPrice === "" &&
    maxPrice === "" &&
    maxY &&
    author === ""
  ) {
    data = currentItems.filter((x) => x.year === maxY);
  } else if (
    minYear === "" &&
    minPrice === "" &&
    maxPrice === "" &&
    maxYear === "" &&
    author !== ""
  ) {
    data = currentItems.filter((x) => x.author === author);
    console.log("author 15", author, data);
  } 
  if (
    minYear === "" &&
    minPrice === "" &&
    maxPrice === "" &&
    maxYear === "" &&
    author === ""
  ) {
    data = currentItems;
  }
  return data;
};
