import React from "react";
import { render } from "@testing-library/react";
import VoteImage from "../components/VoteImage";

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
    const { getByTestId } = render(<VoteImage />);
    const image = getByTestId("baby-image");
    expect(image).toHaveAttribute("src");
    expect(image.getAttribute("src")).toEqual("some.jpg");
  });
});
