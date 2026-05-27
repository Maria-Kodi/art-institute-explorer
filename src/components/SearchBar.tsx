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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border p-2 rounded w-full"
        placeholder="Search artworks..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button className="bg-black text-white px-4 rounded">
        Search
      </button>
    </form>
  );
}