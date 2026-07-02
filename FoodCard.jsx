import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

// Fungsi pembantu untuk mengubah angka nominal ke format mata uang Rupiah
function formatRupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function FoodCard({ meal }) {
  const { addToCart } = useCart();                                              // Mengambil fungsi untuk menambahkan item dari Context Cart

  return (
    <div className="animate-float-up group overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1">
      {/* Bungkus gambar dengan Link agar mengarah ke halaman detail menu saat diklik */}
      <Link to={`/menu/${meal.id}`} className="block overflow-hidden">
        <img
          src={meal.thumb}
          alt={meal.name}
          loading="lazy"                                                        // Optimasi performa memuat gambar hanya saat masuk viewport
          className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" // Efek zoom-in gambar saat kartu di-hover oleh mouse
        />
      </Link>
      <div className="p-4">
        {/* Menampilkan badge kategori menu hanya jika data kategorinya tersedia */}
        {meal.category && (
          <span className="mb-1 inline-block rounded-full bg-basil/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-basil">
            {meal.category}
          </span>
        )}
        
        {/* Judul menu makanan yang terhubung ke rute halaman detail */}
        <Link to={`/menu/${meal.id}`}>
          {/* line-clamp-1 memastikan judul yang terlalu panjang otomatis dipotong menjadi satu baris (...) */}
          <h3 className="line-clamp-1 font-display text-base font-semibold text-char hover:text-chili">
            {meal.name}
          </h3>
        </Link>
        
        {/* Menampilkan harga makanan yang dikonversi lewat formatRupiah */}
        <p className="mt-1 text-sm font-bold text-chili">{formatRupiah(meal.price)}</p>

        {/* Tombol aksi untuk menambahkan menu makanan yang dipilih ke dalam keranjang belanja */}
        <button
          onClick={() => addToCart(meal)}                                       // Memicu fungsi addToCart dengan mengirim data objek makanan terkait
          className="mt-3 w-full rounded-xl bg-char py-2 text-sm font-semibold text-cream transition hover:bg-chili"
        >
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
}