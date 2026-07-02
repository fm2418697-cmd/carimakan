export default function Footer() {
  return (
    <footer className="mt-16 border-t border-char/10 bg-white">                             {/* Pembungkus utama footer dengan border atas tipis */}
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-char/60">                   {/* Container pembatas lebar konten agar rapi di tengah */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">      {/* Responsive flexbox: kolom di mobile, baris di desktop */}
          <div className="flex items-center gap-2 font-display font-bold text-char">        {/* Bagian branding nama aplikasi / logo */}
            🍲 Cari<span className="text-chili">Makan</span>
          </div>
          <p>Data menu bersumber dari TheMealDB. Dibuat untuk tugas praktikum React.js.</p> {/* Informasi atribusi API dan tujuan aplikasi */}
          <p>&copy; {new Date().getFullYear()} CariMakan. Semua hak cipta dilindungi.</p>   {/* Hak cipta dengan tahun dinamis otomatis berformat 2026 */}
        </div>
      </div>
    </footer>
  );
}