import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

import Create from "./components/create";
import Home from "./components/home/home.js";

import Footer from "./components/footer";
import NotFound from "./components/404/404";
import Edit from "./components/edit";

import useFetch from "./hooks/useFetch";

import MyOrder from "./components/order/myOrder";
import Login from "./components/users/login";
import Register from "./components/users/register";

import Catalog from "./components/products/catalog.js";
import { GuestGuard, UserGuard } from "./common/authGuard.js";
import Header from "./components/header/header";
import Details from "./components/details/details.js";
import { routes } from "./helpers/routeConfig.js";
import About from "./components/about/about.js";

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
          <Route path={routes.about} element={<About />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
