import { Product, Courier, OrderTrackingInfo, DeliveryAddress, CartItem, CompletedOrder } from '../types';

import bayamImg from '../assets/images/product_bayam_segar_1795444200715.jpg';
import wortelImg from '../assets/images/product_wortel_organik_1795444200697.jpg';
import tomatImg from '../assets/images/product_tomat_merah_1795444200228.jpg';
import brokoliImg from '../assets/images/product_brokoli_segar_1795444200468.jpg';
import apelImg from '../assets/images/product_apel_fuji_1795444200130.jpg';
import pisangImg from '../assets/images/product_pisang_kepok_1795444200272.jpg';
import jerukImg from '../assets/images/product_jeruk_mandarin_1795444200095.jpg';
import kentangImg from '../assets/images/product_kentang_1795444200849.jpg';
import bawangImg from '../assets/images/product_bawang_merah_1795444200786.jpg';
import cabaiImg from '../assets/images/product_cabai_merah_1795444289111.jpg';

import heroBannerImg from '../assets/images/hero_fresh_groceries_1795444289361.jpg';
import mapRouteImg from '../assets/images/delivery_route_map_1795444290239.jpg';
import courierAvatarImg from '../assets/images/courier_sigimart_avatar_1795444288389.jpg';

export const HERO_BANNER_IMAGE = heroBannerImg;
export const MAP_IMAGE_PATH = mapRouteImg;
export const COURIER_AVATAR_PATH = courierAvatarImg;

export const PRODUCTS: Product[] = [
  {
    id: 'bayam-segar',
    name: 'Bayam Segar',
    unit: '250g / ikat',
    price: 5000,
    stockText: 'Tersedia (32 ikat)',
    inStock: true,
    image: bayamImg,
    category: 'sayur',
    categoryLabel: 'Sayuran',
    origin: 'Kebun Mitra Bogor',
    description:
      'Bayam hijau segar yang dipetik setiap pagi dari kebun lokal. Daun lembut, bersih, dan kaya zat besi untuk sayur bening maupun tumisan sehat.',
    features: ['Panen Pagi', 'Daun Segar', 'Tanpa Pengawet'],
    isOrganic: true,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'wortel-organik',
    name: 'Wortel Organik',
    unit: '500g / pack',
    price: 8000,
    stockText: 'Tersedia (24 pack)',
    inStock: true,
    image: wortelImg,
    category: 'sayur',
    categoryLabel: 'Sayuran',
    origin: 'Dataran Tinggi Cipanas',
    description:
      'Wortel organik manis alami dengan tekstur renyah dan warna oranye cerah. Kaya beta-karoten dan Vitamin A untuk kebutuhan gizi keluarga.',
    features: ['Organik', 'Manis Alami', 'Sortir Grade A'],
    isOrganic: true,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'tomat-merah',
    name: 'Tomat Merah',
    unit: '500g / pack',
    price: 10000,
    stockText: 'Tersedia (28 pack)',
    inStock: true,
    image: tomatImg,
    category: 'sayur',
    categoryLabel: 'Sayuran',
    origin: 'Lembang, Bandung',
    description:
      'Tomat merah segar berdaging tebal dan berair dengan tingkat kematangan pas. Cocok untuk sambal, sup, tumisan, maupun jus segar.',
    features: ['Segar Matang Pohon', 'Daging Tebal', 'Kemasan Higienis'],
    isOrganic: false,
    isFeatured: false,
    isNew: true,
  },
  {
    id: 'brokoli-segar',
    name: 'Brokoli Segar',
    unit: '400g / bonggol',
    price: 12000,
    stockText: 'Tersedia (18 pcs)',
    inStock: true,
    image: brokoliImg,
    category: 'sayur',
    categoryLabel: 'Sayuran',
    origin: 'Pangalengan',
    description:
      'Brokoli hijau pekat dengan kuntum padat dan renyah. Kaya serat, vitamin C, dan antioksidan untuk menu diet sehat maupun masakan keluarga.',
    features: ['Kuntum Padat', 'Bebas Ulat', 'Vacuum Sealed'],
    isOrganic: true,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'apel-fuji',
    name: 'Apel Fuji',
    unit: '500g (3-4 buah)',
    price: 25000,
    stockText: 'Tersedia (20 pack)',
    inStock: true,
    image: apelImg,
    category: 'buah',
    categoryLabel: 'Buah-buahan',
    origin: 'Pilihan Import Premium',
    description:
      'Apel Fuji berkualitas tinggi dengan kulit merah merona, daging buah renyah berair, dan rasa manis menyegarkan di setiap gigitan.',
    features: ['Renyah & Manis', 'Grade Premium', 'Siap Santap'],
    isOrganic: false,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'pisang-kepok',
    name: 'Pisang Kepok',
    unit: '1 sisir (~1 kg)',
    price: 18000,
    stockText: 'Tersedia (15 sisir)',
    inStock: true,
    image: pisangImg,
    category: 'buah',
    categoryLabel: 'Buah-buahan',
    origin: 'Lampung Selatan',
    description:
      'Pisang kepok kuning matang sempurna dengan rasa manis pulen yang nikmat. Ideal dinikmati langsung atau diolah menjadi camilan hangat.',
    features: ['Kematangan Pas', 'Manis Pulen', 'Petik Kebun'],
    isOrganic: false,
    isFeatured: false,
    isNew: false,
  },
  {
    id: 'jeruk-mandarin',
    name: 'Jeruk Mandarin',
    unit: '500g (4-5 buah)',
    price: 20000,
    stockText: 'Tersedia (22 pack)',
    inStock: true,
    image: jerukImg,
    category: 'buah',
    categoryLabel: 'Buah-buahan',
    origin: 'Kebun Jeruk Pilihan',
    description:
      'Jeruk mandarin manis segar yang mudah dikupas dengan bulir air melimpah. Sumber Vitamin C alami untuk menjaga daya tahan tubuh.',
    features: ['Mudah Dikupas', 'Banyak Air', 'Kaya Vitamin C'],
    isOrganic: false,
    isFeatured: false,
    isNew: true,
  },
  {
    id: 'kentang',
    name: 'Kentang',
    unit: '1 kg / pack',
    price: 15000,
    stockText: 'Tersedia (40 kg)',
    inStock: true,
    image: kentangImg,
    category: 'umbi',
    categoryLabel: 'Umbi & Kentang',
    origin: 'Dataran Tinggi Dieng',
    description:
      'Kentang kuning Dieng berkualitas unggul berkulit bersih dan mulus. Bertekstur pulen saat direbus maupun digoreng.',
    features: ['Kualitas Dieng', 'Kulit Bersih', 'Pulen'],
    isOrganic: false,
    isFeatured: false,
    isNew: true,
  },
  {
    id: 'bawang-merah',
    name: 'Bawang Merah',
    unit: '500g / pack',
    price: 30000,
    stockText: 'Tersedia (30 pack)',
    inStock: true,
    image: bawangImg,
    category: 'bumbu',
    categoryLabel: 'Bumbu Dapur',
    origin: 'Brebes, Jawa Tengah',
    description:
      'Bawang merah Brebes pilihan beraroma harum kuat dengan umbi kering tahan simpan. Bumbu dasar wajib untuk segala hidangan nusantara.',
    features: ['Asli Brebes', 'Aroma Harum', 'Kering Tahan Lama'],
    isOrganic: false,
    isFeatured: false,
    isNew: false,
  },
  {
    id: 'cabai-merah',
    name: 'Cabai Merah',
    unit: '250g / pack',
    price: 22000,
    stockText: 'Tersedia (19 pack)',
    inStock: true,
    image: cabaiImg,
    category: 'bumbu',
    categoryLabel: 'Bumbu Dapur',
    origin: 'Garut, Jawa Barat',
    description:
      'Cabai merah segar mengkilap dengan tingkat kepedasan pas dan warna merah alami untuk sambal, balado, dan tumisan.',
    features: ['Pedas Mantap', 'Segar Mengkilap', 'Sortir Ketat'],
    isOrganic: false,
    isFeatured: false,
    isNew: true,
  },
];

