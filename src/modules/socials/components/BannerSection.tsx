import Image from "next/image";
import { Form } from "react-bootstrap";
import styles from "@/styles/Social.module.css";
import { Field, useField, useFormikContext } from "formik";

type BannerSectionProps = {
  handleShowBanner: () => void;
};

export default function BannerSection({
  handleShowBanner,
}: BannerSectionProps) {
  const [field] = useField("banner");
  const { errors }: any = useFormikContext();

  return (
    <Form.Group controlId="banner" style={{ position: "relative" }}>
      <Field type="text" className="d-none" value={field.value} readOnly />
      {!field.value ? (
        <div className={styles.banner} onClick={handleShowBanner}>
          <Image
            src="/assets/icons/picture.svg"
            alt="picture"
            width={24}
            height={24}
          />
          <span className={styles.bannerText}>Add a banner</span>
        </div>
      ) : (
        <div className={styles.showBanner}>
          <Image
            src={field.value}
            alt="selected banner"
            fill
            className={styles.selectedBanner}
          />
        </div>
      )}

      <Form.Control.Feedback
        type="invalid"
        tooltip
        style={{ display: !!errors[field.name] ? "block" : "none", right: 0 }}
      >
        {errors[field.name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
