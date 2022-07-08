import { Link } from "react-router-dom";
import './Card.css'
//className="btn btn-outline-success btn-sm">
const Card = (props) => {
  console.log(props,'card');
  return (
   <div className="wraper">  
    <div key={props.data._id} className="card">
      <img src={props.data.imageUrl} alt="..." className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{props.data.title}</h5>
       
        <Link to={`/details/${props.data._id}`} info={props} className="button-top">
          Read More
        </Link>
        
      </div>
    </div>
    </div> 
  );
};
export default Card;
