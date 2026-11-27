import React, { useState, useEffect } from 'react';
import { OrderTrackingInfo, ScreenType } from '../types';
import { MAP_IMAGE_PATH } from '../data/mockData';
import { ChatModal } from './ChatModal';
import { CallModal } from './CallModal';

interface OrderTrackingScreenProps {
  orderInfo: OrderTrackingInfo | null;
  onUpdateOrderStep: (stepIndex: number) => void;
  onOpenOrderHistory: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  orderInfo,
  onUpdateOrderStep,
  onOpenOrderHistory,
  onNavigate,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState(orderInfo?.estimatedMinutes ?? 0);
  const [mapCenteredToast, setMapCenteredToast] = useState(false);

  const currentStep = orderInfo?.statusStep ?? 0;
  const isArrived = !orderInfo || currentStep >= 3;

  useEffect(() => {
    if (orderInfo) {
      setMinutesLeft(orderInfo.estimatedMinutes);
    }
  }, [orderInfo]);

  useEffect(() => {
    if (isArrived) return;
    const interval = setInterval(() => {
      setMinutesLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 45000);
    return () => clearInterval(interval);
  }, [isArrived]);

  if (!orderInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d17]">
              Lacak Pesanan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Pantau status pengemasan dan posisi kurir pengiriman bahan segar Anda secara langsung.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-10 sm:p-14 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-4xl">receipt_long</span>
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h2 className="text-lg font-extrabold text-[#161d17]">
              Belum Ada Pesanan Aktif
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Anda belum memiliki transaksi pengiriman saat ini. Tambahkan produk ke keranjang dan lakukan checkout untuk melacak pesanan Anda di sini.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('category')}
              className="px-6 py-2.5 bg-primary hover:bg-emerald-800 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              Jelajahi Katalog Produk
            </button>
            <button
              type="button"
              onClick={() => onNavigate('cart')}
              className="px-6 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-primary border border-emerald-200 rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              Buka Keranjang
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { label: 'Pesanan Diterima', desc: 'Pesanan Anda telah masuk ke sistem SigiMart.', icon: 'check_circle' },
    { label: 'Sedang Diproses', desc: 'Sayur & buah sedang disortir dan dikemas higienis.', icon: 'inventory_2' },
    { label: 'Sedang Dikirim', desc: 'Kurir sedang dalam perjalanan menuju alamat Anda.', icon: 'delivery_dining' },
    { label: 'Tiba di Tujuan', desc: 'Pesanan telah sampai di lokasi penerima.', icon: 'home' },
  ];

  const progressWidth = `${Math.min(100, Math.max(15, ((currentStep + 1) / steps.length) * 100))}%`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d17]">
              Lacak Pesanan
            </h1>
            <span className="text-sm font-bold text-primary bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg tabular-nums">
              {orderInfo.orderId}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Pantau status pengemasan dan posisi kurir pengiriman bahan segar Anda secara langsung.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('category')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-lg">shopping_bag</span>
          <span>Belanja Lagi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-gray-200/80 bg-emerald-950 shadow-xs">
            <img
              src={MAP_IMAGE_PATH}
              alt="Peta rute pengiriman SigiMart"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div className="bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-md border border-white/70 pointer-events-auto">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    {isArrived ? 'Status Pengiriman' : 'Estimasi Tiba'}
                  </p>
                  <p className="text-2xl font-extrabold text-primary tabular-nums flex items-baseline gap-2 mt-0.5">
                    <span>{isArrived ? 'Sudah Tiba' : orderInfo.estimatedTime}</span>
                    {!isArrived && (
                      <span className="text-xs font-medium text-gray-600">
                        ({minutesLeft} menit lagi)
                      </span>
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMapCenteredToast(true);
                    setTimeout(() => setMapCenteredToast(false), 2000);
                  }}
                  title="Pusatkan Lokasi Kurir"
                  className="bg-white/95 hover:bg-white w-11 h-11 rounded-xl shadow-md border border-white/70 pointer-events-auto flex items-center justify-center text-[#161d17] cursor-pointer active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-xl">my_location</span>
                </button>
              </div>

              {mapCenteredToast && (
                <div className="self-center bg-[#161d17]/90 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg">
                  Posisi kurir dipusatkan pada peta rute pengiriman
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#161d17]">Ringkasan Pesanan</h2>
              <button
                type="button"
                onClick={() => setShowDetailModal(true)}
                className="text-sm font-semibold text-primary hover:underline cursor-pointer"
              >
                Lihat Rincian Transaksi
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-1">
                <p className="text-xs font-semibold text-gray-500">Penerima &amp; Tujuan</p>
                <p className="text-sm font-bold text-[#161d17]">
                  {orderInfo.recipientName} · {orderInfo.recipientPhone}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {orderInfo.destinationAddress}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-1">
                <p className="text-xs font-semibold text-gray-500">Daftar Barang &amp; Pembayaran</p>
                <p className="text-sm font-semibold text-[#161d17] line-clamp-2">
                  {orderInfo.itemsSummary}
                </p>
                <p className="text-sm font-extrabold text-primary tabular-nums pt-1">
                  Total: Rp{orderInfo.totalPrice.toLocaleString('id-ID')} ({orderInfo.paymentMethod})
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#161d17]">Status Pengiriman</h2>
              <span className="text-xs font-semibold text-emerald-700">
                Tahap {currentStep + 1} dari {steps.length}
              </span>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-fresh-leaf transition-all duration-500 rounded-full"
                style={{ width: progressWidth }}
              />
            </div>

            <div className="space-y-3 pt-1">
              {steps.map((step, index) => {
                const isPassed = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onUpdateOrderStep(index)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : isPassed
                        ? 'bg-white border-gray-200'
                        : 'bg-gray-50/60 border-gray-100 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isPassed || isCurrent
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-lg ${
                          isPassed ? 'material-symbols-fill' : ''
                        }`}
                      >
                        {step.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-bold ${
                          isPassed || isCurrent ? 'text-[#161d17]' : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {!isArrived ? (
              <button
                type="button"
                onClick={() => onUpdateOrderStep(3)}
                className="w-full h-11 rounded-xl bg-primary hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">task_alt</span>
                <span>Tandai Pesanan Tiba di Tujuan</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-xl material-symbols-fill shrink-0">
                    check_circle
                  </span>
                  <div>
                    <p className="text-xs font-bold text-emerald-950">
                      Pesanan Selesai &amp; Tiba di Tujuan
                    </p>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Pesanan ini telah otomatis dimasukkan ke Riwayat Pesanan sebagai pesanan selesai.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenOrderHistory}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-emerald-100/70 text-primary border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Lihat di Riwayat Pesanan
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-4">
            <h2 className="text-base font-bold text-[#161d17]">Kurir Pengantar</h2>

            <div className="flex items-center gap-4">
              <img
                src={orderInfo.courier.avatar}
                alt={orderInfo.courier.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border border-gray-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-[#161d17] truncate">
                  {orderInfo.courier.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {orderInfo.courier.role} · Rating{' '}
                  <span className="font-bold text-primary tabular-nums">
                    {orderInfo.courier.rating} ★
                  </span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {orderInfo.courier.vehicle} · {orderInfo.courier.plateNumber}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="h-11 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-primary font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer border border-emerald-200"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                <span>Chat Kurir</span>
              </button>
              <button
                type="button"
                onClick={() => setIsCallOpen(true)}
                className="h-11 rounded-xl bg-primary hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">call</span>
                <span>Telepon</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-[#161d17]">
                Rincian Transaksi {orderInfo.orderId}
              </h3>
              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span>Penerima</span>
                <span className="font-semibold text-[#161d17]">{orderInfo.recipientName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span>Metode Pembayaran</span>
                <span className="font-semibold text-[#161d17]">{orderInfo.paymentMethod}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span>Ongkos Kirim Kilat</span>
                <span className="font-semibold text-emerald-700">Rp10.000 (Diskon Rp5.000)</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-base text-[#161d17]">
                <span>Total Biaya</span>
                <span className="text-primary tabular-nums">
                  Rp{orderInfo.totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowDetailModal(false)}
              className="w-full py-2.5 bg-primary hover:bg-emerald-800 text-white rounded-xl font-bold text-sm cursor-pointer transition-colors"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      )}

      {isChatOpen && (
        <ChatModal courier={orderInfo.courier} onClose={() => setIsChatOpen(false)} />
      )}
      {isCallOpen && (
        <CallModal courier={orderInfo.courier} onClose={() => setIsCallOpen(false)} />
      )}
    </div>
  );
};
