import { TAGS } from "@/commons/constants";
import styles from "@/styles/Social.module.css";
import { Formik } from "formik";
import Image from "next/image";
import { createRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { array, date, number, object, string } from "yup";
import BannerModal from "./BannerModal";
import EventDetailSection from "./EventDetailSection";
import FormTitle from "./FormTitle";

type CreateFormProps = {
  banners: string[];
};

type CreateFormFields = {
  title: string;
  startAt: Date;
  venue: string;
  capacity: number;
  price: number;
  description: string;
  banner: string;
  tags: string[];
  isManualApprove?: boolean;
  privacy: string;
};

const schema = object({
  title: string().required(),
  startAt: date().required(),
  time: date().required(),
  venue: string().required(),
  capacity: number().required(),
  price: number().required(),
  description: string().required(),
  banner: string().required(),
  tags: array().of(string()).required(),
  privacy: string().required(),
});

const initFormValue = {
  title: "",
  startAt: new Date(),
  time: new Date(),
  venue: "",
  capacity: 0,
  price: 0,
  description: "",
  banner: "",
  tags: [],
  isManualApprove: false,
  privacy: "",
};

export default function CreateForm({ banners }: CreateFormProps) {
  const [showBanner, setShowBanner] = useState(false);

  const [selectedTag, setSelectedTag] = useState<any>({});
  const [selectedBanner, setSelectedBanner] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<CreateFormFields>(initFormValue);

  const inputRef = createRef<HTMLTextAreaElement>();
  const divRef = createRef<HTMLDivElement>();

  const tagClassName = (tag: string): string => {
    if (selectedTag[tag]) {
      return `${styles.tag} ${styles.selectedTag}`;
    }

    return `${styles.tag} ${styles.unselectedTag}`;
  };

  const toggleSelectTag = (tag: string): void => {
    setSelectedTag({ ...selectedTag, [tag]: !selectedTag[tag] });
  };

  const handleCloseBanner = () => setShowBanner(false);
  const handleShowBanner = () => setShowBanner(true);

  const handleSelectBanner = (banner: string) => {
    if (banner === selectedBanner) {
      setSelectedBanner("");
    } else {
      setSelectedBanner(banner);
    }
  };

  const handleFormSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    console.log({ ...form });
    setValidated(true);
  };

  const handleValueChange = (event: any) => {
    const key = event.currentTarget.id;
    const value = event.currentTarget.value;

    setFormValue((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={initFormValue}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form
          className={styles.socialContainer}
          noValidate
          onSubmit={handleSubmit}
        >
          <Row style={{ flexDirection: "row-reverse", position: "relative" }}>
            <Col
              xs={12}
              md={6}
              lg={5}
              className={styles.eventWrapper}
              ref={divRef}
            >
              <FormTitle inputRef={inputRef} />
              <EventDetailSection />
            </Col>
            <Col xs={12} md={6} lg={7}>
              <Form.Group controlId="banner">
                <Form.Control
                  type="text"
                  className="d-none"
                  value={selectedBanner}
                  readOnly
                />
                {!selectedBanner ? (
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
                      src={selectedBanner}
                      alt="selected banner"
                      fill
                      className={styles.selectedBanner}
                    />
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Col md={12} lg={6}>
            <Form.Group controlId="description">
              <Form.Label className={styles.label}>Description</Form.Label>
              <Form.Control
                as="textarea"
                className={styles.textArea}
                placeholder="Description of your event..."
                rows={6}
                required
                style={{ flex: 1 }}
              />
            </Form.Group>

            <div className={styles.settingWrapper}>
              <div className={styles.settingTitleWrapper}>
                <div className={styles.settingTitle}>Settings</div>
              </div>

              <Form.Group controlId="isManualApprove">
                <Form.Check
                  type="checkbox"
                  label="I want to approve attendees"
                />
              </Form.Group>

              <div className={styles.settingLabel}>Privacy</div>
              <div>
                <Form.Check
                  inline
                  label="Public"
                  name="privacy"
                  type="radio"
                  id="Public"
                  className={styles.radioInput}
                />
                <Form.Check
                  inline
                  label="Curated Audience"
                  name="privacy"
                  type="radio"
                  id="Curated Audience"
                  className={styles.radioInput}
                />
                <Form.Check
                  inline
                  label="Community Only"
                  name="privacy"
                  type="radio"
                  id="Community Only"
                  className={styles.radioInput}
                />
              </div>

              <div className={styles.settingLabel}>Tag your social</div>
              <div className={styles.settingDescription}>
                Pick tags for our curation engine to work its magin
              </div>

              <div className="d-flex mt-4">
                {TAGS.map((tag) => (
                  <div
                    key={tag}
                    className={tagClassName(tag)}
                    onClick={() => toggleSelectTag(tag)}
                  >
                    {tag}
                    {selectedTag[tag] && (
                      <div className={styles.btnSelectTag}>&#x2715;</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className={styles.btnCreateSocial}>
              CREATE SOCIAL
            </button>
          </Col>

          <BannerModal
            show={showBanner}
            handleClose={handleCloseBanner}
            banners={banners}
            selectedBanner={selectedBanner}
            setSelectedBanner={handleSelectBanner}
          />
        </Form>
      )}
    </Formik>
  );
}
