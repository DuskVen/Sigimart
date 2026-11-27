import { useState } from 'react';
import {
  ScreenType,
  Product,
  CartItem,
  OrderTrackingInfo,
  DeliveryAddress,
  CompletedOrder,
} from './types';
import {
  PRODUCTS,
  INITIAL_CART_ITEMS,
  DEFAULT_COURIER,
  INITIAL_SAVED_ADDRESSES,
  COMPLETED_ORDERS,
} from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { CategoryScreen } from './components/CategoryScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CartScreen } from './components/CartScreen';
import { OrderTrackingScreen } from './components/OrderTrackingScreen';
import { ProfileScreen } from './components/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('category');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [savedAddresses, setSavedAddresses] = useState<DeliveryAddress[]>(INITIAL_SAVED_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<DeliveryAddress>(
    INITIAL_SAVED_ADDRESSES[0]
  );
  const [orderInfo, setOrderInfo] = useState<OrderTrackingInfo | null>(null);
  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>(COMPLETED_ORDERS);
  const [openOrderHistoryOnProfile, setOpenOrderHistoryOnProfile] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sigiPayBalance, setSigiPayBalance] = useState<number>(150000);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const navigateTo = (screen: ScreenType) => {
    if (screen !== 'profile') {
      setOpenOrderHistoryOnProfile(false);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${quantity}x ${product.name} ditambahkan ke keranjang`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    const removed = cartItems.find((item) => item.product.id === productId);
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    if (removed) {
      showToast(`${removed.product.name} dihapus dari keranjang`);
    }
  };

  const handleAddAddress = (addr: DeliveryAddress) => {
    setSavedAddresses((prev) => [...prev, addr]);
    showToast(`Alamat "${addr.title}" berhasil disimpan`);
  };

  const handleTopUpSigiPay = (amount: number, method: string) => {
    setSigiPayBalance((prev) => prev + amount);
    showToast(`Top up Sigi-Pay Rp${amount.toLocaleString('id-ID')} via ${method} berhasil!`);
  };

  const handleReorder = (order: CompletedOrder) => {
    setCartItems((prev) => {
      const updated = [...prev];
      for (const orderItem of order.items) {
        const product = PRODUCTS.find((p) => p.id === orderItem.productId);
        if (!product) continue;
        const existingIdx = updated.findIndex((c) => c.product.id === product.id);
        if (existingIdx >= 0) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + orderItem.quantity,
          };
        } else {
          updated.push({ product, quantity: orderItem.quantity });
        }
      }
      return updated;
    });
    showToast(`Produk dari ${order.orderId} ditambahkan ke keranjang`);
    navigateTo('cart');
  };

  const handleUpdateOrderStep = (stepIndex: number) => {
    if (!orderInfo) return;
    setOrderInfo((prev) =>
      prev
        ? {
            ...prev,
            statusStep: stepIndex,
          }
        : null
    );

    if (stepIndex === 3) {
      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const completedAt = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} · ${String(
        now.getHours()
      ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

      setCompletedOrders((prev) => {
        if (prev.some((o) => o.orderId === orderInfo.orderId)) {
          return prev;
        }
        const finishedOrder: CompletedOrder = {
          orderId: orderInfo.orderId,
          completedAt,
          status: 'Selesai',
          paymentMethod: orderInfo.paymentMethod,
          destinationTitle: orderInfo.destinationTitle,
          totalPrice: orderInfo.totalPrice,
          items: orderInfo.items,
        };
        return [finishedOrder, ...prev];
      });

      showToast(
        `Pesanan ${orderInfo.orderId} tiba di tujuan & masuk Riwayat Pesanan (Selesai)`
      );
    } else {
      setCompletedOrders((prev) => prev.filter((o) => o.orderId !== orderInfo.orderId));
    }
  };

  const handleCheckoutSuccess = (paymentMethod: string, grandTotal: number) => {
    const newOrderId = `ID #SG-${Math.floor(10000 + Math.random() * 90000)}`;
    const itemsSummary =
      cartItems.map((c) => `${c.product.name} (${c.quantity})`).join(', ') ||
      'Paket Sayur Segar SigiMart';
    const orderItems = cartItems.map((c) => ({
      productId: c.product.id,
      name: c.product.name,
      unit: c.product.unit,
      quantity: c.quantity,
      price: c.product.price,
      image: c.product.image,
    }));

    const now = new Date();
    const arrival = new Date(now.getTime() + 15 * 60000);
    const estimatedTime = `${String(arrival.getHours()).padStart(2, '0')}:${String(
      arrival.getMinutes()
    ).padStart(2, '0')}`;

    setOrderInfo({
      orderId: newOrderId,
      statusStep: 1,
      estimatedMinutes: 15,
      estimatedTime,
      destinationTitle: selectedAddress.title,
      destinationAddress: selectedAddress.detail,
      recipientName: selectedAddress.recipientName,
      recipientPhone: selectedAddress.phone,
      paymentMethod,
      itemsSummary,
      items: orderItems,
      totalPrice: grandTotal,
      courier: DEFAULT_COURIER,
    });
    if (paymentMethod === 'SIGI-pay') {
      setSigiPayBalance((prev) => Math.max(0, prev - grandTotal));
    }
    setCartItems([]);
    showToast(
      paymentMethod === 'SIGI-pay'
        ? `Pesanan ${newOrderId} berhasil dibuat! Saldo SIGI-pay terpotong Rp${grandTotal.toLocaleString('id-ID')}.`
        : `Pesanan ${newOrderId} berhasil dibuat!`
    );
  };

  const handleSelectProduct = (product: Product) => {
    setPreviousScreen(currentScreen === 'product_detail' ? previousScreen : currentScreen);
    setSelectedProduct(product);
    navigateTo('product_detail');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] text-[#161d17]">
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => {
          setCategoryFilter('Semua');
          navigateTo('category');
        }}
      />

      {toastMessage && (
        <div className="fixed top-22 right-6 z-50 bg-primary text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-emerald-500/40">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 w-full">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectCategoryFilter={(cat) => setCategoryFilter(cat)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {currentScreen === 'category' && (
          <CategoryScreen
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            activeCategory={categoryFilter}
            onCategoryChange={setCategoryFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {currentScreen === 'product_detail' && (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={() =>
              navigateTo(previousScreen === 'product_detail' ? 'category' : previousScreen)
            }
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'cart' && (
          <CartScreen
            cartItems={cartItems}
            savedAddresses={savedAddresses}
            selectedAddress={selectedAddress}
            sigiPayBalance={sigiPayBalance}
            onSelectAddress={setSelectedAddress}
            onAddAddress={handleAddAddress}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={navigateTo}
            onCheckoutSuccess={handleCheckoutSuccess}
          />
        )}

        {currentScreen === 'order_tracking' && (
          <OrderTrackingScreen
            orderInfo={orderInfo}
            onUpdateOrderStep={handleUpdateOrderStep}
            onOpenOrderHistory={() => {
              setOpenOrderHistoryOnProfile(true);
              setCurrentScreen('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            onNavigate={navigateTo}
            cartCount={totalCartCount}
            orderInfo={orderInfo}
            completedOrders={completedOrders}
            defaultOpenOrderHistory={openOrderHistoryOnProfile}
            onReorder={handleReorder}
            savedAddresses={savedAddresses}
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddress}
            onAddAddress={handleAddAddress}
            sigiPayBalance={sigiPayBalance}
            onTopUpSigiPay={handleTopUpSigiPay}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
