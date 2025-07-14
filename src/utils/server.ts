"use server";

import { promises as fs } from "fs";

const wordListPath: string = "/src/db/valid-words.txt";
const answerListPath: string = "/src/db/possible-answers.txt";
let wordList: string[];
let answerList: string[];

try {
  const wordListData = await fs.readFile(process.cwd() + wordListPath, "utf8");
  const answerListData = await fs.readFile(
    process.cwd() + answerListPath,
    "utf8"
  );
  wordList = wordListData
    .split("\n")
    .map((word: string) => word.trim().toUpperCase());
  answerList = answerListData
    .split("\n")
    .map((word: string) => word.trim().toUpperCase());
} catch (error: unknown) {
  console.error("Error reading file:", error);
  throw error;
}

export const isValidWord: (word: string) => Promise<boolean> = async (
  word: string
) => {
  return wordList.includes(word);
};

export const chooseRandomWord: (isAnswer: boolean) => Promise<string> = async (
  isAnswer: boolean = false
) => {
  let randIndex: number;
  if (isAnswer) {
    randIndex = Math.floor(Math.random() * answerList.length);
    return answerList[randIndex].toUpperCase();
  } else {
    randIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randIndex].toUpperCase();
  }
};
