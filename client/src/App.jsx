import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import MainLayout from "./components/layouts/MainLayout";
import { useAuth } from "@clerk/react";
import PageLoader from "./components/common/PageLoader";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <PageLoader />;
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
      </Routes>
    </MainLayout>
  );
}
