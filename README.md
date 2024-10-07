
<h2 id="project-description">Project Description</h2>
This a next.js app router project with server actions that read and append to a server file. These aerver actions are used by react client component

<h2 id="motivation">Motivation</h2>
Server actions runs on the server but can be invoked by the client, this eliminate e.g. using api endpoints. The purpose in this project is to show how to create a server actions and use them in a react client component

<h2 id="installation">Installation</h2>
Install the packages

```bash
pnpm i
```

<h2 id="usage">Usage</h2>
Invoke the development server

```bash
npm run dev
```

<h2>Code snippets</h2>

<h3>Home page</h3>

```ts

export default function Home() {
  return (
    <>
      <ClientComponent />
    </>
  );
}
```

<h3>Server action file - actions.ts</h3>
Server action file must has the directive "use server" as the first line

```ts
"use server";

import { DATA_DIR } from "@/logic/constants";
import { promises as fs } from "fs";
import path from "path";

export async function readFileFromServer(fileName: string): Promise<string> {
...
}
export async function appendToFile(fileName: string,content: string): Promise<string> {
    ...
}
```

<h3>Server action - readFileFromServer</h3>
Server action is a function - readFileFromServer

```ts
export async function readFileFromServer(fileName: string): Promise<string> {
  const filePath = path.resolve(".", DATA_DIR, fileName);
  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    return fileContents;
  } catch (error) {
    if (error instanceof Error) {
      return `Error reading file: ${error.message}`;
    } else {
      return "An unknown error occurred";
    }
  }
}
```

<h3>Server action - appendToFile</h3>
Server action is a function - appendToFile

```ts
export async function appendToFile(
  fileName: string,
  content: string
): Promise<string> {
  const filePath = path.resolve(".", DATA_DIR, fileName);
  try {
    await fs.appendFile(filePath, `${content}\n`, 'utf-8'); 
    return "Content appended successfully";
  } catch (error) {
    if (error instanceof Error) {
      return `Error appending to file: ${error.message}`;
    } else {
      return "An unknown error occurred";
    }
  }
}
```

<h3>Use server action in react client component - ClientComponent. part 1</h3>
client component must have the directive 'use client' in the first line of the file 

```ts
"use client";
import { readFileFromServer, appendToFile } from "@/actions/actions";
.....
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
```
<h3>Use server action in react client component - ClientComponent. part 2</h3>

```ts
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
```
<h2 id="demo">Demo</h2>
The main page ui is as follows

<img src='./figs/demo.png'/>



<h2 id="points-of-interest">Points of Interest</h2>
<ul>
    <li>check in network tab and see that the file content is a response from the server <img src='./figs/network-server-action.png'/>
    </li>
    <li>check sources tab in chrome dev tools and see that the code of readFileFromServer does not appears in the browser code
    <img src='./figs/server-action-code-not-in-browser.png'/>
    </li>
</ul>

<h2 id="references">References</h2>
<ul>
    <li>check this <a href='https://www.youtube.com/playlist?list=PLT6u32ApxFVBskjKDMxQZL2kHIj3eeue0'>React Server Component playlist</a> for info on react server componet and react client components</li>
</ul>

