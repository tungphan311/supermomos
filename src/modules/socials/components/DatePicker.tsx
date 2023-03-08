import { InputProps } from "@/commons/types/input";
import { useField, useFormikContext } from "formik";
import { Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

export default function DatePicker({
  name,
  inputClassName,
  formClassName,
  isShowTimeOnly = false,
  label,
}: InputProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const selected = (field.value && new Date(field.value)) || null;
  const onChange = (value: any) => {
    setFieldValue(field.name, value);
  };

  return (
    <Form.Group controlId="date" className={formClassName}>
      {label}
      {isShowTimeOnly ? (
        <ReactDatePicker
          selected={selected}
          onChange={(value) => onChange(value)}
          className={inputClassName}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      ) : (
        <ReactDatePicker
          selected={selected}
          onChange={(value) => onChange(value)}
          className={inputClassName}
        />
      )}
    </Form.Group>
  );
}
