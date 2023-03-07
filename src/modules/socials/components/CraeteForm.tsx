import { TAGS } from "@/commons/constants";
import styles from "@/styles/Social.module.css";
import Image from "next/image";
import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import BannerModal from "./BannerModal";

type CreateFormProps = {
  banners: string[];
};

export default function CreateForm({ banners }: CreateFormProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [selectedTag, setSelectedTag] = useState<any>({});
  const [selectedBanner, setSelectedBanner] = useState<string>("");

  const inputSmall = `${styles.input} ${styles.inputSmall}`;
  const inputLarge = `${styles.input} ${styles.inputLarge}`;

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

  return (
    <Form className={styles.socialContainer}>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <textarea placeholder="Untitled event" />

          <Row>
            <Col>
              <Form.Group controlId="date" className={styles.formGroup}>
                <Form.Label>
                  <Image
                    src="/assets/icons/calendar.svg"
                    alt="calendar"
                    width={48}
                    height={48}
                  />
                </Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="time" className={styles.formGroup}>
                <Form.Label>
                  <Image
                    src="/assets/icons/clock.svg"
                    alt="timer"
                    width={48}
                    height={48}
                  />
                </Form.Label>
                <Form.Control type="time" className={inputLarge} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="venue" className={styles.inputWrapper}>
            <Form.Label className={styles.formLabel}>
              <Image
                src="/assets/icons/location-marker.svg"
                alt="location"
                width={24}
                height={24}
              />
            </Form.Label>
            <Form.Control
              type="text"
              className={inputSmall + " w-100"}
              placeholder="Venue"
              required
            />
          </Form.Group>

          <div className={styles.inputWrapper}>
            <Form.Group controlId="capacity" className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                <Image
                  src="/assets/icons/user-group.svg"
                  alt="capacity"
                  width={24}
                  height={24}
                />
              </Form.Label>
              <Form.Control
                type="number"
                className={`${inputSmall} ${styles.capacityInput}`}
                placeholder="Max Capacity"
                required
              />
            </Form.Group>

            <Form.Group
              controlId="price"
              className={`${styles.formGroup} ms-4`}
            >
              <Form.Label className={styles.formLabel}>
                <Image
                  src="/assets/icons/currency-dollar.svg"
                  alt="price"
                  width={24}
                  height={24}
                />
              </Form.Label>
              <Form.Control
                type="number"
                className={`${inputSmall} ${styles.priceInput}`}
                placeholder="Cost Per Person"
                required
              />
            </Form.Group>
          </div>
        </Col>
        <Col xs={12} md={6} lg={8}>
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
          />
        </Form.Group>

        <div className={styles.settingWrapper}>
          <div className={styles.settingTitleWrapper}>
            <div className={styles.settingTitle}>Settings</div>
          </div>

          <Form.Group controlId="isManualApprove">
            <Form.Check type="checkbox" label="I want to approve attendees" />
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
  );
}
