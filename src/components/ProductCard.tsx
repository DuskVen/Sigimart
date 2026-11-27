import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onSelect(product)}
      className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200"
    >
      <div>
        <div className="relative aspect-[4/3] w-full bg-[#F5F7F5] overflow-hidden">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-primary p-4 text-center">
              <span className="material-symbols-outlined text-4xl mb-1">eco</span>
              <span className="text-xs font-semibold">{product.name}</span>
            </div>
          )}
        </div>

        <div className="p-4 pb-3 space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
            <span className="font-medium text-emerald-700">{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.unit}</span>
          </div>

          <h3 className="text-base font-semibold text-[#161d17] group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 min-h-[2.25rem]">
            {product.description}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-gray-100/80 flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-base font-bold text-primary tabular-nums">
            Rp{product.price.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] font-medium text-gray-500">
            {product.stockText}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full min-h-[40px] px-4 py-2 rounded-xl bg-emerald-50 hover:bg-primary text-primary hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-[0.98] cursor-pointer border border-emerald-200/80 hover:border-primary"
        >
          <span className="material-symbols-outlined text-[17px]">add_shopping_cart</span>
          <span>Tambah ke Keranjang</span>
        </button>
      </div>
    </article>
  );
};
