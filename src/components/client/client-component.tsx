"use client";

import { readFileFromServer, appendToFile } from "@/actions/actions";
import { EXAMPLE_FILE_NAME } from "@/logic/constants";
import { FC, useState } from "react";
import styles from "@/styles/client-component.module.css";

const ClientComponent: FC = () => {
  const [fileContent, setFileContent] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleViewFile = async () => {
    const content = await readFileFromServer(EXAMPLE_FILE_NAME);
    setFileContent(content);
  };

  const handleAppend = async () => {
    const response = await appendToFile(EXAMPLE_FILE_NAME, newContent);
    setMessage(response);
    setNewContent(""); // Clear the input after appending
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleViewFile}>
        View File Content
      </button>
      <pre className={styles.fileContent}>{fileContent}</pre>
      <button className={styles.button} onClick={handleAppend}>
        Append to File
      </button>
      <textarea className={styles.textarea}
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Enter new content to append"
      />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default ClientComponent;
