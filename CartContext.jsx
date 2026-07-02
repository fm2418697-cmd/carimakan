import { createContext, useContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext(null);

const API_BASE = "/api";

function getSessionId() {
  let id = localStorage.getItem("carimakan_session");
  if (!id) {
    id = "sess_" + Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem("carimakan_session", id);
  }
  return id;
}

export function CartProvider({ children }) {
  const [sessionId] = useState(getSessionId);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const refreshCart = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/cart/${sessionId}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error("Gagal memuat keranjang:", err);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const addToCart = async (meal) => {
    try {
      const res = await fetch(`${API_BASE}/cart/${sessionId}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: meal.id,
          name: meal.name,
          thumb: meal.thumb,
          price: meal.price,
        }),
      });
      const data = await res.json();
      setItems(data.items || []);
      showToast(`${meal.name} ditambahkan ke keranjang`);
    } catch (err) {
      console.error("Gagal menambah item:", err);
    }
  };

  const decreaseFromCart = async (id) => {
    const res = await fetch(`${API_BASE}/cart/${sessionId}/decrease`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setItems(data.items || []);
  };

  const removeFromCart = async (id) => {
    const res = await fetch(`${API_BASE}/cart/${sessionId}/item/${id}`, { method: "DELETE" });
    const data = await res.json();
    setItems(data.items || []);
  };

  const clearCart = async () => {
    const res = await fetch(`${API_BASE}/cart/${sessionId}`, { method: "DELETE" });
    const data = await res.json();
    setItems(data.items || []);
  };

  const checkout = async () => {
    const res = await fetch(`${API_BASE}/orders/${sessionId}/checkout`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Checkout gagal");
    setItems([]);
    showToast(`Pesanan #${data.orderId} berhasil dibuat!`);
    return data;
  };

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        totalItems,
        totalPrice,
        addToCart,
        decreaseFromCart,
        removeFromCart,
        clearCart,
        checkout,
        sessionId,
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam CartProvider");
  return ctx;
}
