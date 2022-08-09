import { BrowserRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import Catalog from "./Catalog";

import { AuthProvider } from "../../contexts/authContext";

test("Loading comics from server", async () => {
  const data = await fetch("https://test-server-rest-api.herokuapp.com/api/");
  const res = await data.json();
  function wait(time) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(res);
      }, time);
    });

    return promise;
  }
  const all = await wait(3000);

  expect(all.length).not.toBe(0);
});
test("render Title and Spinner", async () => {
  const { getByText } = render(
    <BrowserRouter>
      <AuthProvider
        value={{
          user: { email: "dsasAbc." },
        }}
      >
        <Catalog></Catalog>
      </AuthProvider>
    </BrowserRouter>
  );

  const title = getByText("Catalog");
  const spiner = getByText("Loading...");
  expect(title).toBeInTheDocument();
  expect(spiner).toBeInTheDocument();
});
