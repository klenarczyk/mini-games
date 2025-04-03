"use client";

import Header from "@/Components/Header";
import WordRow from "@/Components/Wordle/WordRow";
import { useEffect, useState } from "react";

export default function Wordle() {
  const answer = "HELLO";
  const [attempt, setAttempt] = useState(0);
  const [word, setWord] = useState("");
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleWordSubmit();
    } else if (
      event.key.length === 1 &&
      event.key.match(/[a-zA-Z]/) &&
      word.length < 5
    ) {
      setWord((prevWord) => prevWord + event.key.toUpperCase());
    } else if (event.key === "Backspace" && word.length > 0) {
      setWord((prevWord) => prevWord.slice(0, -1));
    }
  };

  const handleWordSubmit = () => {
    if (word.length !== 5) {
      alert("Word must be 5 letters long!");
      return;
    }

    setWords((prevWords) => [...prevWords, word]);
    setAttempt(attempt + 1);

    if (word.toUpperCase() === answer) {
      alert("You guessed the word!");
      setWord("");
      return;
    }

    setWord("");

    if (attempt >= 5) {
      alert("No more attempts left!");
      return;
    }
  };

  return (
    <>
      <Header pageTitle="Wordle" />

      <main className="flex flex-col items-center justify-center">
        {[...Array(6)].map((_, index) => {
          return (
            <WordRow
              key={index}
              word={
                index === attempt ? word : index < attempt ? words[index] : ""
              }
              final={index < attempt ? true : false}
              answer={answer}
            />
          );
        })}
      </main>
    </>
  );
}
