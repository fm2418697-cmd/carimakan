export default function Loader({ label = "Sedang menunggu stok..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-char/60">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-char/10 border-t-chili" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
