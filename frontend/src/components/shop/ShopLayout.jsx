import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'
const ShopLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-solid border-b-[1px]">
        <Header />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>

  );
};

export default ShopLayout