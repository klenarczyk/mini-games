"use client";

import Header from "@/Components/Header";
import WordRow from "@/Components/Wordle/WordRow";
import { chooseRandomWord, isValidWord } from "@/utils/server";
import { useEffect, useState, useCallback } from "react";

export default function Wordle() {
  const [answer, setAnswer] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [word, setWord] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [isOngoing, setIsOngoing] = useState(false);
  const [message, setMessage] = useState("Let's get started!");

  const fetchNewAnswer = useCallback(async () => {
    const randomWord = await chooseRandomWord();
    console.log("New word:", randomWord); // For testing purposes
    return randomWord;
  }, []);

  const initializeGame = useCallback(async () => {
    const newAnswer = await fetchNewAnswer();
    setAnswer(newAnswer);
    setAttempt(0);
    setWord("");
    setWords([]);
    setIsOngoing(true);
    setMessage("Let's get started!");
  }, [fetchNewAnswer]);

  const handleWordSubmit = useCallback(async () => {
    if (word.length !== 5) return;

    if (words.includes(word)) {
      setMessage("This word was already used");
      return;
    }

    if (!(await isValidWord(word))) {
      setMessage("Enter a valid word!");
      return;
    }

    setWords((prevWords) => [...prevWords, word]);
    setAttempt((prev) => prev + 1);

    if (word === answer) {
      if (attempt === 5) {
        setMessage("🏆That was close! Phew!🏆");
      } else {
        setMessage("🏆Congrats! You guessed the word🏆");
      }

      setWord("");
      setIsOngoing(false);
      return;
    }

    setWord("");

    if (attempt >= 5) {
      setMessage("The word was: " + answer);
      setIsOngoing(false);
      return;
    }

    setMessage("Keep Going!");
  }, [word, words, answer, attempt]);

  const handleKeyPress = useCallback(
    async (event: KeyboardEvent) => {
      if (!isOngoing) return;
      if (event.key === "Enter") {
        await handleWordSubmit();
      } else if (
        event.key.length === 1 &&
        event.key.match(/[a-zA-Z]/) &&
        word.length < 5
      ) {
        setWord((prevWord) => prevWord + event.key.toUpperCase());
      } else if (event.key === "Backspace" && word.length > 0) {
        setWord((prevWord) => prevWord.slice(0, -1));
      }
    },
    [word, handleWordSubmit, isOngoing]
  );

  // Page init useEffect
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Key press useEffect
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Header pageTitle="Wordle" />

      <main className="h-[calc(100vh-(var(--spacing)*16))] flex flex-col items-center justify-center">
        <h1 className="h-5 w-auto mb-5 font-bold">{message}</h1>

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

        <button
          className="px-4 py-2 mt-5 rounded-xl cursor-pointer bg-[#2e2e2e]"
          onClick={initializeGame}
          onMouseUp={(e) => e.currentTarget.blur()}
        >
          New Game
        </button>
      </main>
    </>
  );
}
