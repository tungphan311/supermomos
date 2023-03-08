import { TAGS } from "@/commons/constants";
import styles from "@/styles/Social.module.css";
import { useField, useFormikContext } from "formik";
import { useState } from "react";
import { Form } from "react-bootstrap";

export default function Tags() {
  const { setFieldValue, errors }: any = useFormikContext();
  const [field] = useField("tags");
  const [selectedTag, setSelectedTag] = useState<any>({});

  const tagClassName = (tag: string): string => {
    if (selectedTag[tag]) {
      return `${styles.tag} ${styles.selectedTag}`;
    }

    return `${styles.tag} ${styles.unselectedTag}`;
  };

  const toggleSelectTag = (tag: string): void => {
    if (selectedTag[tag]) {
      const newTags = field.value.filter((t: string) => t !== tag);
      setFieldValue("tags", newTags);
    } else {
      setFieldValue("tags", [...field.value, tag]);
    }
    setSelectedTag({ ...selectedTag, [tag]: !selectedTag[tag] });
  };

  return (
    <>
      <div className="d-flex mt-4 position-relative">
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
      {errors["tags"] && (
        <Form.Control.Feedback
          type="invalid"
          style={{
            display: !!errors[field.name] ? "block" : "none",
          }}
        >
          {errors[field.name]}
        </Form.Control.Feedback>
      )}
    </>
  );
}
