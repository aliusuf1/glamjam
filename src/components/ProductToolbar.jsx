import { sortOptions } from "../lib/sort";

export default function ProductToolbar({ count, sortKey, onSortChange }) {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-rose-100 pb-4">
      <p className="text-sm text-plum-500">{count} products</p>
      <select
        value={sortKey}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm text-plum-700 outline-none focus:border-rose-400"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
