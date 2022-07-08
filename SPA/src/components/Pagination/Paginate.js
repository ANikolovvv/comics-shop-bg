import { useEffect, useState } from "react";
//import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Card from "../Card/Card";
import "./Paginate.css";

const Paginate = (props) => {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;

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
    <>
     
      {currentItems.map((item) => {
        return <Card key={item._id} data={item}></Card>;
      })}

      <ReactPaginate
        breakLabel="..."
        nextLabel=" Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="Previous "
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page"
        previousLinkClassName="page"
        nextLinkClassName="page"
        activeLinkClassName="active"
      />
    </>
  );
};
export default Paginate;
