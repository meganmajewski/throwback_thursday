import React, { useState } from "react";
import useAxios from "axios-hooks";
import "../styles/gallery.scss";
import ErrorMessage from "../components/Error";
import { LightBox } from "../components/LightBox";
import LastWeeksThrowback from "../components/LastWeeksThrowback";

export default function DesktopGallery() {
  document.body.classList.remove("vote");
  document.body.classList.add("gallery");
  const [vpnError, setVPNError] = useState<boolean>(false);
  const [{ data, loading, error }] = useAxios({
    url: "/allRevealedImages",
    method: "get",
  });
  const [modalInfo, setIsOpen] = React.useState({
    open: false,
    src: "",
    cdsid: "",
  });
  if (vpnError)
    return (
      <ErrorMessage message="Seems like you might be on VPN! Please disconnect so you can see this week's image." />
    );
  function openModal(src: string, cdsid: string) {
    setIsOpen({ open: true, src, cdsid });
  }
  function closeModal() {
    setIsOpen({ open: false, src: "", cdsid: "" });
  }

  const printAllImages = () => {
    return data.results.map(
      (
        src: { id: string; url: string; revealed: boolean; cdsid: string },
        index: string
      ) => {
        return (
          src.url && (
            <div
              className="image"
              key={index}
              onClick={() => {
                openModal(src.url, src.cdsid);
              }}
            >
              <div className="cdsid-container">
                <span className="cdsid">{src.cdsid}</span>
              </div>
              <img
                onError={() => setVPNError(true)}
                src={src.url}
                alt="a baby submit by someone at labs"
              ></img>
            </div>
          )
        );
      }
    );
  };
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <ErrorMessage message="Error getting images for the gallery"></ErrorMessage>
    );
  if (data.results.length > 0)
    return (
      <>
        <LastWeeksThrowback
          cdsid={data.results[4].cdsid}
          id={data.results[4].id}
          url={data.results[4].url}
        />

        <div className="image-container">
          <div className="image-grid">{printAllImages()}</div>
          <LightBox
            openModal={modalInfo.open}
            closeModal={closeModal}
            {...modalInfo}
          />
        </div>
      </>
    );
  if (data.results)
    return (
      <ErrorMessage message="There are no throwback pictures to see here yet!" />
    );
  else
    return (
      <ErrorMessage message="Error getting images for the gallery"></ErrorMessage>
    );
}
