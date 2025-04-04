"use server";

import { promises as fs } from "fs";

const wordListPath: string = "/src/db/valid-words.txt";
let wordList: string[];

try {
  const wordListData = await fs.readFile(process.cwd() + wordListPath, "utf8");

  wordList = wordListData
    .split("\n")
    .map((word: string) => word.trim().toUpperCase());
} catch (error) {
  console.error("Error reading file:", error);
  throw error;
}

export const isValidWord: (word: string) => Promise<boolean> = async (
  word: string
) => {
  return wordList.includes(word);
};

export const chooseRandomWord: () => Promise<string> = async () => {
  const randIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randIndex].toUpperCase();
};
