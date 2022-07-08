import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as requests from "../../services/server";
import "./Details.css";

const Details = () => {
  const [comic, setComic] = useState({});
  let { id } = useParams();
  console.log(id, "id");
  let arr = comic.userLiked;
  let final = arr?.length;

  useEffect(() => {
    requests.getData(id).then((result) => {
      console.log(result, "result");
      setComic(result);
    });
  }, [id]);
  return (
    <>
      <div id="container">
        <div className="product-details">
          <h1>{comic.title}</h1>

          <span className="hint-star star">
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star-half-o" aria-hidden="true"></i>
            <i className="fa fa-star-o" aria-hidden="true"></i>
          </span>

          <p className="information">{comic.description}</p>
          <div className="like">
            <button className="btn">Like</button>
          </div>

          <div className="control">
            <button className="btn">Buy</button>
            <button className="btn">Edit</button>
            <button className="btn">Delete</button>
          </div>
        </div>

        <div className="product-image">
          <img src={comic.imageUrl} alt={comic.title} />

          <div className="info">
            <h2>The Description</h2>
            <ul>
              <li key={1}>
                <strong>Author: </strong>
                {comic.author}
              </li>
              <li key={2}>
                <strong>Price: </strong>
                {comic.price}
              </li>
              <li key={3}>
                <strong>Release data: </strong>
                {comic.year}
              </li>
              <li key={4}>
                <strong>Rating: </strong>
                {final}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Details;
//float: right;
