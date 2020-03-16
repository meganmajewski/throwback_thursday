import React, { FormEvent } from "react";
import {
  render,
  fireEvent,
  getByTestId,
  wait,
  getAllByTestId
} from "@testing-library/react";
import Vote from "../pages/Vote";

const mockVote = jest.fn().mockImplementationOnce(() => Promise.resolve(""));
jest.mock("axios-hooks", () => () => [
  { data: { results: [{ url: "some.jpg" }] } },
  mockVote
]);

describe("Vote", () => {
  afterEach(() => {
    mockVote.mockReset();
  });
  it("displays current image on page", async () => {
    const { getByTestId } = render(<Vote />);
    const image = getByTestId("baby-image");
    expect(image).toHaveAttribute("src");
    expect(image.getAttribute("src")).toEqual("some.jpg");
  });
});
