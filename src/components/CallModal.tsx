import React, { useState, useEffect } from 'react';
import { Courier } from '../types';

interface CallModalProps {
  courier: Courier;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ courier, onClose }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#161d17] text-white w-full max-w-sm rounded-3xl p-6 flex flex-col items-center justify-between min-h-[460px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Glow */}
        <div className="absolute top-1/4 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="text-center pt-4 z-10">
          <p className="text-xs text-emerald-400 tracking-wider uppercase font-semibold">
            Panggilan Suara SigiMart
          </p>
          <h3 className="text-xl font-bold mt-2">{courier.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{courier.role} • {courier.phone}</p>
          <p className="text-sm font-mono mt-3 text-emerald-300 bg-white/10 px-3 py-1 rounded-full inline-block">
            {formatTime(callDuration)}
          </p>
        </div>

        {/* Avatar */}
        <div className="relative my-6 z-10">
          <div className="w-28 h-28 rounded-full border-4 border-emerald-500 overflow-hidden shadow-xl ring-8 ring-emerald-500/20">
            <img src={courier.avatar} alt={courier.name} className="w-full h-full object-cover" />
          </div>
          <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-[#161d17]">
            <span className="material-symbols-outlined text-white text-xs material-symbols-fill">call</span>
          </span>
        </div>

        {/* Controls */}
        <div className="w-full space-y-6 z-10 pb-4">
          <div className="flex justify-around items-center px-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isMuted ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <span className="material-symbols-outlined">{isMuted ? 'mic_off' : 'mic'}</span>
            </button>
            <button
              onClick={() => setIsSpeaker(!isSpeaker)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isSpeaker ? 'bg-emerald-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <span className="material-symbols-outlined">{isSpeaker ? 'volume_up' : 'volume_down'}</span>
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-3xl">call_end</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
