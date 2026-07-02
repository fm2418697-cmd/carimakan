import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { totalItems } = useCart();                                             // Mengambil jumlah total item unik/kuantitas dari context keranjang
  const location = useLocation();                                               // Mengambil objek lokasi rute saat ini untuk kebutuhan active link

  return (
    <header className="sticky top-0 z-40 border-b border-char/10 bg-cream/90 backdrop-blur"> {/* Komponen header melayang (sticky) dengan efek blur transparan */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"> {/* Container flexbox perata konten header kiri, tengah, dan kanan */}
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-700 tracking-tight"> {/* Link logo utama menuju ke halaman Beranda */}
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-chili text-cream shadow-card"> {/* Pembungkus ikon emoji dengan latar belakang merah cabai */}
            🍲
          </span>
          <span className="font-bold">
            Cari<span className="text-chili">Makan</span>                              {/* Teks penamaan aplikasi dengan variasi warna pada kata "Makan" */}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-char/70 sm:flex"> {/* Menu navigasi yang disembunyikan di mobile, muncul di layar sm */}
          <Link
            to="/"
            className={`transition hover:text-char ${location.pathname === "/" ? "text-char" : ""}`} // Memberikan warna aktif jika pengguna berada di path beranda ("/")
          >
            Beranda
          </Link>
        </nav>

        <Link
          to="/keranjang"
          className="relative flex items-center gap-2 rounded-full bg-char px-4 py-2 text-sm font-semibold text-cream transition hover:bg-char/90" // Tombol navigasi menuju halaman keranjang belanja
        >
          <span>🛒</span>
          <span className="hidden sm:inline">Keranjang</span>                           {/* Teks "Keranjang" disembunyikan pada layar sekecil perangkat mobile */}
          {totalItems > 0 && (                                                          /* Badge jumlah item hanya dirender jika total barang di keranjang > 0 */
            <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-turmeric text-[11px] font-bold text-char">
              {totalItems}                                                              {/* Menampilkan angka jumlah barang secara absolut di pojok kanan atas */}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}