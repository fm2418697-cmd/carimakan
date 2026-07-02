import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { useCart } from "../context/CartContext.jsx";

const API_BASE = "/api";

function formatRupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function FoodDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/meals/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Menu tidak ditemukan");
        return res.json();
      })
      .then(setMeal)
      .catch(() => setError("Gagal memuat detail menu."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader label="Mengambil detail menu..." />;

  if (error || !meal) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <p className="text-2xl">😕</p>
        <p className="mt-2 font-semibold">{error || "Menu tidak ditemukan"}</p>
        <Link to="/" className="mt-4 inline-block rounded-full bg-chili px-5 py-2 text-sm font-semibold text-cream">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 pb-16 pt-8">
      <Link to="/" className="text-sm font-semibold text-char/60 hover:text-chili">
        ← Kembali
      </Link>

      <div className="mt-4 grid gap-8 sm:grid-cols-2">
        <img
          src={meal.thumb}
          alt={meal.name}
          className="aspect-square w-full rounded-2xl object-cover shadow-card"
        />

        <div>
          <span className="inline-block rounded-full bg-basil/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-basil">
            {meal.category} · {meal.area}
          </span>
          <h1 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{meal.name}</h1>
          <p className="mt-2 text-xl font-bold text-chili">{formatRupiah(meal.price)}</p>

          <button
            onClick={() => addToCart(meal)}
            className="mt-5 w-full rounded-xl bg-char py-3 text-sm font-semibold text-cream transition hover:bg-chili sm:w-auto sm:px-8"
          >
            🛒 Tambah ke Keranjang
          </button>

          <div className="mt-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-char/70">
              Bahan-bahan
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-char/80">
              {meal.ingredients.map((ing, i) => (
                <li key={i} className="flex justify-between gap-2 border-b border-char/5 py-1">
                  <span>{ing.ingredient}</span>
                  <span className="text-char/50">{ing.measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-bold">Cara Membuat</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-char/80">
          {meal.instructions}
        </p>
      </div>

      {meal.youtube && (
        <a
          href={meal.youtube}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-chili hover:underline"
        >
          ▶ Tonton video tutorial
        </a>
      )}
    </main>
  );
}