export const INITIAL_SAVED_ADDRESSES: DeliveryAddress[] = [
  {
    title: 'Rumah (Utama)',
    recipientName: 'Haryadi Pratama',
    phone: '0812-3456-7890',
    detail: 'Jl. Kebon Jeruk No. 12, Jakarta Barat, 11530',
    notes: 'Rumah pagar hijau di sebelah taman',
    isPrimary: true,
  },
  {
    title: 'Apartemen Green Bay',
    recipientName: 'Haryadi Pratama',
    phone: '0812-3456-7890',
    detail: 'Apartemen Green Bay, Pluit, Tower B, No 12, Jakarta Utara',
    notes: 'Titip di resepsionis lobi Tower B',
    isPrimary: false,
  },
  {
    title: 'Kantor SigiTech Hub',
    recipientName: 'Haryadi Pratama',
    phone: '0812-3456-7890',
    detail: 'Gedung Wisma Niaga Lt. 8, Sudirman, Jakarta Selatan, 12190',
    notes: 'Hubungi saat tiba di drop-off lobi utama',
    isPrimary: false,
  },
];

export const DEFAULT_COURIER: Courier = {
  name: 'Ahmad Hidayat',
  role: 'Kurir SigiMart',
  rating: 4.9,
  vehicle: 'Honda Vario',
  plateNumber: 'B 1234 SGM',
  avatar: courierAvatarImg,
  phone: '0812-9876-5432',
};

export const INITIAL_CART_ITEMS: CartItem[] = [];

export const INITIAL_ORDER_TRACKING: OrderTrackingInfo = {
  orderId: 'ID #SG-99201',
  estimatedTime: '12:45',
  estimatedMinutes: 12,
  statusStep: 2,
  destinationTitle: INITIAL_SAVED_ADDRESSES[1].title,
  destinationAddress: INITIAL_SAVED_ADDRESSES[1].detail,
  recipientName: INITIAL_SAVED_ADDRESSES[1].recipientName,
  recipientPhone: INITIAL_SAVED_ADDRESSES[1].phone,
  paymentMethod: 'OVO',
  itemsSummary: 'Bayam Segar, Wortel Organik, Apel Fuji',
  items: [
    {
      productId: PRODUCTS[0].id,
      name: PRODUCTS[0].name,
      unit: PRODUCTS[0].unit,
      quantity: 2,
      price: PRODUCTS[0].price,
      image: PRODUCTS[0].image,
    },
    {
      productId: PRODUCTS[1].id,
      name: PRODUCTS[1].name,
      unit: PRODUCTS[1].unit,
      quantity: 1,
      price: PRODUCTS[1].price,
      image: PRODUCTS[1].image,
    },
    {
      productId: PRODUCTS[4].id,
      name: PRODUCTS[4].name,
      unit: PRODUCTS[4].unit,
      quantity: 1,
      price: PRODUCTS[4].price,
      image: PRODUCTS[4].image,
    },
  ],
  totalPrice: 48000,
  courier: DEFAULT_COURIER,
};

export const COMPLETED_ORDERS: CompletedOrder[] = [];

