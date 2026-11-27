import React, { useState } from 'react';
import { CartItem, DeliveryAddress, ScreenType } from '../types';
import { AddressModal } from './AddressModal';

type PaymentMethod =
  | 'OVO'
  | 'Dana'
  | 'LinkAja'
  | 'SIGI-pay'
  | 'Cash on Delivery (COD)';

interface CartScreenProps {
  cartItems: CartItem[];
  savedAddresses: DeliveryAddress[];
  selectedAddress: DeliveryAddress;
  sigiPayBalance: number;
  onSelectAddress: (addr: DeliveryAddress) => void;
  onAddAddress: (addr: DeliveryAddress) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onCheckoutSuccess: (paymentMethod: string, grandTotal: number) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  savedAddresses,
  selectedAddress,
  sigiPayBalance,
  onSelectAddress,
  onAddAddress,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onCheckoutSuccess,
}) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('OVO');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shippingFee = cartItems.length > 0 ? 10000 : 0;
  const discount = cartItems.length > 0 ? 5000 : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);
  const isInsufficientSigiPay =
    selectedPayment === 'SIGI-pay' && cartItems.length > 0 && sigiPayBalance < grandTotal;

  const handleCheckout = () => {
    if (cartItems.length === 0 || isInsufficientSigiPay) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onCheckoutSuccess(selectedPayment, grandTotal);
      onNavigate('order_tracking');
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d17]">
            Keranjang Belanja
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Periksa alamat pengiriman, item pilihan, dan metode pembayaran sebelum checkout.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('category')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span>Tambah Produk Lain</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#161d17]">
                Alamat &amp; Informasi Penerima
              </h2>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
                className="text-sm font-semibold text-primary hover:underline cursor-pointer"
              >
                Ubah
              </button>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low border border-emerald-100/80">
              <div className="w-11 h-11 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 border border-emerald-100">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-[#161d17]">{selectedAddress.title}</span>
                  <span aria-hidden="true" className="text-gray-400">·</span>
                  <span className="text-xs font-semibold text-emerald-700">
                    {selectedAddress.recipientName}
                  </span>
                  <span aria-hidden="true" className="text-gray-400">·</span>
                  <span className="text-xs text-gray-600 tabular-nums">
                    {selectedAddress.phone}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedAddress.detail}</p>
                {selectedAddress.notes && (
                  <p className="text-xs text-gray-500">Catatan: {selectedAddress.notes}</p>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200/80 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-[#161d17]">Item Terpilih</h2>
              <span className="text-sm font-medium text-gray-500 tabular-nums">
                {totalItemCount} item
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <span className="material-symbols-outlined text-5xl text-gray-300">
                  shopping_cart
                </span>
                <p className="text-sm font-semibold text-gray-600">
                  Keranjang belanja Anda masih kosong.
                </p>
                <p className="text-xs text-gray-500">
                  Tambahkan sayur, buah, atau bumbu dapur segar dari katalog kami.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('category')}
                  className="mt-2 px-6 py-2.5 bg-primary hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Jelajahi Katalog Produk
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-xl bg-gray-50 border border-gray-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-emerald-700 font-medium">
                        {product.categoryLabel} · {product.unit}
                      </p>
                      <h3 className="font-bold text-base text-[#161d17] truncate mt-0.5">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 tabular-nums">
                        Harga satuan: Rp{product.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div className="flex items-center gap-2 bg-gray-50 px-2.5 py-1.5 rounded-xl border border-gray-200">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          aria-label={`Kurangi ${product.name}`}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">remove</span>
                        </button>
                        <span className="font-bold text-sm min-w-[20px] text-center text-[#161d17] tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          aria-label={`Tambah ${product.name}`}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-emerald-800 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">add</span>
                        </button>
                      </div>

                      <div className="text-right min-w-[96px]">
                        <p className="font-bold text-sm text-primary tabular-nums">
                          Rp{(product.price * quantity).toLocaleString('id-ID')}
                        </p>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-strawberry-red font-medium mt-1 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#161d17] mb-3">Metode Pembayaran</h2>
              <div className="grid grid-cols-6 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedPayment('OVO')}
                  className={`col-span-2 flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedPayment === 'OVO'
                      ? 'border-primary bg-emerald-50/60'
                      : 'border-gray-100 bg-gray-50/70 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-extrabold text-blue-600 italic">OVO</span>
                  <span className="text-[11px] font-semibold text-gray-600 mt-0.5">Utama</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment('Dana')}
                  className={`col-span-2 flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedPayment === 'Dana'
                      ? 'border-primary bg-emerald-50/60'
                      : 'border-gray-100 bg-gray-50/70 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-extrabold text-sky-500 italic">Dana</span>
                  <span className="text-[11px] font-semibold text-gray-600 mt-0.5">E-Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment('LinkAja')}
                  className={`col-span-2 flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedPayment === 'LinkAja'
                      ? 'border-primary bg-emerald-50/60'
                      : 'border-gray-100 bg-gray-50/70 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-extrabold text-red-600 italic">LinkAja</span>
                  <span className="text-[11px] font-semibold text-gray-600 mt-0.5">Instan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment('SIGI-pay')}
                  className={`col-span-3 flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer text-center ${
                    selectedPayment === 'SIGI-pay'
                      ? 'border-primary bg-emerald-50/60'
                      : 'border-gray-100 bg-gray-50/70 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg text-primary">
                      account_balance_wallet
                    </span>
                    <span className="text-sm font-extrabold text-primary">SIGI-pay</span>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-600 mt-0.5 tabular-nums">
                    Saldo Rp{sigiPayBalance.toLocaleString('id-ID')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment('Cash on Delivery (COD)')}
                  className={`col-span-3 flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer text-center ${
                    selectedPayment === 'Cash on Delivery (COD)'
                      ? 'border-primary bg-emerald-50/60'
                      : 'border-gray-100 bg-gray-50/70 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg text-amber-600">
                      payments
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#161d17]">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-600 mt-0.5">
                    Bayar di tempat
                  </span>
                </button>
              </div>

              {isInsufficientSigiPay && (
                <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2 text-xs text-red-700">
                    <span className="material-symbols-outlined text-base shrink-0 mt-0.5">
                      error
                    </span>
                    <span>
                      Saldo SIGI-pay Anda (Rp{sigiPayBalance.toLocaleString('id-ID')}) belum mencukupi.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('profile')}
                    className="shrink-0 text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    Top Up
                  </button>
                </div>
              )}
            </div>

            <div className="pt-5 border-t border-gray-100 space-y-3">
              <h2 className="text-base font-bold text-[#161d17]">Ringkasan Pembayaran</h2>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Subtotal ({totalItemCount} item)</span>
                  <span className="font-semibold text-[#161d17] tabular-nums">
                    Rp{subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold text-[#161d17] tabular-nums">
                    Rp{shippingFee.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Diskon Belanja Segar</span>
                  <span className="font-semibold text-strawberry-red tabular-nums">
                    -Rp{discount.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between items-center">
                  <span className="font-bold text-base text-[#161d17]">Total Pembayaran</span>
                  <span className="font-extrabold text-xl text-primary tabular-nums">
                    Rp{grandTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || isProcessing || isInsufficientSigiPay}
              className="w-full h-12 rounded-xl bg-primary hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.99] cursor-pointer shadow-sm"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-lg">
                    progress_activity
                  </span>
                  <span>Memproses Pembayaran...</span>
                </>
              ) : (
                <>
                  <span>
                    {selectedPayment === 'Cash on Delivery (COD)'
                      ? `Pesan Sekarang (COD) · Rp${grandTotal.toLocaleString('id-ID')}`
                      : `Bayar Sekarang · Rp${grandTotal.toLocaleString('id-ID')}`}
                  </span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </aside>
      </div>

      {isAddressModalOpen && (
        <AddressModal
          currentAddress={selectedAddress}
          savedAddresses={savedAddresses}
          onSelectAddress={onSelectAddress}
          onAddAddress={onAddAddress}
          onClose={() => setIsAddressModalOpen(false)}
        />
      )}
    </div>
  );
};
