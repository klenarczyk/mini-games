import { redirect } from "next/navigation";

export default function Header({
  pageTitle = "Mini Games",
}: {
  pageTitle: string | null;
}) {
  return (
    <header className="relative flex justify-center items-center h-[8vh] bg-[var(--background-2)] text-white">
      {pageTitle !== "Mini Games" && (
        <button
          className="absolute left-4 px-4 py-2 cursor-pointer"
          onClick={() => redirect("/")}
        >
          Return
        </button>
      )}

      <h1 className="font-bold text-xl text-black dark:text-white">
        {" "}
        {pageTitle?.toUpperCase()}{" "}
      </h1>
    </header>
  );
}
