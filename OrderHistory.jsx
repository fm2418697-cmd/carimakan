import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Loader from "../components/Loader.jsx";

function formatRupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function OrderHistory() {
  const { sessionId } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${sessionId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <Loader label="Mengambil riwayat pesanan..." />;

  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-8">
      <Link to="/keranjang" className="text-sm font-semibold text-char/60 hover:text-chili">
        ← Kembali ke Keranjang
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold">Riwayat Pesanan</h1>

      {orders.length === 0 && (
        <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-card">
          <p className="text-2xl">🧾</p>
          <p className="mt-2 font-semibold">Belum ada pesanan</p>
          <p className="text-sm text-char/60">Riwayat checkout kamu (tersimpan di database) akan muncul di sini.</p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold">Pesanan #{order.id}</span>
              <span className="text-xs text-char/50">{formatDate(order.created_at)}</span>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-char/70">
              {order.items.map((it, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    {it.qty}× {it.name}
                  </span>
                  <span>{formatRupiah(it.price * it.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-char/10 pt-3 text-sm font-bold">
              <span>Total</span>
              <span className="text-chili">{formatRupiah(order.total_price)}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
