import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import Home from "./pages/Home.jsx";
import FoodDetail from "./pages/FoodDetail.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:id" element={<FoodDetail />} />
          <Route path="/keranjang" element={<CartPage />} />
          <Route path="/riwayat" element={<OrderHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <Toast />
    </div>
  );
}
