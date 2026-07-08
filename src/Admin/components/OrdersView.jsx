import React, { useState, useMemo } from 'react';
import { Search, Printer, ChevronRight, MapPin, CreditCard, ChevronLeft, CheckCircle } from 'lucide-react';

export const OrdersView = ({
  orders,
  onUpdateOrderStatus,
  currencySymbol
}) => {
  // STATE
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // SEARCH AND FILTER
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // STATUS COLOR BADGES FOR CLASSIC BRAND LOOKS
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300';
      case 'Packed':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getPaymentStatusBadgeClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold';
      case 'Failed':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold';
      default:
        return 'bg-slate-500/10 text-slate-400';
    }
  };

  // ORDER EVENT STEPS FOR DIGITAL TIMELINE TRACKERS
  const orderSteps = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];

  // PRINTING HANDLER
  const printInvoice = () => {
    const printContent = document.getElementById('printable-invoice-block');
    if (!printContent) return;

    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    // Refresh to restore standard React nodes
    window.location.reload();
  };

  return (
    <div className="space-y-6" id="orders-tab-panel">
      {/* 1. MASTER LIST (SHOWS IF NO DETAILED ORDER CHOSEN) */}
      {!selectedOrder ? (
        <>
          {/* HEADER HEADER */}
          <div className="py-2.5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order Fulfilment Logs</h2>
            <p className="text-xs text-slate-500 mt-1">Review checkout, address diagnostics, logistics flows, and invoice generation.</p>
          </div>

          {/* SEARCH & ACCORDION BAR */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders by ID, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs font-medium pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:text-white"
              />
            </div>

            {/* Status filtering */}
            <div className="flex gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {['All', 'Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    statusFilter === status
                      ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* MASTER LOGS DATABASE TABLE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/50 dark:bg-slate-950/20">
                    <th className="py-4 px-4">Order Code</th>
                    <th className="py-4 px-4">Fashion Member</th>
                    <th className="py-4 px-3">Date Dispatched</th>
                    <th className="py-4 px-3">Items Count</th>
                    <th className="py-4 px-3">Total Amount</th>
                    <th className="py-4 px-3">Payment Status</th>
                    <th className="py-4 px-3">Deliver Status</th>
                    <th className="py-4 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        No active orders matched the requested status.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map(o => (
                      <tr key={o.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-all cursor-pointer" onClick={() => setSelectedOrder(o)}>
                        {/* ID Code */}
                        <td className="py-4 px-4 font-mono font-black text-slate-900 dark:text-white">{o.id}</td>

                        {/* Customer Info */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2.5">
                            <img src={o.customerAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'} className="w-8 h-8 rounded-full object-cover shadow-inner" alt="" />
                            <div>
                              <span className="font-bold text-slate-950 dark:text-white block leading-none">{o.customerName}</span>
                              <span className="text-[10px] text-slate-400 mt-1 block max-w-[150px] truncate leading-none">{o.customerEmail}</span>
                            </div>
                          </div>
                        </td>

                        {/* ISO Date */}
                        <td className="py-4 px-3 text-slate-400 font-medium">
                          {new Date(o.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>

                        {/* Items count */}
                        <td className="py-4 px-3 font-semibold text-slate-500 dark:text-slate-400">
                          {o.items.reduce((sum, i) => sum + i.quantity, 0)} units
                        </td>

                        {/* Total Cost */}
                        <td className="py-4 px-3 font-black text-slate-900 dark:text-white">
                          {currencySymbol}{o.total.toFixed(2)}
                        </td>

                        {/* Payment State */}
                        <td className="py-4 px-3">
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10.5px] uppercase ${getPaymentStatusBadgeClass(o.paymentStatus)}`}>
                            {o.paymentStatus}
                          </span>
                        </td>

                        {/* Order State */}
                        <td className="py-4 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeClass(o.status)}`}>
                            {o.status}
                          </span>
                        </td>

                        {/* Chevron Trigger */}
                        <td className="py-4 px-4 text-right">
                          <button className="p-1 px-2 border border-slate-100 hover:bg-slate-55 rounded text-xs inline-flex items-center gap-1">
                            Review <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* 2. SPECIFIC ORDERS VIEWER & CONFIGURE ACTIONS */
        <div className="space-y-6 text-left animate-fade-in" id="order-detail-page">
          {/* Top Return navigation */}
          <div className="flex justify-between items-center pb-2">
            <button
              onClick={() => setSelectedOrder(null)}
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 rounded-lg hover:bg-slate-50 font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to List
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setIsInvoiceOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-lg shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                Generate Invoice
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT DETAILS: ITEMS TABLE & WORKFLOW TRACKER */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* ORDER WORKFLOW TIMELINE */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Fulfillment Status Flow</h3>
                  <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeClass(selectedOrder.status)}`}>
                    Currently {selectedOrder.status.toUpperCase()}
                  </span>
                </div>

                {/* VISUAL TIMELINE DOTS */}
                {selectedOrder.status === 'Cancelled' ? (
                  <div className="bg-rose-50 border border-rose-100/50 p-4 rounded-xl text-rose-800 font-bold text-xs flex items-center gap-2.5">
                    <span>This shipment has been cancelled by the systems manager. No warehouse packages will disburse.</span>
                  </div>
                ) : (
                  <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 py-4">
                    {/* Background connector line */}
                    <div className="absolute left-[50%] md:left-4 md:right-4 h-[90%] md:h-1 bg-slate-150 -translate-x-[50%] md:translate-x-0 md:translate-y-[-50%] top-2 md:top-1/2 z-0"></div>
                    
                    {orderSteps.map((step, idx) => {
                      const currentStepIdx = orderSteps.indexOf(selectedOrder.status);
                      const isCompleted = idx <= currentStepIdx;
                      const isCurrent = step === selectedOrder.status;

                      return (
                        <div key={step} className="flex flex-row md:flex-col items-center gap-2.5 z-10 relative bg-white dark:bg-slate-900 p-2 text-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                            isCompleted 
                              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}>
                            {isCompleted ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                          </div>
                          <div>
                            <span className={`text-[10px] uppercase font-black tracking-wider block ${isCurrent ? 'text-amber-600 font-black' : 'text-slate-400'}`}>
                              {step}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* EVENT MANUAL TRANSITION CONTROL PANEL */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-5 mt-6 space-y-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">System Manager Manual transition overrides:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrder.status !== 'Cancelled' && (
                      <>
                        {selectedOrder.status === 'Pending' && (
                          <button
                            onClick={() => onUpdateOrderStatus(selectedOrder.id, 'Confirmed', 'Paid')}
                            className="px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
                          >
                            Mark as Confirmed (Charge complete)
                          </button>
                        )}
                        {selectedOrder.status === 'Confirmed' && (
                          <button
                            onClick={() => onUpdateOrderStatus(selectedOrder.id, 'Packed', 'Paid')}
                            className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700"
                          >
                             Mark as Packed (Fitted into Hyra Box)
                          </button>
                        )}
                        {selectedOrder.status === 'Packed' && (
                          <button
                            onClick={() => onUpdateOrderStatus(selectedOrder.id, 'Shipped', 'Paid')}
                            className="px-3.5 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700"
                          >
                            Mark as Shipped (Courier dispatched)
                          </button>
                        )}
                        {selectedOrder.status === 'Shipped' && (
                          <button
                            onClick={() => onUpdateOrderStatus(selectedOrder.id, 'Delivered', 'Paid')}
                            className="px-3.5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                          >
                            Dispatched to Door (Delivered)
                          </button>
                        )}
                      </>
                    )}

                    {selectedOrder.status !== 'Delivered' && selectedOrder.status !== 'Cancelled' && (
                      <button
                        onClick={() => onUpdateOrderStatus(selectedOrder.id, 'Cancelled', 'Failed')}
                        className="px-3.5 py-2 border border-rose-200 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-50"
                      >
                        Cancel Order Flow
                      </button>
                    )}

                    {selectedOrder.status === 'Cancelled' && (
                      <button
                        onClick={() => onUpdateOrderStatus(selectedOrder.id, 'Pending', 'Pending')}
                        className="px-3.5 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50"
                      >
                        Restore Order Lifecycle
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* RETAILED GARMENT SUB-LOGS */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Garments Ordered</h3>
                <div className="divide-y divide-slate-150">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <img src={it.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600'} className="w-12 h-14 object-cover rounded shadow-sm border border-slate-100 dark:border-slate-800" alt="" />
                        <div>
                          <h4 className="font-bold text-slate-950 dark:text-white line-clamp-1">{it.name}</h4>
                          <div className="flex gap-2.5 text-[10px] text-slate-400 font-bold mt-1">
                            <span>SIZE: {it.size}</span>
                            <span>&bull;</span>
                            <span>FABRIC: {it.color}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold block text-slate-900 dark:text-white">${it.price.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 mt-1 block font-mono">Qty: {it.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TOTAL BILLING BREAKDOWN */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-5 mt-5 space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal Cost</span>
                    <span className="font-bold">${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Discount Code applied</span>
                    <span className="font-bold text-emerald-600">-${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated Sales VAT ({15}%)</span>
                    <span className="font-bold">${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-950 dark:text-white text-sm font-black pt-2 border-t">
                    <span>Checkout Grand Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE DETAILS: CUSTOMER DIAGNOSTICS & LOGISTICS */}
            <div className="space-y-6">
              {/* RECIPIENT CARD */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm text-left">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Recipient Diagnostic</h3>
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <img src={selectedOrder.customerAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'} className="w-12 h-12 rounded-full object-cover shadow border border-slate-100" alt="" />
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white leading-none">{selectedOrder.customerName}</h4>
                    <span className="text-[11px] text-slate-400 mt-1.5 block max-w-[180px] truncate leading-none">{selectedOrder.customerEmail}</span>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-350">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">Delivery Destination</span>
                      <span className="text-[11px] text-slate-500 mt-1 block leading-relaxed">
                        {selectedOrder.shippingAddress.street}<br />
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}<br />
                        {selectedOrder.shippingAddress.country}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">Billing Method</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block leading-none">
                        {selectedOrder.paymentMethod} &bull; {selectedOrder.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LUXURY INVOICE OVERLAY MODEL */}
      {isInvoiceOpen && selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in" id="invoice-modal">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl relative text-left">
            
            {/* Modal actions close & print bar */}
            <div className="flex justify-between items-center pb-4 mb-3 border-b no-print">
              <span className="text-xs font-bold uppercase text-slate-400">PDF Invoice Preview</span>
              <div className="flex gap-2">
                <button
                  onClick={printInvoice}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print PDF Documents
                </button>
                <button
                  onClick={() => setIsInvoiceOpen(false)}
                  className="px-3 py-1.5 border hover:bg-slate-50 text-xs font-bold rounded"
                >
                  Close
                </button>
              </div>
            </div>

            {/* PRINT INDIVIDUAL BLOCK */}
            <div id="printable-invoice-block" className="p-6 bg-white rounded text-xs leading-relaxed text-slate-800">
              <style>{`
                @media print {
                  body { background: white !important; color: black !important; }
                  .no-print { display: none !important; }
                }
              `}</style>
              
              {/* Invoice Logo */}
              <div className="flex justify-between items-start pb-6 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-black tracking-tight text-slate-950">HYRA PREMIUM BRAND</h1>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Official Client Bill Statement</span>
                </div>
                <div className="text-right">
                  <h2 className="text-sm font-bold text-slate-950">INVOICE STATEMENT</h2>
                  <span className="block font-mono font-bold text-slate-500 mt-1">{selectedOrder.id}</span>
                </div>
              </div>

              {/* Bill Details */}
              <div className="grid grid-cols-2 gap-4 py-6 border-b border-slate-100">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Merchandise Provider</span>
                  <div className="mt-1 pb-1.5 text-slate-950 font-bold text-xs uppercase leading-normal">
                    HYRA E-Commerce Operations Ltd<br />
                    184 Fashion Blvd, Suite 400<br />
                    New York, NY 10021, USA
                  </div>
                  <span className="text-[10px] text-slate-500">operations@hyra-premium-systems.com</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black">Shipped To</span>
                  <div className="mt-1 pb-1.5 text-slate-950 font-bold leading-normal">
                    {selectedOrder.customerName}<br />
                    {selectedOrder.shippingAddress.street}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}<br />
                    {selectedOrder.shippingAddress.country}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Date Paid: {new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Items Table */}
              <div className="py-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-[9px] uppercase font-bold text-slate-400">
                      <th className="pb-2">Garment Item</th>
                      <th className="pb-2">Sizing & Color</th>
                      <th className="pb-2 text-center">Qty</th>
                      <th className="pb-2 text-right">Unit Price</th>
                      <th className="pb-2 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2.5 font-bold text-slate-900">{item.name}</td>
                        <td className="py-2.5 font-medium">{item.size} / {item.color}</td>
                        <td className="py-2.5 text-center font-mono">{item.quantity}</td>
                        <td className="py-2.5 text-right font-mono">${item.price.toFixed(2)}</td>
                        <td className="py-2.5 text-right font-mono font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="border-t border-slate-200 pt-4 flex justify-end">
                <div className="w-1/2 space-y-2 border-slate-100 text-slate-600">
                  <div className="flex justify-between">
                    <span>Retail Subtotal:</span>
                    <span className="font-mono font-bold text-slate-900">${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applied Coupon Code Deductible:</span>
                    <span className="font-mono font-bold text-emerald-600">-${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated VAT ({15}%):</span>
                    <span className="font-mono font-bold text-slate-900">${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
                    <span>Grand Total:</span>
                    <span className="font-mono text-base">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="pt-8 text-center text-[10px] text-slate-400 border-t border-slate-100 mt-8">
                Thank you for your boutique order. This statement constitutes digital invoice validation for your Hyra Premium Order.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
