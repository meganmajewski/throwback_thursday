import React from "react";
import Modal from "react-modal";

export function LightBox(props: any) {
  return (
    <div id="image-modal">
      <Modal
        id="image-modal"
        isOpen={props.openModal}
        overlayClassName="black-background"
        onRequestClose={() => {
          props.closeModal();
        }}
        style={customStyles}
        contentLabel="Upload Modal"
      >
        <h2 className="image-modal-cdsid">{props.cdsid}</h2>
        <img
          className="image-modal-image"
          style={{ maxWidth: "570px" }}
          src={props.src}
          alt="a baby image from someone at labs"
        />
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
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "0",
    maxWidth: "600px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
};
