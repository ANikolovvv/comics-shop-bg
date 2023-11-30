import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import Create from "./components/Create";
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
import Header from "./components/header/Header";
import Details from "./components/details/Details.js";
import { routes } from "./helpers/routeConfig.js";

function App() {
  const [comics] = useFetch([]);

  return (
    <AuthProvider>
      <Header />
      <main>
        <Routes>
          <Route path={routes.home} element={<Home comic={comics} />} />
          <Route path={routes.catalog} element={<Catalog comics={comics} />} />

          <Route element={<GuestGuard />}>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
          </Route>

          <Route path={routes.details} element={<Details />} />
          <Route element={<UserGuard />}>
            <Route path={routes.create} element={<Create />} />
            <Route
              path={routes.buyCreate}
              element={<Edit title={"Order"} name={"buy"} />}
            />
            <Route path={routes.myOrder} element={<MyOrder />} />
            <Route
              path={routes.edit}
              element={<Edit title={"Change order"} name={"edit"} />}
            />
          </Route>

          <Route path={routes.notFound} element={<NotFound />} />
          <Route path={routes.about} element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
