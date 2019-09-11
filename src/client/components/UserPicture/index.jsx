import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.css";

const UserPicture = ({ picture = null }) => (
  <div className={styles.userPicture}>
    {picture ? (
      <img src={picture} style={{ width: "100%" }} />
    ) : (
      <div className={styles.placeHolderBg}>
        <FontAwesomeIcon
          className={styles.placeHolder}
          icon={["fas", "user"]}
        />
      </div>
    )}
  </div>
);

export default UserPicture;
