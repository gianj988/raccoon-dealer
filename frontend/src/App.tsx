import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import CurrentCartPage from "./pages/CurrentCartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import CustomerOrdersPage from "./pages/CustomerOrdersPage";
import MainLayout from "./components/layout/MainLayout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderConfirmedThankyouPage from "./pages/OrderConfirmedThankyouPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="login" element={<AuthPage />}></Route>
          <Route
            path="product/:productId"
            element={<ProductDetailsPage />}
          ></Route>
          <Route path="cart" element={<CurrentCartPage />}></Route>
          <Route path="order-confirm" element={<OrderConfirmPage />}></Route>
          <Route
            path="thank-you"
            element={<OrderConfirmedThankyouPage />}
          ></Route>
          <Route path="customer" element={<Outlet />}>
            <Route path="orders" element={<CustomerOrdersPage />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
