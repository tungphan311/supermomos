import Input from "@/commons/components/input/input";
import styles from "@/styles/Social.module.css";
import Image from "next/image";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "./DatePicker";

export default function EventDetailSection() {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const inputLarge = `${styles.input} ${styles.inputLarge}`;

  return (
    <>
      <Row>
        <Col>
          <DatePicker
            name="startAt"
            controlId="startAt"
            formClassName={styles.formGroup}
            label={
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={48}
                height={48}
              />
            }
            inputClassName={inputLarge}
          />
        </Col>
        <Col>
          <DatePicker
            name="time"
            controlId="time"
            formClassName={styles.formGroup}
            label={
              <Image
                src="/assets/icons/clock.svg"
                alt="calendar"
                width={48}
                height={48}
              />
            }
            inputClassName={inputLarge}
            styles={{ flex: 1, fontSize: 28 }}
            isShowTimeOnly
          />
        </Col>
      </Row>

      <Input
        controlId="venue"
        name="venue"
        formClassName={styles.inputWrapper}
        label={
          <Image
            src="/assets/icons/location-marker.svg"
            alt="location"
            width={24}
            height={24}
          />
        }
        inputClassName={styles.input}
        placeholder="Venue"
        styles={{ flex: 1 }}
      />

      <div className={styles.inputWrapper}>
        <Input
          controlId="capacity"
          name="capacity"
          formClassName={styles.formGroup}
          label={
            <Image
              src="/assets/icons/user-group.svg"
              alt="capacity"
              width={24}
              height={24}
            />
          }
          inputClassName={styles.input}
          placeholder="Max Capacity"
          styles={{ width: 155 }}
        />

        <Input
          controlId="price"
          name="price"
          formClassName={`${styles.formGroup} ms-4`}
          label={
            <Image
              src="/assets/icons/currency-dollar.svg"
              alt="price"
              width={24}
              height={24}
            />
          }
          inputClassName={styles.input}
          placeholder="Cost Per Person"
          styles={{ width: 155 }}
        />
      </div>
    </>
  );
}
