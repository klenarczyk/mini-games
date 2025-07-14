"use client";

import Header from "@/Components/Header";
import { redirect } from "next/navigation";

export default function Wordle() {
  return (
    <>
      <Header pageTitle="Mini Games" />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div
          className="size-40 bg-blue-900 flex justify-center items-center rounded-xl cursor-pointer text-xl font-bold"
          onClick={() => redirect("/wordle")}
        >
          Wordle
        </div>
      </main>
    </>
  );
}
