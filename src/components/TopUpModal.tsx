import React, { useState } from 'react';

interface TopUpModalProps {
  currentBalance: number;
  onTopUp: (amount: number, method: string) => void;
  onClose: () => void;
}

const PRESET_AMOUNTS = [25000, 50000, 100000, 250000, 500000, 1000000];

const TOPUP_METHODS = [
  { id: 'BCA Virtual Account', label: 'BCA Virtual Account', subtitle: 'Bebas biaya admin' },
  { id: 'Mandiri Virtual Account', label: 'Mandiri Virtual Account', subtitle: 'Proses instan' },
  { id: 'Transfer Bank BRI / BNI', label: 'Transfer Bank BRI / BNI', subtitle: 'Verifikasi otomatis' },
  { id: 'Minimarket (Alfamart / Indomaret)', label: 'Alfamart / Indomaret', subtitle: 'Bayar di kasir' },
];

export const TopUpModal: React.FC<TopUpModalProps> = ({
  currentBalance,
  onTopUp,
  onClose,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customInput, setCustomInput] = useState<string>('100000');
  const [selectedMethod, setSelectedMethod] = useState<string>(TOPUP_METHODS[0].id);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount);
    setCustomInput(String(amount));
    setErrorMessage('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    setCustomInput(rawDigits);
    const parsed = rawDigits ? parseInt(rawDigits, 10) : 0;
    setSelectedAmount(parsed);
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAmount || selectedAmount < 10000) {
      setErrorMessage('Minimal nominal top up saldo Sigi-Pay adalah Rp10.000.');
      return;
    }
    if (selectedAmount > 10000000) {
      setErrorMessage('Maksimal nominal top up sekali transaksi adalah Rp10.000.000.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onTopUp(selectedAmount, selectedMethod);
      onClose();
    }, 600);
  };

  const projectedBalance = currentBalance + (selectedAmount > 0 ? selectedAmount : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#161d17]">Top Up Saldo Sigi-Pay</h3>
              <p className="text-xs text-gray-500">
                Saldo saat ini:{' '}
                <span className="font-bold text-primary tabular-nums">
                  Rp{currentBalance.toLocaleString('id-ID')}
                </span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal top up"
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Pilih Nominal Top Up
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {PRESET_AMOUNTS.map((amount) => {
                const isSelected = selectedAmount === amount;
                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleSelectPreset(amount)}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold tabular-nums transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-emerald-50 text-primary ring-2 ring-primary/15'
                        : 'border-gray-200 bg-white text-[#161d17] hover:border-emerald-300'
                    }`}
                  >
                    Rp{amount.toLocaleString('id-ID')}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Atau Masukkan Nominal Lain (Min. Rp10.000)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-sm font-bold text-gray-500">Rp</span>
              <input
                type="text"
                inputMode="numeric"
                value={customInput ? parseInt(customInput, 10).toLocaleString('id-ID') : ''}
                onChange={handleCustomChange}
                placeholder="0"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#161d17] tabular-nums focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Metode Pembayaran Top Up
            </label>
            <div className="space-y-2">
              {TOPUP_METHODS.map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-emerald-50/70'
                        : 'border-gray-200 bg-white hover:border-emerald-200'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-[#161d17]">{method.label}</p>
                      <p className="text-xs text-gray-500">{method.subtitle}</p>
                    </div>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-primary' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Nominal Top Up</span>
              <span className="font-bold text-[#161d17] tabular-nums">
                Rp{(selectedAmount > 0 ? selectedAmount : 0).toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Biaya Admin</span>
              <span className="font-semibold text-primary">Gratis</span>
            </div>
            <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between items-center">
              <span className="font-bold text-gray-700">Estimasi Saldo Setelah Top Up</span>
              <span className="text-sm font-extrabold text-primary tabular-nums">
                Rp{projectedBalance.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-emerald-800 disabled:opacity-60 text-white text-sm font-bold cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-base">
                    progress_activity
                  </span>
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Top Up Sekarang</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
