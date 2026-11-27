import React from 'react';
import { Product, ScreenType } from '../types';
import { PRODUCTS, HERO_BANNER_IMAGE } from '../data/mockData';
import { ProductCard } from './ProductCard';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectCategoryFilter: (categoryKey: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onSelectCategoryFilter,
  searchQuery,
  onSearchChange,
}) => {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);
  const newestProducts = PRODUCTS.filter((p) => p.isNew);

  const categories = [
    {
      id: 'sayur',
      title: 'Sayuran Segar',
      subtitle: 'Bayam, Wortel, Tomat & Brokoli',
      count: '4 Produk',
      icon: 'eco',
      bgClass: 'bg-emerald-50 border-emerald-100 text-primary',
    },
    {
      id: 'buah',
      title: 'Buah-buahan',
      subtitle: 'Apel Fuji, Pisang Kepok & Jeruk',
      count: '3 Produk',
      icon: 'nutrition',
      bgClass: 'bg-orange-50 border-orange-100 text-orange-600',
    },
    {
      id: 'umbi',
      title: 'Umbi & Kentang',
      subtitle: 'Kentang Dieng Pilihan',
      count: '1 Produk',
      icon: 'grocery',
      bgClass: 'bg-amber-50 border-amber-100 text-amber-600',
    },
    {
      id: 'bumbu',
      title: 'Bumbu Dapur',
      subtitle: 'Bawang Merah & Cabai Merah',
      count: '2 Produk',
      icon: 'local_fire_department',
      bgClass: 'bg-red-50 border-red-100 text-strawberry-red',
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectCategoryFilter('Semua');
    onNavigate('category');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Main Promotional Hero Banner + Search */}
      <section className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#006d37] via-[#00592c] to-[#084526] text-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-14 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-emerald-200 tracking-wide">
                Pasar Segar Harian · Pengiriman Cepat ke Rumah
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-balance">
                Belanja Sayur &amp; Buah Segar Langsung dari Petani
              </h1>
              <p className="text-sm sm:text-base text-emerald-50/90 max-w-xl leading-relaxed">
                Nikmati bahan dapur berkualitas pilihan yang dipanen setiap pagi dengan harga jujur dan pengantaran kilat.
              </p>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-xl"
            >
              <div className="relative flex-1">
                <span className="material-symbols-outlined text-gray-400 text-xl absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cari bayam, wortel, apel fuji, bawang merah..."
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-[#161d17] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-fresh-leaf/35 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-6 rounded-xl bg-fresh-leaf hover:bg-emerald-400 text-[#003919] font-bold text-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer shadow-sm"
              >
                Cari Produk
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-6 pt-1 text-xs sm:text-sm text-emerald-100">
              <button
                type="button"
                onClick={() => {
                  onSelectCategoryFilter('Semua');
                  onNavigate('category');
                }}
                className="inline-flex items-center gap-2 font-bold text-white hover:text-emerald-200 underline underline-offset-4 cursor-pointer"
              >
                <span>Jelajahi Semua 10 Produk Segar</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
              <span aria-hidden="true" className="hidden sm:inline text-emerald-400/60">
                |
              </span>
              <span>Gratis Ongkir Promo Belanja Harian</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[420px]">
            <img
              src={HERO_BANNER_IMAGE}
              alt="Keranjang sayur dan buah segar SigiMart"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover lg:absolute lg:inset-0"
            />
            <div className="hidden lg:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#084526]/70 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-[#161d17]">Kategori Populer</h2>
            <p className="text-sm text-gray-500 mt-1">
              Pilih kategori bahan makanan segar sesuai kebutuhan dapur Anda hari ini.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onSelectCategoryFilter('Semua');
              onNavigate('category');
            }}
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Lihat Semua Kategori</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                onSelectCategoryFilter(cat.id);
                onNavigate('category');
              }}
              className="bg-white rounded-2xl border border-gray-200/80 p-5 text-left flex items-center gap-4 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${cat.bgClass}`}
              >
                <span className="material-symbols-outlined text-3xl material-symbols-fill">
                  {cat.icon}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base text-[#161d17] group-hover:text-primary transition-colors truncate">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{cat.subtitle}</p>
                <p className="text-xs font-semibold text-emerald-700 mt-1.5">{cat.count}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured / Recommended Products */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-[#161d17]">Produk Unggulan &amp; Rekomendasi</h2>
            <p className="text-sm text-gray-500 mt-1">
              Pilihan terlaris pelanggan SigiMart dengan kesegaran terjaga setiap hari.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onSelectCategoryFilter('Semua');
              onNavigate('category');
            }}
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Lihat Katalog Lengkap</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Newest Products */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-[#161d17]">Produk Terbaru</h2>
            <p className="text-sm text-gray-500 mt-1">
              Panen terbaru yang baru saja tiba di gudang SigiMart pagi ini.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onSelectCategoryFilter('Semua');
              onNavigate('category');
            }}
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Semua Produk (10)</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newestProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
