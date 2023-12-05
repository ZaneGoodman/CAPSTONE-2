import React from "react";
import { render } from "@testing-library/react";

import NotesForm from "./NotesForm";

//Smoke test
test("renders NotesForm component with authentication", async () => {
  render(
    <NotesForm
      date="2023/05/05"
      season="Ordinary Time"
      username="testuser"
      setAddedNotes={(boolean) => boolean}
    />
  );
});

//Snapshot test  <MemoryRouter>
it("NotesForm matches snapshot", async () => {
  const { asFragment } = render(
    <NotesForm
      date="2023/05/05"
      season="Ordinary Time"
      username="testuser"
      setAddedNotes={(boolean) => boolean}
    />
  );
  await expect(asFragment()).toMatchSnapshot();
});
