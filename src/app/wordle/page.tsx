"use client";

import Header from "@/Components/Header";
import Keyboard from "@/Components/Wordle/Keyboard";
import WordRow from "@/Components/Wordle/WordRow";
import { chooseRandomWord, isValidWord } from "@/utils/server";
import { useEffect, useState, useCallback } from "react";

export default function Wordle() {
  const [answer, setAnswer] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isOngoing, setIsOngoing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initializeGame: () => Promise<void> = useCallback(async () => {
    const newAnswer: string = await chooseRandomWord(true);
    // console.log("New word:", newAnswer); // For testing purposes
    setAnswer(newAnswer);
    setWord("");
    setGuesses([]);
    setIsOngoing(true);
    setMessage("Let's get started!");
  }, []);

  const handleWordSubmit: () => Promise<void> = useCallback(async () => {
    if (word.length !== 5) return;

    if (guesses.includes(word)) {
      setMessage("This word was already used");
      return;
    }

    if (!(await isValidWord(word))) {
      setMessage("Enter a valid word!");
      return;
    }

    setGuesses((prevWords) => [...prevWords, word]);

    if (word === answer) {
      setMessage("🏆Congrats! You guessed the word🏆");

      setWord("");
      setIsOngoing(false);
      return;
    }

    if (guesses.length >= 5) {
      setMessage("The word was: " + answer);
      setIsOngoing(false);
      return;
    }

    setWord("");
    setMessage("Keep Going!");
  }, [word, guesses, answer]);

  const handleKeyPress: (event: KeyboardEvent) => Promise<void> = useCallback(
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

  // Page init
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Header pageTitle="Wordle" />

      <main className="h-[92vh] relative flex flex-col items-center justify-center">
        <h1 className="h-5 w-auto my-4 font-bold text-[1rem]">{message}</h1>

        <div className="flex flex-col items-center justify-center gap-2 h-[50vh] w-[40vh] max-w-[90vw]">
          {[...Array(6)].map((_, index) => {
            return (
              <WordRow
                key={index}
                word={
                  index === guesses.length
                    ? word
                    : index < guesses.length
                    ? guesses[index]
                    : ""
                }
                submitted={index < guesses.length ? true : false}
                answer={answer}
              />
            );
          })}
        </div>

        <button
          className="px-4 py-2 my-4 rounded-xl cursor-pointer bg-[var(--background-3)]"
          onClick={initializeGame}
          onMouseUp={(e) => e.currentTarget.blur()}
        >
          New Game
        </button>

        <Keyboard guesses={guesses} answer={answer} />
      </main>
    </>
  );
}
