"use client";

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="p-3 border-b">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search messages..."
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>
  );
}
