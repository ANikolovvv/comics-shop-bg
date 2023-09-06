import { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import Card from "../Card/Card";
import styles from "./Paginate.module.css";

const Paginate = (props) => {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  };

  return (
    <div className={styles["cards"]}>
      <div className={styles["cards-div"]}>
        {currentItems.map((item) => {
          return <Card key={item._id} data={item}></Card>;
        })}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel=" Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="Previous "
        renderOnZeroPageCount={null}
        containerClassName={styles["pagination"]}
        pageLinkClassName={styles["page"]}
        previousLinkClassName={styles["page"]}
        nextLinkClassName={styles["page"]}
        activeLinkClassName={styles["active"]}
      />
    </div>
  );
};
export default Paginate;
