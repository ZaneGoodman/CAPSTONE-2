import React from "react";
import { render } from "@testing-library/react";

import AuthForm from "./AuthForm";
//Smoke test
test("renders AuthForm component with authentication", async () => {
  render(<AuthForm login={() => "logged in"} />);
});

//Snapshot test  <MemoryRouter>
it("AuthForm matches snapshot", async () => {
  const { asFragment } = render(<AuthForm login={() => "logged in"} />);
  await expect(asFragment()).toMatchSnapshot();
});
