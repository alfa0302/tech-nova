import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-svh">
      <Navbar />
      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
