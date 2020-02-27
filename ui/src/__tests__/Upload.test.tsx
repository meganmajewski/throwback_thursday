import React, { FormEvent } from "react";
import { render, fireEvent } from "@testing-library/react";
import Upload from "../pages/Upload";

const mockUploadImage = jest.fn();

jest.mock("axios-hooks", () => () => [{}, mockUploadImage]);

describe("UploadImage", () => {
  it("should call axious on submit", () => {
    const { getByTestId } = render(<Upload />);
    fireEvent.submit(getByTestId("form"));
    expect(mockUploadImage).toHaveBeenCalled();
  });
});
