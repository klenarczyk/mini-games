const cellColors = (letters: string[], answer: string, index: number) => {
  const correctLetters: string[] = answer.split("");
  if (letters[index] === answer[index]) return "bg-green-500";
  if (!correctLetters.includes(letters[index])) return "bg-gray-500";

  // Array of indexes of target letter occurrences
  const correctLetterIndexes: number[] = [];
  for (let i = 0; i < correctLetters.length; i++) {
    if (correctLetters[i] === letters[index]) {
      correctLetterIndexes.push(i);
    }
  }

  const guessLetterIndexes: number[] = [];
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === letters[index]) {
      guessLetterIndexes.push(i);
    }
  }

  // Remove the indexes present in both arrays
  for (let i = 0; i < guessLetterIndexes.length; i++) {
    for (let j = 0; j < correctLetterIndexes.length; j++) {
      if (guessLetterIndexes[i] === correctLetterIndexes[j]) {
        guessLetterIndexes.splice(i, 1);
        correctLetterIndexes.splice(j, 1);
        i--;
        break;
      }
    }
  }

  if (guessLetterIndexes.indexOf(index) < correctLetterIndexes.length) {
    return "bg-yellow-500";
  } else return "bg-gray-500";
};

export default function WordRow({
  word,
  submitted,
  answer,
}: {
  word?: string;
  submitted: boolean;
  answer: string;
}) {
  const letters = word?.toUpperCase().trim().split("") ?? [];

  return (
    <div className="flex-1 w-[100%] flex flex-row justify-center items-center gap-1">
      <div
        className={`letterCell ${
          submitted ? cellColors(letters, answer, 0) : ""
        }`}
      >
        {letters?.[0] ?? ""}
      </div>
      <div
        className={`letterCell ${
          submitted ? cellColors(letters, answer, 1) : ""
        }`}
      >
        {letters?.[1] ?? ""}
      </div>
      <div
        className={`letterCell ${
          submitted ? cellColors(letters, answer, 2) : ""
        }`}
      >
        {letters?.[2] ?? ""}
      </div>
      <div
        className={`letterCell ${
          submitted ? cellColors(letters, answer, 3) : ""
        }`}
      >
        {letters?.[3] ?? ""}
      </div>
      <div
        className={`letterCell ${
          submitted ? cellColors(letters, answer, 4) : ""
        }`}
      >
        {letters?.[4] ?? ""}
      </div>
    </div>
  );
}
