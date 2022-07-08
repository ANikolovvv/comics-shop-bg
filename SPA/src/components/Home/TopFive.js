//import { useState,useEffect } from "react";
import "./TopFive.css";
import { Link } from "react-router-dom";


export function Top(props) {
  console.log(props.info, "props");
  const data=props.info;

    return(
      <div className="home">
          <p className="date-title">{data.title}</p>
        <img
          src={data.imageUrl}
          id="image"
          alt=".."
        />
         
        <div >
        <Link className="button-top" to={`/details/${data._id}`}>Read more</Link>
        </div>
         <p className="date-title">Raiting: {data.userLiked.length}</p>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
      </div>
    )
}
