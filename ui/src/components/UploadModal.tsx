import React from "react";
import Modal from "react-modal";
import Upload from "../pages/Upload";

export function UploadModal(props: any) {
  return (
    <div id="upload-modal">
      <Modal
        id="upload-modal"
        isOpen={props.openModal}
        overlayClassName="black-background"
        style={customStyles}
        contentLabel="Upload Modal"
      >
        <button onClick={props.closeModal}>X</button>
        <Upload />
      </Modal>
    </div>
  );
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "0",
    maxWidth: "620px"
  }
};
