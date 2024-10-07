"use server";

import { DATA_DIR } from "@/logic/constants";
import { promises as fs } from "fs";
import path from "path";

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
