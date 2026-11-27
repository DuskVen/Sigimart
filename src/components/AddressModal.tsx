import React, { useState } from 'react';
import { DeliveryAddress } from '../types';

interface AddressModalProps {
  currentAddress: DeliveryAddress;
  savedAddresses: DeliveryAddress[];
  onSelectAddress: (addr: DeliveryAddress) => void;
  onAddAddress: (addr: DeliveryAddress) => void;
  onClose: () => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  currentAddress,
  savedAddresses,
  onSelectAddress,
  onAddAddress,
  onClose,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [title, setTitle] = useState('');
  const [recipientName, setRecipientName] = useState(currentAddress.recipientName);
  const [phone, setPhone] = useState(currentAddress.phone);
  const [detail, setDetail] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !recipientName.trim() || !phone.trim() || !detail.trim()) {
      setFormError('Mohon lengkapi label alamat, nama penerima, nomor telepon, dan alamat lengkap.');
      return;
    }
    const newAddr: DeliveryAddress = {
      title: title.trim(),
      recipientName: recipientName.trim(),
      phone: phone.trim(),
      detail: detail.trim(),
      notes: notes.trim(),
      isPrimary: false,
    };
    onAddAddress(newAddr);
    onSelectAddress(newAddr);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
          <h3 className="font-bold text-lg text-[#161d17]">
            {isAddingNew ? 'Formulir Informasi Pelanggan & Alamat' : 'Pilih Alamat Pengiriman'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {!isAddingNew ? (
          <>
            <div className="space-y-3 mb-5">
              {savedAddresses.map((addr, idx) => {
                const isSelected =
                  currentAddress.title === addr.title && currentAddress.detail === addr.detail;
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      onSelectAddress(addr);
                      onClose();
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-primary bg-emerald-50/60 ring-2 ring-primary/15'
                        : 'border-gray-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div
                      className={`mt-0.5 p-2 rounded-xl shrink-0 ${
                        isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">location_on</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-[#161d17]">{addr.title}</p>
                        {addr.isPrimary && (
                          <span className="text-xs font-semibold text-primary">· Utama</span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-gray-700 mt-0.5">
                        {addr.recipientName} ({addr.phone})
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{addr.detail}</p>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-primary text-xl material-symbols-fill shrink-0">
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsAddingNew(true)}
              className="w-full py-3 rounded-xl border border-dashed border-primary text-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">add_location_alt</span>
              Tambah Alamat &amp; Info Pelanggan Baru
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmitNew} className="space-y-4">
            {formError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Label Alamat
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Rumah Orang Tua, Kosan, Kantor"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Nama lengkap penerima"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Alamat Lengkap Pengiriman
              </label>
              <textarea
                rows={3}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Nama jalan, nomor rumah/gedung, kecamatan, kode pos"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Catatan untuk Kurir (Opsional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: Pagar warna hijau, titip di pos satpam"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setFormError('');
                }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-emerald-800 text-white text-sm font-semibold cursor-pointer transition-colors"
              >
                Simpan &amp; Pilih Alamat
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
