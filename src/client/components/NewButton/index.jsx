import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.css";

function NewButton({ children, ...props }) {
  return (
    <a className={styles.newButton} {...props}>
      <FontAwesomeIcon icon={["fas", "plus-circle"]} />
      {children}
    </a>
  );
}

export { NewButton };
