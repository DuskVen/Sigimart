import React, { useState, useEffect } from 'react';
import {
  CompletedOrder,
  DeliveryAddress,
  OrderTrackingInfo,
  ScreenType,
} from '../types';
import { AddressModal } from './AddressModal';
import { TopUpModal } from './TopUpModal';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  orderInfo: OrderTrackingInfo | null;
  completedOrders: CompletedOrder[];
  defaultOpenOrderHistory?: boolean;
  onReorder: (order: CompletedOrder) => void;
  savedAddresses: DeliveryAddress[];
  selectedAddress: DeliveryAddress;
  onSelectAddress: (addr: DeliveryAddress) => void;
  onAddAddress: (addr: DeliveryAddress) => void;
  sigiPayBalance: number;
  onTopUpSigiPay: (amount: number, method: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  cartCount,
  orderInfo,
  completedOrders,
  defaultOpenOrderHistory = false,
  onReorder,
  savedAddresses,
  selectedAddress,
  onSelectAddress,
  onAddAddress,
  sigiPayBalance,
  onTopUpSigiPay,
}) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [showOrderHistoryPanel, setShowOrderHistoryPanel] = useState(defaultOpenOrderHistory);
  const [showHelpPanel, setShowHelpPanel] = useState(false);

  useEffect(() => {
    if (defaultOpenOrderHistory) {
      setShowOrderHistoryPanel(true);
    }
  }, [defaultOpenOrderHistory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-gray-200/80 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d17]">Profil Akun</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola informasi akun, alamat pengiriman tersimpan, dan pantau pesanan aktif Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-fresh-leaf text-white flex items-center justify-center font-extrabold text-2xl shrink-0">
              H
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-[#161d17] truncate">Haryadi Pratama</h2>
                <span className="text-xs font-bold text-amber-700">· Gold</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 truncate">haryadit540@gmail.com</p>
              <p className="text-xs text-primary font-semibold mt-1 tabular-nums">
                ID Member: #SGM-88219
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-gray-400 uppercase block">
                Saldo Sigi-Pay
              </span>
              <p className="text-xl font-extrabold text-primary mt-1 tabular-nums truncate">
                Rp{sigiPayBalance.toLocaleString('id-ID')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsTopUpModalOpen(true)}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-base">add_card</span>
              <span>Top Up</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {orderInfo ? (
            <button
              type="button"
              onClick={() => {
                if (orderInfo.statusStep >= 3) {
                  setShowOrderHistoryPanel(true);
                } else {
                  onNavigate('order_tracking');
                }
              }}
              className="w-full text-left bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 rounded-2xl p-5 flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">
                    {orderInfo.statusStep >= 3 ? 'task_alt' : 'delivery_dining'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-950">
                    {orderInfo.statusStep >= 3
                      ? `Pesanan ${orderInfo.orderId} Telah Tiba di Tujuan (Selesai)`
                      : `Pesanan Aktif ${orderInfo.orderId}`}
                  </p>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    {orderInfo.statusStep >= 3
                      ? `Sudah masuk ke Riwayat Pesanan · ${orderInfo.itemsSummary}`
                      : `Estimasi tiba pukul ${orderInfo.estimatedTime} (${orderInfo.estimatedMinutes} menit) · ${orderInfo.itemsSummary}`}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-xl shrink-0">
                arrow_forward
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('category')}
              className="w-full text-left bg-gray-50 hover:bg-emerald-50/60 border border-gray-200/80 rounded-2xl p-5 flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#161d17]">Belum Ada Pesanan Aktif</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Tambahkan produk ke keranjang dan selesaikan checkout untuk melacak pengiriman.
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-xl shrink-0">
                arrow_forward
              </span>
            </button>
          )}

          <div className="bg-white rounded-2xl border border-gray-200/80 divide-y divide-gray-100 overflow-hidden">
            <button
              type="button"
              onClick={() => onNavigate('cart')}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <span className="material-symbols-outlined text-primary text-2xl">
                  shopping_cart
                </span>
                <div>
                  <p className="text-sm font-bold text-[#161d17]">Keranjang Belanja Aktif</p>
                  <p className="text-xs text-gray-500 mt-0.5 tabular-nums">
                    {cartCount} item siap untuk checkout
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 text-lg">chevron_right</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAddressModalOpen(true)}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                <div>
                  <p className="text-sm font-bold text-[#161d17]">Daftar Alamat Tersimpan</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Alamat aktif: {selectedAddress.title} ({savedAddresses.length} alamat tersimpan)
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 text-lg">chevron_right</span>
            </button>

            <button
              type="button"
              onClick={() => setShowOrderHistoryPanel(!showOrderHistoryPanel)}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <span className="material-symbols-outlined text-primary text-2xl">
                  receipt_long
                </span>
                <div>
                  <p className="text-sm font-bold text-[#161d17]">Riwayat Pesanan</p>
                  <p className="text-xs text-gray-500 mt-0.5 tabular-nums">
                    {completedOrders.length} pesanan dengan status selesai
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 text-lg">
                {showOrderHistoryPanel ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {showOrderHistoryPanel && (
              <div className="p-5 bg-gray-50/70 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Daftar Pesanan Selesai
                  </p>
                  <span className="text-xs font-semibold text-primary tabular-nums">
                    Total {completedOrders.length} transaksi
                  </span>
                </div>

                {completedOrders.length === 0 ? (
                  <p className="text-xs text-gray-500 py-4 text-center">
                    Belum ada riwayat pesanan yang selesai.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {completedOrders.map((order) => (
                      <div
                        key={order.orderId}
                        className="bg-white rounded-2xl border border-gray-200/80 p-4 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-100">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="font-bold text-[#161d17] tabular-nums">
                              {order.orderId}
                            </span>
                            <span aria-hidden="true" className="text-gray-300">·</span>
                            <span className="text-gray-500">{order.completedAt}</span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                            <span className="material-symbols-outlined text-sm material-symbols-fill">
                              check_circle
                            </span>
                            <span>{order.status}</span>
                          </span>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div
                              key={`${order.orderId}-${item.productId}`}
                              className="flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 rounded-lg object-cover bg-gray-50 border border-gray-100 shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="font-semibold text-[#161d17] truncate">
                                    {item.name}
                                  </p>
                                  <p className="text-[11px] text-gray-500 tabular-nums">
                                    {item.quantity}x · {item.unit}
                                  </p>
                                </div>
                              </div>
                              <span className="font-semibold text-gray-700 tabular-nums shrink-0">
                                Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs text-gray-500">
                            <span>{order.destinationTitle}</span>
                            <span aria-hidden="true" className="mx-1.5">·</span>
                            <span>{order.paymentMethod}</span>
                            <span aria-hidden="true" className="mx-1.5">·</span>
                            <span className="font-bold text-[#161d17] tabular-nums">
                              Total Rp{order.totalPrice.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => onReorder(order)}
                            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-colors cursor-pointer border border-emerald-200 hover:border-primary"
                          >
                            Pesan Lagi
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowHelpPanel(!showHelpPanel)}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <span className="material-symbols-outlined text-primary text-2xl">
                  support_agent
                </span>
                <div>
                  <p className="text-sm font-bold text-[#161d17]">Bantuan &amp; Layanan Pelanggan</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Hubungi tim layanan SigiMart untuk kendala pesanan
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 text-lg">
                {showHelpPanel ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {showHelpPanel && (
              <div className="p-5 bg-gray-50/70 text-sm text-gray-700 space-y-2">
                <p className="font-semibold text-[#161d17]">Layanan Pelanggan SigiMart</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Jika ada pertanyaan seputar kesegaran produk, pengembalian barang, atau status
                  pengiriman, hubungi WhatsApp resmi kami di{' '}
                  <span className="font-bold text-primary tabular-nums">0812-9876-5432</span>{' '}
                  atau email ke <span className="font-bold text-primary">layanan@sigimart.id</span>{' '}
                  (06:00 – 21:00 WIB setiap hari).
                </p>
              </div>
            )}
          </div>
        </div>
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

      {isTopUpModalOpen && (
        <TopUpModal
          currentBalance={sigiPayBalance}
          onTopUp={onTopUpSigiPay}
          onClose={() => setIsTopUpModalOpen(false)}
        />
      )}
    </div>
  );
};
