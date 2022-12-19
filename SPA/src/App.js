import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import Catalog from "./components/Catalog/Catalog";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import { Footer } from "./components/Footer/Footer";
import { MyOrder } from "./components/MyOrder/MyOrder";
import { NotFound } from "./components/404/404";
import { Edit } from "./components/Edit/Edit";
import Buy from "./components/Buy-create/BuyCreate";

import { Contact } from "./components/Contact-us/Contact";
import useFetch from "./hooks/useFetch";
import Logout from "./components/Logout/Logout";
import UserGuard from "./components/common/UserGuard";
import GuestGuard from "./components/common/GuestGuard";

function App() {
  
  const [comics] = useFetch([]);

  return (
    <AuthProvider>
      <div className="App">
        <Header></Header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home comic={comics} />}></Route>

            <Route
              path="/catalog"
              element={<Catalog comics={comics} />}
            ></Route>
            <Route element={<GuestGuard />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Route>

            <Route path="/details/:id" element={<Details />}></Route>
            <Route element={<UserGuard />}>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/create" element={<Create />}></Route>
              <Route path="/buy-create/:id" element={<Buy />}></Route>
              <Route path="/my-orders" element={<MyOrder />}></Route>
              <Route path="/edit/:id" element={<Edit />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/about" element={<Contact />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
