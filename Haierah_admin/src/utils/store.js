import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  INITIAL_CMS,
  INITIAL_SETTINGS
} from './seedData.js';

// Storage keys
const KEY_PREFIX = 'hyra_shopify_admin_';
const KEYS = {
  PRODUCTS: `${KEY_PREFIX}products`,
  CATEGORIES: `${KEY_PREFIX}categories`,
  CUSTOMERS: `${KEY_PREFIX}customers`,
  ORDERS: `${KEY_PREFIX}orders`,
  COUPONS: `${KEY_PREFIX}coupons`,
  CMS: `${KEY_PREFIX}cms`,
  SETTINGS: `${KEY_PREFIX}settings`
};

// Local storage helpers
function getStored(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Error loading state for ${key}`, e);
    return fallback;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving state for ${key}`, e);
  }
}

export function loadInitialState() {
  return {
    products: getStored(KEYS.PRODUCTS, INITIAL_PRODUCTS),
    categories: getStored(KEYS.CATEGORIES, INITIAL_CATEGORIES),
    customers: getStored(KEYS.CUSTOMERS, INITIAL_CUSTOMERS),
    orders: getStored(KEYS.ORDERS, INITIAL_ORDERS),
    coupons: getStored(KEYS.COUPONS, INITIAL_COUPONS),
    cms: getStored(KEYS.CMS, INITIAL_CMS),
    settings: getStored(KEYS.SETTINGS, INITIAL_SETTINGS)
  };
}

export function saveState(state) {
  setStored(KEYS.PRODUCTS, state.products);
  setStored(KEYS.CATEGORIES, state.categories);
  setStored(KEYS.CUSTOMERS, state.customers);
  setStored(KEYS.ORDERS, state.orders);
  setStored(KEYS.COUPONS, state.coupons);
  setStored(KEYS.CMS, state.cms);
  setStored(KEYS.SETTINGS, state.settings);
}

// Generate new order helper with automatic inventory decrement
export function simulateNewOrder(state, customerId, items) {
  const customer = state.customers.find(c => c.id === customerId);
  if (!customer) return state;

  const orderItems = items.map(item => {
    const prod = state.products.find(p => p.id === item.productId);
    const price = prod ? (prod.discountPrice || prod.price) : 50;
    return {
      productId: item.productId,
      name: prod ? prod.name : 'Garment',
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price,
      image: prod ? prod.images[0] : ''
    };
  });

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = Math.min(subtotal, 15); // simulate $15 loyalty discount
  const taxRate = state.settings.taxRate / 100;
  const tax = Number(((subtotal - discount) * taxRate).toFixed(2));
  const total = subtotal - discount + tax;

  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    customerAvatar: customer.avatar,
    items: orderItems,
    subtotal,
    discount,
    tax,
    total,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Pending',
    shippingAddress: {
      street: '72 Vintage Fashion Boulevard',
      city: 'Beverly Hills',
      state: 'CA',
      zip: '90210',
      country: 'USA'
    },
    createdAt: new Date().toISOString()
  };

  // 1. Process Stock Reductions automatically
  const updatedProducts = state.products.map(prod => {
    const itemOrdered = items.find(it => it.productId === prod.id);
    if (itemOrdered) {
      const resultingStock = Math.max(0, prod.stock - itemOrdered.quantity);
      return { ...prod, stock: resultingStock };
    }
    return prod;
  });

  // 2. Process Customer spending and order totals
  const updatedCustomers = state.customers.map(c => {
    if (c.id === customerId) {
      return {
        ...c,
        orderCount: c.orderCount + 1,
        totalSpend: Math.round((c.totalSpend + total) * 100) / 100,
        lastActive: new Date().toISOString()
      };
    }
    return c;
  });

  const updatedState = {
    ...state,
    orders: [newOrder, ...state.orders],
    products: updatedProducts,
    customers: updatedCustomers
  };

  saveState(updatedState);
  return updatedState;
}
