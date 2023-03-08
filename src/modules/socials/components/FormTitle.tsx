import { Form } from "react-bootstrap";
import styles from "@/styles/Social.module.css";
import { RefObject, useState } from "react";
import { Field } from "formik";

type FormTitleProps = {
  inputRef: RefObject<HTMLTextAreaElement>;
};

export default function FormTitle({ inputRef }: FormTitleProps) {
  const [width, setWidth] = useState<string>("13ch");

  const onTitleChange = (event: any) => {
    // handleValueChange(event);
    setWidth(event.currentTarget.value.length + 2 + "ch");
  };

  return (
    <Field name="title">
      {({ form }: any) => {
        const isValid = !form.errors.title;
        const isInvalid = form.touched.title && !isValid;

        return (
          <div style={{ position: "relative" }}>
            <Form.Control
              as="textarea"
              className={styles.resizingTextArea}
              placeholder="Untitled Event"
              required
              id="title"
              ref={inputRef}
              style={{
                height: 68,
                width,
                minWidth: "13ch",
              }}
              onChange={onTitleChange}
              bsPrefix="resizingTextarea"
              isInvalid={isInvalid}
              isValid={form.touched.title && isValid}
            />
          </div>
        );
      }}
    </Field>
  );
}
