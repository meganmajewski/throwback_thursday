import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  getByText
} from "@testing-library/react";
import Upload from "./pages/Upload";

test("renders learn react link", async () => {
  const { getByTestId, getByText } = render(<Upload />);
  fireEvent.submit(getByTestId("form"));
  // await waitForElement(() => getByText(/image is required/i));
});
