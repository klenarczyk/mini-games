export default function Header({
  pageTitle = "Games",
}: {
  pageTitle: string | null;
}) {
  return (
    <header className="flex justify-center items-center h-16 bg-[#1e1e1e] text-white">
      <h1 className="font-bold text-xl"> {pageTitle?.toUpperCase()} </h1>
    </header>
  );
}
