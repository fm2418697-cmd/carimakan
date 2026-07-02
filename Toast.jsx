import { useCart } from "../context/CartContext.jsx";

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-float-up rounded-full bg-char px-5 py-3 text-sm font-medium text-cream shadow-card">
      ✅ {toast}
    </div>
  );
}
