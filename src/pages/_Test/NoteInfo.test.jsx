import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AuthProvider from "../../provider/authProvider";
import NoteInfo from "../NoteInfo";
//Smoke test
test("renders NoteInfo component with authentication", async () => {
  render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <NoteInfo
          date="12/05/05"
          season="Ordinary TIme"
          has_prayed={true}
          notes="Test Note"
        />
      </MemoryRouter>
    </AuthProvider>
  );
});

//Snapshot test  <MemoryRouter>
it("NoteInfo matches snapshot", async () => {
  const { asFragment } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <NoteInfo
          date="12/05/05"
          season="Ordinary TIme"
          has_prayed={true}
          notes="Test Note"
        />
      </MemoryRouter>
    </AuthProvider>
  );
  await expect(asFragment()).toMatchSnapshot();
});

test("renders Note component on click of span", async () => {
  const { getByTitle, getByText } = render(
    <AuthProvider initalState={{ token: "testToken", username: "bob" }}>
      <MemoryRouter>
        <NoteInfo
          date="12/05/05"
          season="Ordinary TIme"
          has_prayed={true}
          notes="Test Note"
        />
      </MemoryRouter>
    </AuthProvider>
  );

  const accordianHeader = getByTitle("noteInfo");
  fireEvent.click(accordianHeader);
  expect(getByText("Test Note")).toBeInTheDocument();
});
