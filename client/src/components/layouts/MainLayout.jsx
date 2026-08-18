import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-svh">
      <Navbar />
      <main className="flex-1 mx-auto ">{children}</main>
      <Footer />
    </div>
  );
}
