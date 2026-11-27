export type ScreenType =
  | 'home'
  | 'category'
  | 'product_detail'
  | 'cart'
  | 'order_tracking'
  | 'profile';

export type ProductCategory = 'sayur' | 'buah' | 'umbi' | 'bumbu';

export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  promoBadge?: string;
  stockText: string;
  inStock: boolean;
  image: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  origin: string;
  features: string[];
  isOrganic?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Courier {
  name: string;
  role: string;
  rating: number;
  vehicle: string;
  plateNumber: string;
  avatar: string;
  phone: string;
}

export interface DeliveryAddress {
  title: string;
  recipientName: string;
  phone: string;
  detail: string;
  notes?: string;
  isPrimary?: boolean;
}

export interface CompletedOrderItem {
  productId: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderTrackingInfo {
  orderId: string;
  estimatedTime: string;
  estimatedMinutes: number;
  statusStep: number;
  destinationTitle: string;
  destinationAddress: string;
  recipientName: string;
  recipientPhone: string;
  paymentMethod: string;
  itemsSummary: string;
  items: CompletedOrderItem[];
  totalPrice: number;
  courier: Courier;
}

export interface CompletedOrder {
  orderId: string;
  completedAt: string;
  status: 'Selesai';
  paymentMethod: string;
  destinationTitle: string;
  totalPrice: number;
  items: CompletedOrderItem[];
}

