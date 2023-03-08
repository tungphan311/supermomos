import { PRIVACY } from "@/commons/constants/privacy";
import styles from "@/styles/Social.module.css";
import { Form } from "react-bootstrap";
import RadioGroup from "./RadioGroup";
import Tags from "./Tags";

export default function SettingsSection() {
  return (
    <div className={styles.settingWrapper}>
      <div className={styles.settingTitleWrapper}>
        <div className={styles.settingTitle}>Settings</div>
      </div>
      <Form.Group controlId="isManualApprove">
        <Form.Check
          type="checkbox"
          label="I want to approve attendees"
          style={{ fontWeight: 500 }}
        />
      </Form.Group>
      <div className={styles.settingLabel}>Privacy</div>
      <RadioGroup
        radioList={PRIVACY}
        className={styles.radioInput}
        name="privacy"
      />

      <div className={styles.settingLabel}>Tag your social</div>
      <div className={styles.settingDescription}>
        Pick tags for our curation engine to work its magin
      </div>

      <Tags />
    </div>
  );
}
