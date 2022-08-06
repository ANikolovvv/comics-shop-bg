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
test("renders Catalog component", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Catalog />
      </AuthProvider>
    </BrowserRouter>
  );
});
