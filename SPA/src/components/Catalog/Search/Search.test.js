import { BrowserRouter } from "react-router-dom";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { AuthProvider } from "../../../contexts/authContext";
import Catalog from "../Catalog";

test("render Search only for users", async () => {
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

  const spiner = getByText("Loading...");
  waitFor(() => {
    const title = getByText("Search");
    expect(title).toBeInTheDocument();
  });

  expect(spiner).toBeInTheDocument();
});
