import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function formatRupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function CartPage() {
  const { items, totalPrice, addToCart, decreaseFromCart, removeFromCart, clearCart, checkout, loading } =
    useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  async function handleCheckout() {
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      await checkout();
    } catch (err) {
      setCheckoutError(err.message);
    } finally {
      setCheckingOut(false);
    }
  }

  if (loading) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <p className="text-4xl">🛒</p>
        <h1 className="mt-3 font-display text-xl font-bold">Keranjangmu masih kosong</h1>
        <p className="mt-1 text-sm text-char/60">Yuk cari menu favoritmu dan pesan sekarang.</p>
        <Link
          to="/"
          className="mt-5 inline-block rounded-full bg-chili px-6 py-2.5 text-sm font-semibold text-cream"
        >
          Jelajahi Menu
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Keranjang Belanja</h1>
        <button onClick={clearCart} className="text-xs font-semibold text-char/50 hover:text-chili">
          Kosongkan
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-card"
          >
            <img src={item.thumb} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1">
              <Link to={`/menu/${item.id}`} className="font-display text-sm font-semibold hover:text-chili">
                {item.name}
              </Link>
              <p className="text-sm font-bold text-chili">{formatRupiah(item.price)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseFromCart(item.id)}
                className="grid h-7 w-7 place-items-center rounded-full bg-char/5 font-bold hover:bg-char/10"
              >
                −
              </button>
              <span className="w-5 text-center text-sm font-semibold">{item.qty}</span>
              <button
                onClick={() => addToCart(item)}
                className="grid h-7 w-7 place-items-center rounded-full bg-char/5 font-bold hover:bg-char/10"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-2 text-char/40 hover:text-chili"
              aria-label={`Hapus ${item.name}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-5 shadow-card">
        <div className="flex items-center justify-between text-sm text-char/60">
          <span>Total pembayaran</span>
          <span className="font-display text-xl font-bold text-char">{formatRupiah(totalPrice)}</span>
        </div>
        {checkoutError && (
          <p className="mt-3 text-center text-xs font-medium text-chili">{checkoutError}</p>
        )}

        <button
          onClick={handleCheckout}
          disabled={checkingOut}
          className="mt-4 w-full rounded-xl bg-chili py-3 text-sm font-semibold text-cream transition hover:bg-chili/90 disabled:opacity-60"
        >
          {checkingOut ? "Memproses..." : "Checkout"}
        </button>
      </div>

      <Link
        to="/riwayat"
        className="mt-4 block text-center text-xs font-semibold text-char/50 hover:text-chili"
      >
        Lihat riwayat pesanan →
      </Link>
    </main>
  );
}
