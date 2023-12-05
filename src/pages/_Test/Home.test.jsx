import React from "react";
import { render, fireEvent } from "@testing-library/react";

import AuthProvider from "../../provider/authProvider";
import Home from "../Home";
//Smoke test
test("renders Home component with authentication", async () => {
  render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <Home />
    </AuthProvider>
  );
});

//Snapshot test
it("Card matches snapshot", async () => {
  const { asFragment } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <Home />
    </AuthProvider>
  );
  await expect(asFragment()).toMatchSnapshot();
});

test("test calendar visibility", () => {
  const { getByText } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <Home />
    </AuthProvider>
  );

  const pickDateButton = getByText("Pick Date");
  fireEvent.click(pickDateButton);
  expect(getByText("Fri")).toBeInTheDocument();
  fireEvent.click(pickDateButton);
});

test("Test dynamic announces", () => {
  const { getByText } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <Home />
    </AuthProvider>
  );
  const thing = getByText("Hail, Holy Queen");
  expect(thing).toBeInTheDocument();
});
