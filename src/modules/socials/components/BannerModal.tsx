import Modal from "react-bootstrap/Modal";
import styles from "@/styles/Social.module.css";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

type BannerModalProps = {
  show: boolean;
  handleClose: () => void;
  banners: string[];
  selectedBanner: string;
  setSelectedBanner: (banner: string) => void;
};

export default function BannerModal({
  show,
  handleClose,
  banners,
  setSelectedBanner,
  selectedBanner,
}: BannerModalProps) {
  const [tempSelectedBanner, setTempSelectedBanner] =
    useState<string>(selectedBanner);

  const handleChangeTempBanner = (banner: string) => {
    if (banner === selectedBanner) {
      setTempSelectedBanner("");
    } else {
      setTempSelectedBanner(banner);
    }
  };

  const handleSaveChange = () => {
    setSelectedBanner(tempSelectedBanner);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Choose a banner</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className={styles.bannerList}>
          {banners.map((banner) => (
            <div
              key={banner}
              className={`${styles.bannerWrapper} ${
                banner === tempSelectedBanner ? styles.selected : ""
              } `}
              onClick={() => handleChangeTempBanner(banner)}
            >
              <Image
                src={banner}
                key={banner}
                alt="banner"
                className={styles.bannerImg}
                fill
              />
            </div>
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button
          className={`${styles.btn} ${styles.btnClose}`}
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className={`${styles.btn} ${styles.btnSave}`}
          onClick={handleSaveChange}
        >
          Save changes
        </button>
      </Modal.Footer>
    </Modal>
  );
}
