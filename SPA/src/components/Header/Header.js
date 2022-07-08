import { Link } from "react-router-dom";
import AuthContexts from "../../contexts/authContext";
import { useContext } from "react";
import { resLogout } from "../../services/server";


import './Header.css'

const Header = (props) => {
  console.log("props", props);

   let [user, setContext] = useContext(AuthContexts);
  const logoutHandller = (e) => {
    //let out = resLogout();
   
    e.preventDefault();
    let token=JSON.parse(localStorage.getItem('user'));
      console.log(localStorage.getItem('user'),'sdsaassasaaaaaaaaa')
     resLogout(token.accessToken)
     localStorage.clear();
    user = undefined;
    setContext(user);
  };
   const isUser = props.user !== undefined;
 
  console.log();
  return (
    <>
      <header>
        
        <nav className="container">
        
          <div className="row">
            <div className="col-sm-3">
              <div className="btno">
                <Link className="btn btn-lg" to="/">
                  Home
                </Link>
                <Link className="btn btn-lg" to="/catalog">
                  Catalog
                </Link>
              </div>
             
                <div className="btno">
                  <Link className="btn btn-lg" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-lg" to="/register">
                    Register
                  </Link>
                </div>
              
                <div className="btno">
                  <Link className="btn btn-lg" to="/create">
                    Orders
                  </Link>
                  <Link className="btn btn-lg" to="/my-orders">
                   My Orders
                  </Link>
                  <Link
                    className="btn btn-lg"
                    onClick={logoutHandller}
                    to="/login"
                  >
                    Logout
                  </Link>
                </div>
              
            </div>
          </div>
        </nav>
       
      </header>
    </>
  );
};
export default Header;
