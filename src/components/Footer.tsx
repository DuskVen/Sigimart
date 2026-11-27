import React from 'react';
import { ScreenType } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-extrabold tracking-tight text-primary cursor-pointer"
            >
              SigiMart
            </button>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              Belanja sayur, buah, dan bumbu dapur segar langsung dari petani lokal dengan pengiriman cepat ke rumah Anda.
            </p>
            <p className="text-xs text-gray-500">
              Jam Operasional: Setiap Hari, 06:00 – 21:00 WIB
            </p>
          </div>

          <div className="md:justify-self-end">
            <h4 className="text-sm font-bold text-[#161d17] mb-4">Hubungi Toko</h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                  location_on
                </span>
                <span>Gudang Pusat SigiMart, Jl. Pasar Segar No. 88, Jakarta Barat 11530</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-lg shrink-0">
                  call
                </span>
                <span className="tabular-nums">(021) 5580-9912 / 0812-9876-5432</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-lg shrink-0">
                  mail
                </span>
                <span>layanan@sigimart.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 SigiMart – Grocery Marketplace Segar. Seluruh hak cipta dilindungi.</p>
          <p>Jaminan Sayur &amp; Buah Segar Setiap Hari</p>
        </div>
      </div>
    </footer>
  );
};
