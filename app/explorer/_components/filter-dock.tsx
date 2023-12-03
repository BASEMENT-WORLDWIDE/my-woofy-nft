export function FilterDock() {
  return (
    <div className="fixed bottom-4 left-0 right-0 pointer-events-none z-10">
      <div className="rounded-full bg-black bg-opacity-70 backdrop-blur-lg flex flex-row gap-2 py-1.5 px-3 w-fit mx-auto pointer-events-auto">
        <button>F</button>
        <button>X</button>
        <button>B</button>
      </div>
    </div>
  );
}
