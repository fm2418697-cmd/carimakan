export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-full border border-char/10 bg-white px-2 py-2 shadow-card"
    >
      <span className="pl-3 text-lg">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari makanan favoritmu... (mis. chicken, pasta, cake)"
        className="w-full bg-transparent px-1 py-2 text-sm outline-none placeholder:text-char/40"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-chili px-5 py-2 text-sm font-semibold text-cream transition hover:bg-chili/90"
      >
        Cari
      </button>
    </form>
  );
}
