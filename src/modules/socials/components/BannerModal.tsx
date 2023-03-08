import styles from "@/styles/Social.module.css";
import { useField, useFormikContext } from "formik";
import Image from "next/image";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

type BannerModalProps = {
  show: boolean;
  handleClose: () => void;
  banners: string[];
};

export default function BannerModal({
  show,
  handleClose,
  banners,
}: BannerModalProps) {
  const [field] = useField("banner");
  const [tempSelectedBanner, setTempSelectedBanner] = useState<string>(
    field.value
  );
  const { setFieldValue } = useFormikContext();

  const handleChangeTempBanner = (banner: string) => {
    if (banner === tempSelectedBanner) {
      setTempSelectedBanner("");
    } else {
      setTempSelectedBanner(banner);
    }
  };

  const handleSaveChange = () => {
    setFieldValue("banner", tempSelectedBanner);
    handleClose();
  };

  const onClose = () => {
    setTempSelectedBanner("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
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
          onClick={onClose}
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
