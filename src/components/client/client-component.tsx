// /app/components/ClientComponent.tsx
"use client";

import { readFileFromServer, appendToFile } from "@/actions/actions";
import { EXAMPLE_FILE_NAME } from "@/logic/constants";
import { FC, useState } from "react";

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
    <div>
      <button onClick={handleAppend}>Append to File</button>
      <br />
      <textarea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Enter new content to append"
      />
      <p>{message}</p>
      <br /><br />
      <button onClick={handleViewFile}>View File</button>
      <pre>{fileContent}</pre>
    </div>
  );
};

export default ClientComponent;
