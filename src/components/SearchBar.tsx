import { useState, type FormEvent } from "react";

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!value.trim()) return;

    onSearch(value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 w-full"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search artworks, artists, styles..."
        className="
          flex-1 px-5 py-4 rounded-2xl
          bg-[#181614] border border-[#2a2622]
          text-[#f5ede0] placeholder:text-[#8f8577]
          focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20
          transition-all duration-300 text-sm tracking-wide
        "
      />

     <button
      type="submit"
      className="
    px-5 py-3 sm:px-6 sm:py-4
    rounded-2xl
    bg-[#c9a84c]
    text-black text-sm font-semibold tracking-widest uppercase
    whitespace-nowrap
    shadow-[0_2px_20px_rgba(201,168,76,0.3)]
    hover:bg-[#e0bc5e]
    hover:shadow-[0_4px_32px_rgba(201,168,76,0.55)]
    hover:-translate-y-0.5
    active:scale-[0.97]
    transition-all duration-300
  "
   >
  Search
</button>
    </form>
  );
}