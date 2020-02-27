import React, { FormEvent } from "react";
import { render, fireEvent, getByTestId, wait } from "@testing-library/react";
import Upload from "../pages/Upload";
import { Simulate } from "react-dom/test-utils";

const mockUploadImage = jest.fn();

jest.mock("axios-hooks", () => () => [{}, mockUploadImage]);

describe("UploadImage", () => {
  afterEach(() => {
    mockUploadImage.mockReset();
  });

  it("should call axious on submit", () => {
    const { getByText } = render(<Upload />);
    fireEvent.click(getByText(/submit/i));
    expect(mockUploadImage).toHaveBeenCalled();
  });

  it("can select an image and upload will make a request to upload it", async () => {
    const { container, getByTestId, getByText, getByAltText } = render(
      <Upload />
    );
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const imageInput = getByTestId("upload-image");
    Simulate.change(imageInput, { target: { files: [file] } as any });

    fireEvent.click(getByText(/submit/i));
    expect(mockUploadImage).toHaveBeenCalledTimes(1);
    expect(mockUploadImage).toHaveBeenCalledWith({ data: file });
  });
});
