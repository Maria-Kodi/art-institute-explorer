import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search artworks, artists, styles..."
        className="w-full px-4 py-3 rounded-xl border border-neutral-200
                   focus:outline-none focus:ring-2 focus:ring-neutral-300
                   bg-white text-sm"
      />

      <button
        className="px-5 py-3 rounded-xl bg-neutral-900 text-white text-sm
                   hover:bg-neutral-800 transition"
      >
        Search
      </button>
    </form>
  );
}