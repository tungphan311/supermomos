import { Field, useFormikContext } from "formik";

type RadioGroupProps = {
  radioList: string[];
  className: string;
  name: string;
};

export default function RadioGroup({ radioList, name }: RadioGroupProps) {
  const { errors } = useFormikContext();
  const formError: any = errors;

  return (
    <div>
      {radioList.map((r: string) => (
        <div key={r} className="form-check form-check-inline">
          <Field
            type="radio"
            name={name}
            value={r}
            className={`form-check-input ${
              formError[name] ? "is-invalid" : ""
            }`}
          />
          <label className="form-check-label" htmlFor={name}>
            {r}
          </label>
        </div>
      ))}
    </div>
  );
}
