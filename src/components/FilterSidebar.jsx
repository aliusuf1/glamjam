export default function FilterSidebar({ groups }) {
  return (
    <aside className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="font-display text-lg text-plum-700">{group.title}</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {group.options.map((opt) => (
              <li key={opt.value}>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-plum-600 hover:text-rose-500">
                  <input
                    type="checkbox"
                    checked={group.selected.has(opt.value)}
                    onChange={() => group.onToggle(opt.value)}
                    className="h-4 w-4 rounded border-rose-300 text-rose-500 focus:ring-rose-300"
                  />
                  {opt.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
