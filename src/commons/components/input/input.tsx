import { Form } from "react-bootstrap";
import { Field } from "formik";
import { InputProps } from "@/commons/types/input";

export default function Input({
  controlId,
  label,
  inputType = "text",
  formClassName,
  inputClassName,
  styles,
  placeholder = "",
  required = true,
  name,
}: InputProps) {
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;

        return (
          <Form.Group controlId={controlId} className={formClassName}>
            {label}
            <Form.Control
              {...field}
              type={inputType}
              className={inputClassName}
              required={required}
              style={styles}
              placeholder={placeholder}
              isInvalid={isInvalid}
              isValid={form.touched[field.name] && isValid}
            />
          </Form.Group>
        );
      }}
    </Field>
  );
}
