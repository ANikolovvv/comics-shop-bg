import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/authContext";
import Details from "./Details";

test("If clink button works", () => {
  const { getByText } = render(
    <BrowserRouter>
      <AuthProvider>
        <Details />
      </AuthProvider>
    </BrowserRouter>
  );
  const btn = screen.getByText("Back");

  expect(btn).toBeInTheDocument();
  expect(getByText("Back").href).toBe("http://localhost/catalog");
});
