import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <p className="text-5xl">🍳</p>
      <h1 className="mt-4 font-display text-2xl font-bold">404 — Halaman Tidak Ditemukan</h1>
      <p className="mt-2 text-sm text-char/60">Sepertinya menu yang kamu cari sudah habis.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-chili px-6 py-2.5 text-sm font-semibold text-cream"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
