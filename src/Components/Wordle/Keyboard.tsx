const topRowKeys: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const midRowKeys: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const botRowKeys: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

function onKeyPress(key: string): void {
  const event: KeyboardEvent = new KeyboardEvent("keydown", { key: key });
  window.dispatchEvent(event);
}

const keyboardCellColor = (key: string, guesses: string[], answer: string) => {
  let isKeyChecked: boolean = false;
  let isKeyPresent: boolean = false;
  let isInCorrectPosition: boolean = false;

  for (const guess of guesses) {
    if (guess.includes(key)) {
      isKeyChecked = true;
      if (answer.includes(key)) {
        isKeyPresent = true;
        if (guess.indexOf(key) === answer.indexOf(key)) {
          isInCorrectPosition = true;
          break;
        }
      }
    }
  }

  if (isInCorrectPosition) return "bg-green-500";
  if (isKeyPresent) return "bg-yellow-500";
  if (isKeyChecked) return "bg-[var(--background-2)]";
  return "bg-gray-500";
};

export default function Keyboard({
  guesses,
  answer,
}: {
  guesses: string[];
  answer: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-[24vh] w-[96vw] max-w-[600px]">
      <div className="keyboard-row">
        {topRowKeys.map((key) => (
          <button
            key={key}
            className={`keyboard-button ${keyboardCellColor(
              key,
              guesses,
              answer
            )}`}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="keyboard-row px-4">
        {midRowKeys.map((key) => (
          <button
            key={key}
            className={`keyboard-button ${keyboardCellColor(
              key,
              guesses,
              answer
            )}`}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="keyboard-row">
        <button
          className="keyboard-button px-2 bg-gray-500"
          onClick={() => onKeyPress("Enter")}
        >
          Enter
        </button>
        {botRowKeys.map((key) => (
          <button
            key={key}
            className={`keyboard-button ${keyboardCellColor(
              key,
              guesses,
              answer
            )}`}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </button>
        ))}
        <button
          className="keyboard-button px-2 bg-gray-500"
          onClick={() => onKeyPress("Backspace")}
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
