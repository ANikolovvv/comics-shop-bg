import { Route, Routes } from "react-router-dom";

import { AuthContexts } from "./contexts/AuthContext";
import Catalog from "./components/Catalog/Catalog";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";
import Header from "./components/common/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Footer } from "./components/common/Footer/Footer";
import { MyOrder } from "./components/MyOrder/MyOrder";
import { NotFound } from "./components/404/404";
import { Edit } from "./components/Edit/Edit";
import Buy from "./components/Buy-create/BuyCreate";
import { useLocaleStorage } from "./hooks/useLocaleStorage";
import { Contact } from "./components/Contact-us/Contact";
import useFetch from "./hooks/useFetch";
import Logout from "./components/Logout/Logout";

function App() {
  const [auth, setAuth] = useLocaleStorage("auth", {});
  const [comics] = useFetch(`http://localhost:3030/api`, []);

  const userLogin = (authData) => {
    setAuth(authData);
  };

  const userLogout = () => {
    setAuth({});
  };

  return (
    <AuthContexts.Provider value={{ user: auth, userLogin, userLogout }}>
      <div className="App">
        <Header></Header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home comic={comics} />}></Route>
            <Route path="/about" element={<Contact />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/catalog"
              element={<Catalog comics={comics} />}
            ></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/buy-create/:id" element={<Buy />}></Route>
            <Route path="/my-orders" element={<MyOrder />}></Route>
            <Route path="/details/:id" element={<Details />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContexts.Provider>
  );
}

export default App;
