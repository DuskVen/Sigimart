import React, { useState, useEffect } from 'react';
import { Product, ScreenType } from '../types';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onAddToCart,
  onSelectProduct,
  onNavigate,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    setQuantity(1);
  }, [product.id]);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Beranda
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={() => onNavigate('category')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Kategori
          </button>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#161d17]">{product.name}</span>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Kembali ke Katalog</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-white border border-gray-200/80 shadow-xs">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <span className="text-emerald-700 font-semibold">{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{product.origin}</span>
                <span aria-hidden="true">·</span>
                <span>{product.unit}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d17]">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleShare}
                title="Salin tautan produk"
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-emerald-200 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">
                  {copiedShare ? 'check' : 'share'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                title="Simpan ke favorit"
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                  isFavorite
                    ? 'border-red-200 bg-red-50 text-strawberry-red'
                    : 'border-gray-200 text-gray-400 hover:text-strawberry-red'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${
                    isFavorite ? 'material-symbols-fill' : ''
                  }`}
                >
                  favorite
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-4 pb-5 border-b border-gray-100">
            <span className="text-3xl font-extrabold text-primary tabular-nums">
              Rp{product.price.toLocaleString('id-ID')}
            </span>
            <span className="text-sm font-semibold text-emerald-700">
              {product.stockText}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-surface-container-low rounded-2xl p-3.5 text-center border border-emerald-100/60"
              >
                <span className="material-symbols-outlined text-primary text-xl mb-1 block">
                  {idx === 0 ? 'eco' : idx === 1 ? 'verified' : 'package_2'}
                </span>
                <span className="text-xs font-semibold text-[#161d17]">{feat}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-[#161d17]">Deskripsi Produk</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-between sm:justify-start gap-4 border border-gray-200 rounded-xl px-4 h-12 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Kurangi jumlah"
                  className="text-primary hover:bg-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
                <span className="font-bold text-base text-[#161d17] min-w-[24px] text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Tambah jumlah"
                  className="text-primary hover:bg-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 h-12 px-6 rounded-xl bg-primary hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.99] cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                <span>
                  Tambah ke Keranjang (Rp{(product.price * quantity).toLocaleString('id-ID')})
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddToCart(product, quantity);
                onNavigate('cart');
              }}
              className="w-full h-11 rounded-xl border border-primary text-primary hover:bg-emerald-50 font-bold text-sm transition-colors cursor-pointer"
            >
              Beli Langsung Sekarang
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">local_shipping</span>
              <div>
                <p className="font-bold text-[#161d17]">Pengiriman Instan &amp; Terjadwal</p>
                <p className="text-gray-500 mt-0.5">Estimasi tiba 15–30 menit atau besok pagi</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">storefront</span>
              <div>
                <p className="font-bold text-[#161d17]">Gudang Pusat SigiMart</p>
                <p className="text-gray-500 mt-0.5">Disimpan di ruang pendingin higienis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6 pt-4 border-t border-gray-200/80">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#161d17]">Produk Segar Lainnya</h2>
          <button
            type="button"
            onClick={() => onNavigate('category')}
            className="text-sm font-semibold text-primary hover:underline cursor-pointer"
          >
            Lihat Semua Katalog
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard
              key={rel.id}
              product={rel}
              onSelect={onSelectProduct}
              onAddToCart={(p) => onAddToCart(p, 1)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
