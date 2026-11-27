import React, { useState } from 'react';
import { Courier } from '../types';

interface ChatModalProps {
  courier: Courier;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ courier, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'courier' | 'user'; text: string; time: string }>>([
    { sender: 'courier', text: 'Halo kak! Pesanan sayur & buah SigiMart sudah saya ambil di gudang pusat.', time: '12:35' },
    { sender: 'courier', text: 'Sekarang dalam perjalanan menuju Apartemen Green Bay ya.', time: '12:36' },
    { sender: 'user', text: 'Terima kasih Mas Ahmad! Tolong nanti titipkan di lobi Tower B ya.', time: '12:38' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg = { sender: 'user' as const, text: inputValue, time: timeStr };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');

    // Simulated quick friendly reply from courier
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'courier',
          text: 'Siap kak, 5 menit lagi saya sampai di lobi Tower B!',
          time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes() + 1).padStart(2, '0')}`
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-white w-full max-w-md h-[80vh] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden border border-gray-100 animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={courier.avatar}
                alt={courier.name}
                className="w-10 h-10 rounded-full object-cover border border-emerald-500"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#161d17]">{courier.name}</h3>
              <p className="text-xs text-gray-400">{courier.vehicle} • {courier.plateNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFB]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-br-none shadow-xs'
                    : 'bg-white text-[#161d17] border border-gray-100 rounded-bl-none shadow-xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Quick suggestions */}
        <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
          {['Tolong titip satpam', 'Saya di lobi', 'Bisa tolong buruan?'].map((quickText, i) => (
            <button
              key={i}
              onClick={() => {
                setInputValue(quickText);
              }}
              className="text-[11px] bg-emerald-50 text-primary px-3 py-1 rounded-full whitespace-nowrap border border-emerald-100 hover:bg-emerald-100 transition-colors"
            >
              {quickText}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tulis pesan ke kurir..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-primary"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="w-9 h-9 rounded-full bg-primary disabled:opacity-50 text-white flex items-center justify-center transition-transform active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
