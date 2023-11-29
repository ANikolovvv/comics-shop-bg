import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import Create from "./components/Create";
import Details from "./components/Details/Details";
import Home from "./components/Home/Home";

import Footer from "./components/Footer";
import NotFound from "./components/404/404";
import Edit from "./components/Edit";

import Contact from "./components/Contact-us/Contact";
import useFetch from "./hooks/useFetch";

import MyOrder from "./components/MyOrder/MyOrder";
import Login from "./components/users/Login";
import Register from "./components/users/Register";

import Catalog from "./components/Catalog/Catalog";
import { GuestGuard, UserGuard } from "./common/authGuard.js";
import Header from "./components/Header/Header.js";


function App() {
  const [comics] = useFetch([]);

  return (
    <AuthProvider>
      <Header/>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home comic={comics} />}></Route>

          <Route path="/catalog" element={<Catalog comics={comics} />}></Route>
          <Route element={<GuestGuard />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>

          <Route path="/details/:id" element={<Details />}></Route>
          <Route element={<UserGuard/>}>
            <Route path="/create" element={<Create />}></Route>
            <Route
              path="/buy-create/:id"
              element={<Edit title={"Order"} name={"buy"} />}
            ></Route>
            <Route path="/my-orders/" element={<MyOrder />}></Route>
            <Route
              path="/edit/:id"
              element={<Edit title={"Change order"} name={"edit"} />}
            ></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/about" element={<Contact />}></Route>
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
