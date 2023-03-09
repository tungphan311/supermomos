import { SocialFields } from "@/commons/types/social";
import { mergeDateAndTime } from "@/commons/utils";
import axios from "@/commons/utils/axios";
import styles from "@/styles/Social.module.css";
import { Field, Formik } from "formik";
import { createRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { array, date, number, object, string } from "yup";
import BannerModal from "./BannerModal";
import BannerSection from "./BannerSection";
import EventDetailSection from "./EventDetailSection";
import FormTitle from "./FormTitle";
import SettingsSection from "./SettingsSection";

type CreateFormProps = {
  banners: string[];
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
  privacy: string().required("Please select one option"),
  tags: array().min(1, "Please choose one tag at least"),
});

const initFormValue: SocialFields = {
  title: "Test",
  startAt: new Date(),
  time: new Date(),
  venue: "Test",
  capacity: 10,
  price: 10,
  description: "Test",
  banner:
    "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg",
  tags: [],
  isManualApprove: false,
  privacy: "Public",
};

export default function CreateForm({ banners }: CreateFormProps) {
  const [showBanner, setShowBanner] = useState(false);

  const inputRef = createRef<HTMLTextAreaElement>();
  const divRef = createRef<HTMLDivElement>();

  const handleCloseBanner = () => setShowBanner(false);
  const handleShowBanner = () => setShowBanner(true);

  const handleFormSubmit = async (values: SocialFields) => {
    try {
      const {
        title,
        startAt,
        time,
        venue,
        capacity,
        price,
        description,
        isManualApprove,
        privacy,
        banner,
        tags,
      } = values;

      const result = await axios.post("/api/social", {
        title,
        startAt: mergeDateAndTime(startAt, time),
        venue,
        capacity,
        price,
        description,
        isManualApprove,
        privacy,
        banner,
        tags,
      });
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => handleFormSubmit(values)}
      initialValues={initFormValue}
    >
      {({ handleSubmit }) => (
        <Form
          className={styles.socialContainer}
          noValidate
          onSubmit={handleSubmit}
        >
          <Row>
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
              <BannerSection handleShowBanner={handleShowBanner} />
            </Col>
          </Row>

          <Col md={12} lg={6}>
            <Field name="description">
              {({ field, form }: any) => {
                const isValid = !form.errors[field.name];
                const isInvalid = form.touched[field.name] && !isValid;

                return (
                  <Form.Group controlId="description">
                    <Form.Label className={styles.label}>
                      Description
                    </Form.Label>
                    <Form.Control
                      {...field}
                      as="textarea"
                      className={styles.textArea}
                      placeholder="Description of your event..."
                      rows={6}
                      required
                      style={{ flex: 1 }}
                      isInvalid={isInvalid}
                      isValid={form.touched[field.name] && isValid}
                    />
                  </Form.Group>
                );
              }}
            </Field>

            <SettingsSection />

            <button type="submit" className={styles.btnCreateSocial}>
              CREATE SOCIAL
            </button>
          </Col>

          <BannerModal
            show={showBanner}
            handleClose={handleCloseBanner}
            banners={banners}
          />
        </Form>
      )}
    </Formik>
  );
}
