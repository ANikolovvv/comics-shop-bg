import { AuthContexts, AuthProvider } from "../../../contexts/authContext";
import Catalog from "../catalog/Catalog";
import { BrowserRouter } from "react-router-dom";

import { cleanup, render, screen } from "@testing-library/react";

test("render Search only for users", async () => {
  const { getByText } = render(
    <BrowserRouter>
      <AuthContexts.Provider
        value={{
          user: { email: "dsasAbc." },
        }}
      >
        <Catalog></Catalog>
      </AuthContexts.Provider>
    </BrowserRouter>
  );

  const spiner = getByText("Loading...");
  const title = getByText("Search");
  expect(title).toBeInTheDocument();

  expect(spiner).toBeInTheDocument();
});

