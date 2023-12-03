export function GlobalSearch() {
  return (
    <form className="w-full">
      <input
        className="rounded-md px-2.5 font-normal w-full h-10"
        type="search"
        name="search"
        placeholder="Search..."
      />
      <button className="sr-only">Search</button>
    </form>
  );
}
