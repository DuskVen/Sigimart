import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';

interface CategoryScreenProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

export const CategoryScreen: React.FC<CategoryScreenProps> = ({
  onSelectProduct,
  onAddToCart,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const categoryOptions = [
    { id: 'Semua', label: 'Semua Produk', count: PRODUCTS.length },
    {
      id: 'sayur',
      label: 'Sayuran',
      count: PRODUCTS.filter((p) => p.category === 'sayur').length,
    },
    {
      id: 'buah',
      label: 'Buah-buahan',
      count: PRODUCTS.filter((p) => p.category === 'buah').length,
    },
    {
      id: 'umbi',
      label: 'Umbi & Kentang',
      count: PRODUCTS.filter((p) => p.category === 'umbi').length,
    },
    {
      id: 'bumbu',
      label: 'Bumbu Dapur',
      count: PRODUCTS.filter((p) => p.category === 'bumbu').length,
    },
  ];

  const sortOptions: Array<{ id: SortOption; label: string }> = [
    { id: 'default', label: 'Urutan Rekomendasi' },
    { id: 'price-asc', label: 'Harga Terendah' },
    { id: 'price-desc', label: 'Harga Tertinggi' },
    { id: 'name-asc', label: 'Nama (A – Z)' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory !== 'Semua') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const activeCategoryLabel =
    categoryOptions.find((c) => c.id === activeCategory)?.label || 'Semua Produk';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d17]">
            Katalog Produk Segar
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Menampilkan 10 bahan pangan segar pilihan dengan foto asli dan ketersediaan terbaru.
          </p>
        </div>
        <p className="text-sm text-gray-600 font-medium tabular-nums">
          Menampilkan <span className="font-bold text-primary">{filteredProducts.length}</span> dari{' '}
          {PRODUCTS.length} produk
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filter */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-gray-200/80 p-5 lg:sticky lg:top-24 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Cari Produk
            </label>
            <div className="relative">
              <span className="material-symbols-outlined text-gray-400 text-lg absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Ketik nama produk..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-8 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Bersihkan pencarian"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Kategori Produk
            </h2>
            <div className="space-y-1.5">
              {categoryOptions.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onCategoryChange(cat.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-primary font-bold border border-emerald-200'
                        : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-xs tabular-nums ${
                        isActive ? 'text-primary font-bold' : 'text-gray-400'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Urutkan
            </h2>
            <div className="space-y-1.5">
              {sortOptions.map((opt) => {
                const isSelected = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSortBy(opt.id)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-sm transition-colors cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-emerald-50/70 text-primary font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-primary' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-primary" />}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {(activeCategory !== 'Semua' || searchQuery.trim() !== '' || sortBy !== 'default') && (
            <button
              type="button"
              onClick={() => {
                onCategoryChange('Semua');
                onSearchChange('');
                setSortBy('default');
              }}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#161d17] transition-colors cursor-pointer"
            >
              Reset Semua Filter
            </button>
          )}
        </aside>

        {/* Right 4-Column Product Grid */}
        <section className="lg:col-span-9 space-y-5">
          <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-gray-200/80">
            <span className="text-sm font-semibold text-[#161d17]">
              Kategori: <span className="text-primary">{activeCategoryLabel}</span>
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">
              Klik produk untuk melihat detail lengkap
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center space-y-3">
              <span className="material-symbols-outlined text-5xl text-gray-300">search_off</span>
              <h3 className="text-base font-bold text-[#161d17]">Produk tidak ditemukan</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Tidak ada produk yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo; pada kategori{' '}
                {activeCategoryLabel}.
              </p>
              <button
                type="button"
                onClick={() => {
                  onCategoryChange('Semua');
                  onSearchChange('');
                  setSortBy('default');
                }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Tampilkan Semua 10 Produk
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
