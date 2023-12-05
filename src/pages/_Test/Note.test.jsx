import React from "react";
import { render } from "@testing-library/react";

import AuthProvider from "../../provider/authProvider";
import Note from "../Note";
//Smoke test
test("renders Note component with authentication", async () => {
  render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <Note note="Test Note" />
    </AuthProvider>
  );
});

//Snapshot test  <MemoryRouter>
it("Note matches snapshot", async () => {
  const { asFragment } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <Note note="Test Note" />
    </AuthProvider>
  );
  await expect(asFragment()).toMatchSnapshot();
});
