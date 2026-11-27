import React, { useState } from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: ScreenType; label: string }> = [
    { id: 'home', label: 'Beranda' },
    { id: 'category', label: 'Kategori' },
    { id: 'order_tracking', label: 'Pesanan' },
    { id: 'profile', label: 'Profil' },
  ];

  const handleNavClick = (screen: ScreenType) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Logo & Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-primary whitespace-nowrap shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img
            src="/assets/aistudio/sigimart_logo_fotor_bg_remover_2026041517401_c1bccc9c.png"
            alt="Logo SigiMart"
            className="w-11 h-11 object-contain shrink-0"
          />
          <span>SigiMart</span>
        </button>

        {/* Primary Desktop Top Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive =
              currentScreen === item.id ||
              (item.id === 'category' && currentScreen === 'product_detail');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Search + Primary Cart Action */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit();
            }}
            className="hidden lg:flex items-center relative w-64 xl:w-72"
          >
            <span className="material-symbols-outlined text-gray-400 text-lg absolute left-3.5 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari sayur, buah, bumbu..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-8 text-xs text-[#161d17] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Hapus pencarian"
                className="absolute right-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </form>

          <button
            onClick={() => handleNavClick('cart')}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer active:scale-[0.98] ${
              currentScreen === 'cart'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-primary hover:bg-emerald-800 text-white shadow-xs'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">shopping_cart</span>
            <span>Keranjang</span>
            {cartCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.5 text-[11px] font-bold bg-fresh-leaf text-[#003919] rounded-md tabular-nums leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu navigasi"
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Dropdown Menu (replaces bottom nav on mobile screens) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2 shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit();
              setMobileMenuOpen(false);
            }}
            className="relative flex items-center mb-2"
          >
            <span className="material-symbols-outlined text-gray-400 text-lg absolute left-3 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari produk segar..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary"
            />
          </form>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-primary border border-emerald-200'
                      : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
