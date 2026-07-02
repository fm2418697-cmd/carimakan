import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import FoodCard from "../components/FoodCard.jsx";
import Loader from "../components/Loader.jsx";

const API_BASE = "/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil daftar kategori sekali saat mounting
  useEffect(() => {
    fetch(`${API_BASE}/meals/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => {});
  }, []);

  // Ambil menu awal (random) saat pertama kali dibuka
  useEffect(() => {
    loadRandom();
  }, []);

  async function loadRandom() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/meals/random?count=12`);
      if (!res.ok) throw new Error("Gagal memuat data");
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      setError("Gagal memuat menu. Periksa koneksi backend Anda.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(term) {
    const q = term.trim();
    setActiveCategory("Semua");
    setLoading(true);
    setError(null);
    try {
      if (!q) {
        await loadRandom();
        return;
      }
      const res = await fetch(`${API_BASE}/meals/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Gagal mencari");
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      setError("Gagal mencari menu. Coba lagi beberapa saat.");
    } finally {
      setLoading(false);
    }
  }

  // Filter real-time di sisi client berdasarkan kategori & query yang sedang diketik
  const displayedMeals = meals.filter((m) => {
    const matchCategory = activeCategory === "Semua" || m.category === activeCategory;
    const matchQuery = query.trim() === "" || m.name.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-10">
      {/* Hero */}
      <section className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Lapar? <span className="text-chili">CariMakan</span> aja.
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-char/60">
          Temukan ribuan inspirasi menu dari seluruh dunia, lengkap dengan detail bahan dan cara
          membuatnya.
        </p>
      </section>

      <div className="sticky top-[73px] z-30 -mx-5 bg-cream/95 px-5 py-3 backdrop-blur">
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />

        {categories.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {["Semua", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  activeCategory === cat
                    ? "bg-chili text-cream"
                    : "bg-white text-char/70 hover:bg-char/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <section className="mt-6">
        {loading && <Loader />}

        {!loading && error && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-card">
            <p className="text-2xl">😕</p>
            <p className="mt-2 font-semibold text-char">{error}</p>
            <button
              onClick={loadRandom}
              className="mt-4 rounded-full bg-chili px-5 py-2 text-sm font-semibold text-cream"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && displayedMeals.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-card">
            <p className="text-2xl">🍽️</p>
            <p className="mt-2 font-semibold text-char">Menu tidak ditemukan</p>
            <p className="text-sm text-char/60">Coba kata kunci atau kategori lain.</p>
          </div>
        )}

        {!loading && !error && displayedMeals.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {displayedMeals.map((meal) => (
              <FoodCard key={meal.id} meal={meal} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
