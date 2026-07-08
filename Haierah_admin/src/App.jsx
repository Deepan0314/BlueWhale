import React, { useState, useEffect } from 'react';
import Login from "./Pages/Login";
import {
  LayoutDashboard,
  Shirt,
  Tags,
  ShoppingCart,
  Users,
  Warehouse,
  Layout,
  Percent,
  LineChart,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Bell,
  Sparkles,
  CheckCircle,
  Play,
  UserCheck
} from 'lucide-react';

// Data stores
import { loadInitialState, saveState, simulateNewOrder } from './utils/store.js';

// Custom designed Views
import { DashboardView } from './components/DashboardView.jsx';
import { ProductsView } from './components/ProductsView.jsx';
import { OrdersView } from './components/OrdersView.jsx';
import { CMSView } from './components/CMSView.jsx';
import {
  CategoriesView,
  CustomersView,
  InventoryView,
  CouponsView,
  AnalyticsView,
  SettingsView
} from './components/OtherViews.jsx';

export default function App() {
  // 1. DYNAMIC STORE STATE
  const [state, setState] = useState(() => loadInitialState());
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  // App Notifications
  const [notifications, setNotifications] = useState([
    { id: '1', text: 'Premium Cashmere Sweater stock level critical (≤ 2 left)', time: '3m ago', read: false },
    { id: '2', text: 'Fulfillment queue complete for Batch OR-1845', time: '1h ago', read: true }
  ]);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  
  // Real-time toast for simulated checkout events
  const [toast, setToast] = useState(null);
  useEffect(() => {
  const token = sessionStorage.getItem("adminToken");

  if (token) {
    setIsAdminLoggedIn(true);
  }
}, []);
  // 2. SAVE STATE LOCALLY UPON UPDATES
  useEffect(() => {
    saveState(state);
  }, [state]);

  // 3. MUTATOR OPERATIONS FOR CRUD SECTIONS

  // --- PRODUCTS ---
  const handleAddProduct = (prod) => {
    setState(prev => ({
      ...prev,
      products: [prod, ...prev.products]
    }));
    triggerToast(`Listing introduced: ${prod.name}`);
  };

  const handleUpdateProduct = (prod) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === prod.id ? prod : p)
    }));
  };

  const handleDeleteProduct = (id) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  // --- CATEGORIES ---
  const handleAddCategory = (cat) => {
    setState(prev => ({
      ...prev,
      categories: [...prev.categories, cat]
    }));
  };

  const handleUpdateCategory = (cat) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.map(c => c.id === cat.id ? cat : c)
    }));
  };

  const handleDeleteCategory = (id) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id)
    }));
  };

  // --- ORDERS ---
  const handleUpdateOrderStatus = (orderId, newStatus, newPaymentStatus) => {
    setState(prev => {
      const order = prev.orders.find(o => o.id === orderId);
      if (!order) return prev;

      // Handle stock return if order is cancelled
      let updatedProducts = [...prev.products];
      if (newStatus === 'Cancelled' && order.status !== 'Cancelled') {
        // Return quantities back to stock piles
        updatedProducts = prev.products.map(p => {
          const itemInCancelled = order.items.find(it => it.productId === p.id);
          if (itemInCancelled) {
            return { ...p, stock: p.stock + itemInCancelled.quantity };
          }
          return p;
        });
      } else if (order.status === 'Cancelled' && newStatus !== 'Cancelled') {
        // Rededuct if restored from cancel
        updatedProducts = prev.products.map(p => {
          const itemInCancelled = order.items.find(it => it.productId === p.id);
          if (itemInCancelled) {
            return { ...p, stock: Math.max(0, p.stock - itemInCancelled.quantity) };
          }
          return p;
        });
      }

      return {
        ...prev,
        products: updatedProducts,
        orders: prev.orders.map(o => o.id === orderId ? { ...o, status: newStatus, paymentStatus: newPaymentStatus } : o)
      };
    });
    triggerToast(`Order status updated to ${newStatus}`);
  };

  // --- CUSTOMERS ---
  const handleToggleCustomerStatus = (id) => {
    setState(prev => ({
      ...prev,
      customers: prev.customers.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Suspended' : 'Active' } : c)
    }));
  };

  // --- INVENTORY ---
  const handleQuickRestock = (id, amount) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + amount) } : p)
    }));
  };

  // --- CMS ---
  const handleUpdateCMS = (updatedSections) => {
    setState(prev => ({
      ...prev,
      cms: updatedSections
    }));
  };

  // --- COUPONS ---
  const handleAddCoupon = (cp) => {
    setState(prev => ({
      ...prev,
      coupons: [cp, ...prev.coupons]
    }));
  };

  const handleToggleCoupon = (id) => {
    setState(prev => ({
      ...prev,
      coupons: prev.coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c)
    }));
  };

  const handleDeleteCoupon = (id) => {
    setState(prev => ({
      ...prev,
      coupons: prev.coupons.filter(c => c.id !== id)
    }));
  };

  // --- SETTINGS ---
  const handleUpdateSettings = (sets) => {
    setState(prev => ({
      ...prev,
      settings: sets
    }));
  };


  // 4. REAL-TIME SELLING SIMULATOR ENGINE (Automatic stock levels deduction)
  const handleSimulateSale = () => {
    if (state.customers.length === 0 || state.products.length === 0) {
      alert('Sandbox holds no customer profiles or garments listings to process checkout.');
      return;
    }

    // Pick 1 random active customer
    const activeCustomers = state.customers.filter(c => c.status === 'Active');
    const customer = activeCustomers[Math.floor(Math.random() * activeCustomers.length)] || state.customers[0];

    // Pick 1-2 random products
    const sampleProducts = [...state.products].filter(p => p.stock > 0);
    if (sampleProducts.length === 0) {
      alert('Simulation warning: Zero products hold stock. Restock items under Inventory folder.');
      return;
    }

    const item1 = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
    const itemsToBuy = [{
      productId: item1.id,
      quantity: 1,
      size: item1.variants.sizes[Math.floor(Math.random() * item1.variants.sizes.length)] || 'M',
      color: item1.variants.colors[Math.floor(Math.random() * item1.variants.colors.length)]?.name || 'Onyx Black'
    }];

    // Execute state changes through helper
    const updatedState = simulateNewOrder(state, customer.id, itemsToBuy);
    setState(updatedState);

    // Trigger visual notification toast
    const generatedOrder = updatedState.orders[0];
    triggerToast(`Simulation: ${customer.name} purchased ${item1.name} ($${generatedOrder.total.toFixed(2)})`);
    
    // Add to Notification stack
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        text: `New order ${generatedOrder.id} generated via sandbox simulation: ${item1.name}`,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);
  };

  // Toast helper
  const triggerToast = (text) => {
    const id = Date.now().toString();
    setToast({ id, text, count: (toast?.count || 0) + 1 });
    setTimeout(() => {
      setToast(prev => prev?.id === id ? null : prev);
    }, 4500);
  };


  // 5. SIDEBAR NAVIGATION CONTROLS
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Shirt },
    { id: 'categories', label: 'Categories', icon: Tags },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
    { id: 'cms', label: 'CMS Control', icon: Layout },
    { id: 'coupons', label: 'Coupons', icon: Percent },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  const categoriesList = state.categories.map(c => c.name);
  

  // Render the current panel view
  const renderViewContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView
            products={state.products}
            orders={state.orders}
            customers={state.customers}
            couponsCount={state.coupons.length}
            onNavigate={(t) => setCurrentTab(t)}
            onSimulateSale={handleSimulateSale}
          />
        );
      case 'products':
      

        return (
          <ProductsView
            products={state.products}
            categories={categoriesList}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      case 'categories':
        return (
          <CategoriesView
            categories={state.categories}
            products={state.products}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        );
      case 'orders':
        return (
          <OrdersView
            orders={state.orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            currencySymbol={state.settings.currency === 'EUR' ? '€' : state.settings.currency === 'GBP' ? '£' : '$'}
          />
        );
      case 'customers':
        return (
          <CustomersView
            customers={state.customers}
            onToggleStatus={handleToggleCustomerStatus}
          />
        );
      case 'inventory':
        return (
          <InventoryView
            products={state.products}
            onQuickRestock={handleQuickRestock}
          />
        );
      case 'cms':
        return (
          <CMSView
            sections={state.cms}
            products={state.products}
            onUpdateCMS={handleUpdateCMS}
          />
        );
      case 'coupons':
        return (
          <CouponsView
            coupons={state.coupons}
            onAddCoupon={handleAddCoupon}
            onToggleCoupon={handleToggleCoupon}
            onDeleteCoupon={handleDeleteCoupon}
          />
        );
      case 'analytics':
        return (
          <AnalyticsView
            products={state.products}
            orders={state.orders}
            customers={state.customers}
          />
        );
      case 'settings':
        return (
          <SettingsView
            settings={state.settings}
            onUpdateSettings={handleUpdateSettings}
          />
        );
      default:
        return <div className="p-8 text-center text-slate-500 font-bold">Workspace View Commits Failed.</div>;
    }
  };

  


  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex relative" id="master-admin-root">
      
      {/* LEFT SIDEBAR NAVIGATION BAR */}
      <aside
        className={`bg-slate-900 text-slate-200 border-r border-slate-900 transition-all duration-300 flex flex-col justify-between shrink-0 select-none z-20 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
        id="admin-sidebar"
      >
        <div className="flex flex-col">
          {/* Logo brand */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
            {!sidebarCollapsed && (
              <span className="font-black text-sm uppercase tracking-widest text-white flex items-center gap-2">
                Hyra Admin <Sparkles className="w-4.5 h-4.5 text-amber-500" />
              </span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-lg hover:bg-slate-800 bg-slate-800 text-slate-400 hover:text-white mx-auto focus:outline-none"
              title="Toggle Sidebar size"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Links list */}
          <nav className="p-3 space-y-1 relative">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all focus:outline-none ${
                    active
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User simulator notification button at bottom */}
        <div className="p-4 border-t border-slate-800 space-y-3.5 bg-slate-950/40">
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <span className="text-[9px] uppercase font-black text-slate-500 block text-left">Fulfillment Sandbox</span>
              <button
                onClick={handleSimulateSale}
                className="w-full bg-emerald-600/15 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600/25 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-tight transition-all flex items-center justify-center gap-1.5 focus:outline-none"
                title="Random purchase simulator to verify reactive flows"
              >
                <Play className="w-3.5 h-3.5 animate-pulse text-emerald-400 fill-emerald-400/20" />
                Simulate Sale
              </button>
            </div>
          ) : (
            <button
              onClick={handleSimulateSale}
              className="p-2 border border-emerald-500/30 rounded-full bg-emerald-600/10 text-emerald-400 mx-auto block hover:bg-emerald-600/20 focus:outline-none"
              title="Simulate Purchase"
            >
              <Play className="w-4 h-4 animate-pulse fill-emerald-400" />
            </button>
          )}

          {/* Admin diagnostic ID */}
          <div className="flex items-center gap-2 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
            {!sidebarCollapsed && (
              <span className="text-[10px] text-slate-500 font-mono font-bold">DB ACTIVE STORAGE</span>
            )}
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE MASTER VIEWPORT SPACE */}
      <main className="flex-grow flex flex-col justify-between overflow-x-hidden min-h-screen">
        
        {/* TOP BAR HEADER */}
        <header className="h-16 px-6 border-b border-slate-100 bg-white dark:bg-slate-900 flex justify-between items-center sticky top-0 z-10 w-full shrink-0 select-none">
          {/* Left: breadcrumb trail */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50/50 px-3 py-1.5 rounded-lg">
            <span>Hyra Applet</span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-slate-900 dark:text-slate-100">{currentTab} module</span>
          </div>

          {/* Right: Notifications drawer link + User badge */}
          <div className="flex items-center gap-3">
            
            {/* Simulation Notification feed bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDrawer(!showNotifDrawer)}
                className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-55 hover:bg-slate-100 border relative dark:border-slate-800 focus:outline-none"
                title="Simulation alerts logs"
              >
                <Bell className="w-4.5 h-4.5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-600 rounded-full border border-white"></span>
                )}
              </button>

              {/* Notification Drawer panel */}
              {showNotifDrawer && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 p-4 text-left font-sans animate-fade-in">
                  <div className="flex justify-between items-center pb-2 border-b dark:border-slate-850 mb-2">
                    <span className="text-xs font-bold uppercase text-slate-400">Active Sales Feeds</span>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-[10px] hover:underline text-slate-600 dark:text-slate-450 font-bold"
                    >
                      Clear All Unreads
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                    {notifications.length === 0 ? (
                      <p className="text-[11px] text-slate-400 text-center py-4">No alerts received yet.</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-2 rounded text-[11px] border border-slate-50 dark:border-slate-850 ${n.read ? 'bg-white dark:bg-slate-900 opacity-70' : 'bg-slate-50 dark:bg-slate-950 font-bold'}`}>
                          <p className="text-slate-800 dark:text-slate-200 leading-tight">{n.text}</p>
                          <span className="text-[9px] text-slate-400 block mt-1">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <span className="h-5 w-px bg-slate-200 dark:bg-slate-800"></span>

            {/* Corporate Master Profile Badge */}
            <div className="flex items-center gap-2 px-1 py-1 bg-slate-50 dark:bg-slate-850 dark:bg-slate-800 border dark:border-slate-700 rounded-lg max-w-[190px]">
              <div className="w-7 h-7 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center font-black text-xs">
                Z
              </div>
              <div className="text-left hidden md:block">
                <span className="font-bold text-[10.5px] leading-tight block truncate dark:text-white">Z. Morrison</span>
                <span className="text-[9px] text-slate-400 tracking-wider block">Administrator</span>
              </div>
            </div>

          </div>
        </header>

        {/* SCROLLABLE MAIN VIEWS PANEL CONTAINER */}
        <section className="flex-grow p-6 lg:p-8 overflow-y-auto w-full bg-slate-50/20">
          {renderViewContent()}
        </section>

        {/* PLATFORM SECURED FOOTER */}
        <footer className="h-10 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 flex items-center justify-between px-6 text-[10.5px] text-slate-400 select-none">
          <div className="flex items-center gap-1.5 font-bold">
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Storefront Sandbox Active</span>
          </div>
          <span>Hyra Clothing Admin Panel &bull; Rev 2026</span>
        </footer>

      </main>

      {/* REAL-TIME TOAST ALERT NOTIFIER */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 dark:bg-white border border-slate-800 dark:border-slate-200 p-4 rounded-xl shadow-2xl text-white dark:text-slate-900 z-50 text-xs font-medium max-w-sm flex items-center gap-3 animate-slide-left hover:scale-[1.01] transition-transform">
          <div className="p-2 bg-emerald-600 rounded-lg text-white">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-emerald-400 dark:text-emerald-600 tracking-wider">Checkout Event Received</span>
            <p className="text-slate-100 dark:text-slate-800 text-[11px] leading-snug mt-0.5">{toast.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}
