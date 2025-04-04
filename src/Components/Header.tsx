export default function Header({
  pageTitle = "Games",
}: {
  pageTitle: string | null;
}) {
  return (
    <header className="flex justify-center items-center h-16 bg-[#252525] text-white">
      <h1 className="font-bold text-xl"> {pageTitle?.toUpperCase()} </h1>
    </header>
  );
}
