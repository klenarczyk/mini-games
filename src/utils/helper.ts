export const cellColors = (
  letters: string[],
  answer: string,
  index: number
) => {
  const correctLetters: string[] = answer.split("");

  if (letters[index] === answer[index]) return "bg-green-500";
  if (correctLetters.includes(letters[index])) return "bg-yellow-500";
  return "bg-gray-500";
};
