import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Vote from "../pages/Vote";
import { Simulate } from "react-dom/test-utils";

const mockVote = jest
  .fn()
  .mockImplementationOnce(() => Promise.resolve("thumbs up"));
jest.mock("axios-hooks", () => () => [
  { data: { results: [{ src: "" }] } },
  mockVote
]);

describe("Vote", () => {
  afterEach(() => {
    mockVote.mockReset();
  });
  it("displays current image on page", async () => {
    const { getByTestId } = render(<Vote />);
    const voteInput = getByTestId("vote-input");
    Simulate.change(voteInput, { target: { value: "jhandy4" } } as any);
    const voteSubmit = getByTestId("vote-submit");
    fireEvent.click(voteSubmit);
    expect(mockVote).toHaveBeenCalledTimes(1);
    expect(mockVote).toHaveBeenCalledWith({
      data: "jhandy4",
      headers: {
        "Content-Type": "text/plain"
      }
    });
  });
});
