"use client";

import { cellColors } from "@/utils/helper";

export default function WordRow({
  word,
  final,
  answer,
}: {
  word?: string;
  final: boolean;
  answer: string;
}) {
  const letters = word?.toUpperCase().trim().split("") ?? [];

  return (
    <div className="flex flex-row justify-center items-center gap-1 py-1">
      <div
        className={`letterCell ${final ? cellColors(letters, answer, 0) : ""}`}
      >
        {letters?.[0] ?? ""}
      </div>
      <div
        className={`letterCell ${final ? cellColors(letters, answer, 1) : ""}`}
      >
        {letters?.[1] ?? ""}
      </div>
      <div
        className={`letterCell ${final ? cellColors(letters, answer, 2) : ""}`}
      >
        {letters?.[2] ?? ""}
      </div>
      <div
        className={`letterCell ${final ? cellColors(letters, answer, 3) : ""}`}
      >
        {letters?.[3] ?? ""}
      </div>
      <div
        className={`letterCell ${final ? cellColors(letters, answer, 4) : ""}`}
      >
        {letters?.[4] ?? ""}
      </div>
    </div>
  );
}
