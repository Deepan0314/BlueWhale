import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, Edit, UploadCloud, X, RefreshCw, FileSpreadsheet, Check } from 'lucide-react';

export const ProductsView = ({
  products,
  categories,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  // STATE
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All'); // 'All' | 'Low' | 'OutOfStock'
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'priceAsc' | 'priceDesc' | 'stockAsc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // INLINE EDITING STATE
  const [inlineEditingId, setInlineEditingId] = useState(null);
  const [inlinePrice, setInlinePrice] = useState('');
  const [inlineStock, setInlineStock] = useState('');

  // MODALS
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  // FORM BINDINGS
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formDiscountPrice, setFormDiscountPrice] = useState('');
  const [formCategory, setFormCategory] = useState('Women');
  const [formStock, setFormStock] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImages, setFormImages] = useState([]);
  const [imageInputVal, setImageInputVal] = useState('');
  const [formSizes, setFormSizes] = useState(['S', 'M', 'L']);
  const [formColors, setFormColors] = useState([
    { name: 'Oatmeal Beige', hex: '#E5D3BE' },
    { name: 'Midnight Charcoal', hex: '#2C2C2C' }
  ]);
  
  // Custom color creator inside form
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');

  // Bulk input
  const [bulkText, setBulkText] = useState('');
  const [bulkError, setBulkError] = useState(null);

  // SEARCH AND PLOT FILTERING
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // search
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      // category
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      // stock
      let matchesStock = true;
      if (stockFilter === 'Low') {
        matchesStock = p.stock > 0 && p.stock <= 5;
      } else if (stockFilter === 'OutOfStock') {
        matchesStock = p.stock === 0;
      }

      return matchesSearch && matchesCategory && matchesStock;
    }).sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'priceAsc') {
        return a.price - b.price;
      }
      if (sortBy === 'priceDesc') {
        return b.price - a.price;
      }
      if (sortBy === 'stockAsc') {
        return a.stock - b.stock;
      }
      return 0;
    });
  }, [products, searchTerm, categoryFilter, stockFilter, sortBy]);

  // PAGINATION
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  // SKU GENERATOR
  const autoGenerateSku = () => {
    const brandPattern = 'ZR';
    const catShort = formCategory ? formCategory.substring(0, 3).toUpperCase() : 'WMR';
    const randCode = Math.floor(100 + Math.random() * 900);
    const suffix = 'MS';
    setFormSku(`${brandPattern}-${catShort}-${randCode}-${suffix}`);
  };

  // OPEN EDITOR Modal FOR ADD
  const openAddForm = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSku('');
    setFormPrice('');
    setFormDiscountPrice('');
    setFormCategory(categories[0] || 'Women');
    setFormStock('');
    setFormDescription('');
    setFormImages([
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80'
    ]);
    setFormSizes(['S', 'M', 'L']);
    setFormColors([
      { name: 'Pure Onyx', hex: '#1C1917' },
      { name: 'Canvas White', hex: '#FAF9F6' }
    ]);
    setIsEditorOpen(true);
  };

  // OPEN EDITOR For EDIT
  const openEditForm = (p) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormSku(p.sku);
    setFormPrice(p.price.toString());
    setFormDiscountPrice(p.discountPrice ? p.discountPrice.toString() : '');
    setFormCategory(p.category);
    setFormStock(p.stock.toString());
    setFormDescription(p.description);
    setFormImages(p.images);
    setFormSizes(p.variants.sizes);
    setFormColors(p.variants.colors);
    setIsEditorOpen(true);
  };

  // SAVE PRODUCT
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formName || !formSku || !formPrice || !formStock) {
      alert('Please fill out Name, SKU, Price and Stock parameters.');
      return;
    }

    const priceNum = parseFloat(formPrice);
    const discountNum = formDiscountPrice ? parseFloat(formDiscountPrice) : null;
    const stockNum = parseInt(formStock, 10);

    const productPayload = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formName,
      sku: formSku,
      price: isNaN(priceNum) ? 0 : priceNum,
      discountPrice: discountNum && !isNaN(discountNum) ? discountNum : null,
      category: formCategory,
      stock: isNaN(stockNum) ? 0 : stockNum,
      images: formImages.length > 0 ? formImages : ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=85'],
      variants: {
        sizes: formSizes,
        colors: formColors
      },
      description: formDescription || 'Premium luxury designed item belonging to the new Hyra apparel drops.',
      status: 'Active',
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
    };

    if (editingProduct) {
      onUpdateProduct(productPayload);
    } else {
      onAddProduct(productPayload);
    }
    setIsEditorOpen(false);
  };

  // ADD IMAGES
  const addImageUrl = () => {
    if (imageInputVal.trim()) {
      setFormImages([...formImages, imageInputVal.trim()]);
      setImageInputVal('');
    }
  };

  const removeImageUrl = (index) => {
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  // MULTIPLE SIZES TOGGLE
  const toggleSize = (size) => {
    if (formSizes.includes(size)) {
      setFormSizes(formSizes.filter(s => s !== size));
    } else {
      setFormSizes([...formSizes, size]);
    }
  };

  // COLORS ADD / REMOVE
  const addFormColor = () => {
    if (newColorName.trim()) {
      setFormColors([...formColors, { name: newColorName.trim(), hex: newColorHex }]);
      setNewColorName('');
    }
  };

  const removeFormColor = (index) => {
    setFormColors(formColors.filter((_, l) => l !== index));
  };

  // INLINE PRICE & STOCK MODIFICATION
  const startInlineEditing = (p) => {
    setInlineEditingId(p.id);
    setInlinePrice(p.price.toString());
    setInlineStock(p.stock.toString());
  };

  const saveInlineEditing = (p) => {
    const updatedPrice = parseFloat(inlinePrice);
    const updatedStock = parseInt(inlineStock, 10);

    onUpdateProduct({
      ...p,
      price: isNaN(updatedPrice) ? p.price : updatedPrice,
      stock: isNaN(updatedStock) ? p.stock : updatedStock
    });
    setInlineEditingId(null);
  };

  // BULK BATCH PARSING
  const handleBulkUpload = () => {
    setBulkError(null);
    if (!bulkText.trim()) {
      setBulkError('Please paste either a JSON array or CSV text list.');
      return;
    }

    try {
      if (bulkText.trim().startsWith('[')) {
        const parsed = JSON.parse(bulkText);
        if (Array.isArray(parsed)) {
          parsed.forEach((item, idx) => {
            const product = {
              id: item.id || `prod-bulk-${Date.now()}-${idx}`,
              name: item.name || `Imported Item #${idx + 1}`,
              sku: item.sku || `ZR-BLK-${Math.floor(100 + Math.random() * 900)}`,
              price: Number(item.price) || 49.90,
              discountPrice: item.discountPrice ? Number(item.discountPrice) : null,
              category: item.category || 'New Arrivals',
              stock: Number(item.stock) || 12,
              images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80'
              ],
              variants: item.variants || {
                sizes: ['S', 'M', 'L'],
                colors: [{ name: 'Sandal Beige', hex: '#E5D3BE' }]
              },
              description: item.description || 'Raw imported boutique apparel.',
              status: 'Active',
              createdAt: new Date().toISOString()
            };
            onAddProduct(product);
          });
          setIsBulkOpen(false);
          setBulkText('');
          return;
        }
      }

      const lines = bulkText.split('\n');
      let count = 0;
      lines.forEach((line) => {
        const parts = line.split(',');
        if (parts.length >= 4 && parts[0].trim() !== 'Name') {
          const name = parts[0].trim();
          const sku = parts[1].trim();
          const price = parseFloat(parts[2].trim());
          const category = parts[3].trim();
          const stock = parts[4] ? parseInt(parts[4].trim(), 10) : 10;

          if (name && sku && !isNaN(price)) {
            const product = {
              id: `prod-csv-${Date.now()}-${count}`,
              name,
              sku,
              price,
              discountPrice: null,
              category: categories.includes(category) ? category : (categories[0] || 'Women'),
              stock: isNaN(stock) ? 8 : stock,
              images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80'],
              variants: {
                sizes: ['S', 'M', 'L'],
                colors: [{ name: 'Neutral Stone', hex: '#D6CFC7' }]
              },
              description: 'Quick CSV Batch Import listing.',
              status: 'Active',
              createdAt: new Date().toISOString()
            };
            onAddProduct(product);
            count++;
          }
        }
      });

      if (count > 0) {
        setIsBulkOpen(false);
        setBulkText('');
      } else {
        setBulkError('Format incorrect. Use CSV format "Name, SKU, Price, Category, Stock" or JSON array.');
      }
    } catch (e) {
      setBulkError(`Parsing exception: ${e.message}`);
    }
  };

  return (
    <div className="space-y-6" id="products-tab-panel">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Product Management</h2>
          <p className="text-xs text-slate-500 mt-1">Configure listings, categories mapping, sizing variants, and retail pricing.</p>
        </div>
        <div className="flex gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setIsBulkOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Bulk Paste
          </button>
          
          <button
            onClick={openAddForm}
            className="flex items-center gap-1.5 px-4 font-bold py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Garment
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full text-xs font-medium pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:text-white"
          />
        </div>

        {/* Action Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Section:</span>
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white rounded-md font-bold focus:outline-none"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Stock:</span>
            <select
              value={stockFilter}
              onChange={(e) => { setStockFilter(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white rounded-md font-bold focus:outline-none"
            >
              <option value="All">All Inventory</option>
              <option value="Low">Low Stock (&le; 5)</option>
              <option value="OutOfStock">Out of Stock (0)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Order:</span>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1 text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white rounded-md font-bold focus:outline-none"
            >
              <option value="latest">Newest Releases</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="stockAsc">Critical Low Stock First</option>
            </select>
          </div>
        </div>
      </div>

      {/* MASTER GARMENTS TABLE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/50 dark:bg-slate-950/20">
                <th className="py-4 px-4">Garment</th>
                <th className="py-4 px-3">SKU</th>
                <th className="py-4 px-3">Category</th>
                <th className="py-4 px-3">Pricing Details</th>
                <th className="py-4 px-3">Fulfillment Stock</th>
                <th className="py-4 px-3">Variants</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No garments match the current filters. Add a new listing to start.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map(p => {
                  const isEditingThis = inlineEditingId === p.id;
                  
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-all group">
                      {/* Image + Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3.5">
                          <img src={p.images[0]} className="w-12 h-14 object-cover rounded shadow-sm border border-slate-100 dark:border-slate-800" alt="" />
                          <div className="max-w-[200px]">
                            <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{p.name}</h4>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5 max-w-full space-x-1.5">
                              <span className="font-bold text-slate-500">{p.variants.colors.length} Colors</span>
                              <span>&bull;</span>
                              <span className="font-bold text-slate-500">{p.variants.sizes.join(', ')}</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-400 font-bold">{p.sku}</td>

                      {/* Category */}
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-bold text-[10px]">
                          {p.category}
                        </span>
                      </td>

                      {/* Pricing */}
                      <td className="py-3 px-3">
                        {isEditingThis ? (
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 font-bold">$</span>
                            <input
                              type="number"
                              step="0.01"
                              value={inlinePrice}
                              onChange={(e) => setInlinePrice(e.target.value)}
                              className="w-16 p-1 border rounded bg-slate-50 text-xs font-mono dark:bg-slate-950 dark:text-white focus:outline-none"
                            />
                          </div>
                        ) : (
                          <div>
                            {p.discountPrice ? (
                              <div className="flex flex-col">
                                <span className="font-black text-rose-600">${p.discountPrice}</span>
                                <span className="text-[10px] text-slate-400 line-through">${p.price}</span>
                              </div>
                            ) : (
                              <span className="font-black text-slate-800 dark:text-slate-200">${p.price}</span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Stock Level */}
                      <td className="py-3 px-3">
                        {isEditingThis ? (
                          <input
                            type="number"
                            value={inlineStock}
                            onChange={(e) => setInlineStock(e.target.value)}
                            className="w-16 p-1 border rounded bg-slate-50 text-xs font-mono dark:bg-slate-950 dark:text-white focus:outline-none"
                          />
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${
                              p.stock === 0 ? 'bg-rose-600' : p.stock <= 5 ? 'bg-amber-500' : 'bg-teal-500'
                            }`} />
                            <span className="font-bold font-mono text-[11px] text-slate-700 dark:text-slate-300">
                              {p.stock} units
                            </span>
                            {p.stock === 0 && <span className="text-[9px] font-mono text-rose-500 font-black uppercase">OUT</span>}
                            {p.stock > 0 && p.stock <= 5 && <span className="text-[9px] font-mono text-amber-500 font-bold uppercase">LOW</span>}
                          </div>
                        )}
                      </td>

                      {/* Color dots preview */}
                      <td className="py-3 px-3">
                        <div className="flex gap-1">
                          {p.variants.colors.map((c, i) => (
                            <span
                              key={i}
                              style={{ backgroundColor: c.hex }}
                              className="w-3 h-3 rounded-full border border-slate-300 inline-block shadow-sm"
                              title={c.name}
                            />
                          ))}
                        </div>
                      </td>

                      {/* Inline Actions */}
                      <td className="py-3 px-4 text-right">
                        {isEditingThis ? (
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => saveInlineEditing(p)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded"
                              title="Commit Inline State"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setInlineEditingId(null)}
                              className="p-1 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => startInlineEditing(p)}
                              className="inline-flex self-center px-1.5 py-0.5 border border-slate-200 text-[10px] text-slate-500 rounded hover:bg-slate-50 dark:hover:bg-slate-850 font-bold mr-1.5 focus:outline-none"
                            >
                              Quick Edit
                            </button>
                            <button
                              onClick={() => openEditForm(p)}
                              className="p-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded focus:outline-none"
                              title="Full Edit Details"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Confirm deletion of garment listing "${p.name}"?`)) {
                                  onDeleteProduct(p.id);
                                }
                              }}
                              className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded focus:outline-none"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL */}
        {filteredProducts.length > itemsPerPage && (
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 px-4 py-3 bg-slate-50/50 dark:bg-slate-950/20 text-xs text-left">
            <span className="text-slate-500">
              Showing <span className="font-bold text-slate-800 dark:text-slate-200">{(currentPage - 1) * itemsPerPage + 1}</span>-
              <span className="font-bold text-slate-800 dark:text-slate-200">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of{' '}
              <span className="font-bold text-slate-800 dark:text-slate-200">{filteredProducts.length}</span> garments
            </span>

            <div className="flex gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-2.5 py-1.5 border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-40 text-[11px] font-bold"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-7 h-7 flex items-center justify-center border rounded font-black text-[11px] ${
                    currentPage === i + 1 ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white border-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-2.5 py-1.5 border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-40 text-[11px] font-bold"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FULL RECORD EDITOR DIALOG / SLIDE-OVER MODAL */}
      {isEditorOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" id="garment-form-modal">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
            
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
              <div className="text-left">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {editingProduct ? 'Update Luxury Listing' : 'Introduce New Garment'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Configure retail specification parameters & catalog listing options.</p>
              </div>
              <button onClick={() => setIsEditorOpen(false)} className="p-1 px-2 border border-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-left text-xs font-medium">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Apparel Title</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Linen Linen Pleated Trousers"
                    className="w-full border border-slate-200 p-2 rounded-lg bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">SKU Identity Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value)}
                      placeholder="ZR-PT-076-OL"
                      className="w-full border border-slate-200 p-2 rounded-lg font-mono text-xs bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={autoGenerateSku}
                      className="px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg"
                      title="Auto Create SKU"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Retail Base Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="79.00"
                    className="w-full border border-slate-200 p-2 rounded-lg bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Discounted Price ($) - Optional</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formDiscountPrice}
                    onChange={(e) => setFormDiscountPrice(e.target.value)}
                    placeholder="e.g. 59.90 (Leave blank if full price)"
                    className="w-full border border-slate-200 p-2 rounded-lg bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Category Section Assignment</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full border border-slate-200 p-2 rounded-lg bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-none font-bold"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Starting Stock quantity</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    placeholder="25"
                    className="w-full border border-slate-200 p-2 rounded-lg bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">E-commerce Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detail the materials used (linen weave, cashmere density), closures, lapels, and fits of the Hyra styled item..."
                  className="w-full border border-slate-200 p-2 rounded-lg bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Active Sizing Options (Multiple selection)</label>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL', '2Y', '4Y', '6Y', '8Y'].map(size => {
                    const active = formSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 border rounded-lg font-black transition-all text-[11px] focus:outline-none ${
                          active ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Active Fabric Colors ({formColors.length})</label>
                
                <div className="flex flex-wrap gap-2 pb-1.5">
                  {formColors.map((col, index) => (
                    <div key={index} className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-855 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-bold">
                      <span className="w-2.5 h-2.5 rounded-full border border-slate-300" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                      <button type="button" onClick={() => removeFormColor(index)} className="text-rose-500 hover:text-rose-700 ml-1">
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2.5 items-end bg-slate-50 dark:bg-slate-955 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="flex-grow space-y-1">
                    <span className="text-[9px] text-slate-400 font-bold">COLOR NAME</span>
                    <input
                      type="text"
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                      placeholder="e.g. Vintage Indigo"
                      className="w-full border border-slate-200 p-1.5 bg-white dark:bg-slate-900 dark:text-white rounded text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 block font-bold">COLOR SWATCH</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={newColorHex}
                        onChange={(e) => setNewColorHex(e.target.value)}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-[10px] font-bold uppercase">{newColorHex}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addFormColor}
                    className="px-3.5 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold rounded-md hover:bg-slate-800 focus:outline-none"
                  >
                    Add Swatch
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Garment Media Gallery (Unsplash Images)</label>
                
                <div className="grid grid-cols-5 gap-2.5">
                  {formImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded border overflow-hidden aspect-[4/5] bg-slate-50">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                      <button
                        type="button"
                        onClick={() => removeImageUrl(idx)}
                        className="absolute top-1 right-1 p-0.5 bg-slate-900/80 rounded-full text-white hover:bg-slate-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="border border-dashed border-slate-200 rounded flex flex-col items-center justify-center p-2.5 cursor-pointer text-slate-400 hover:border-amber-600 aspect-[4/5] bg-slate-50/50">
                    <UploadCloud className="w-5 h-5 text-slate-300" />
                    <span className="text-[8px] text-slate-400 mt-1 uppercase tracking-widest text-center animate-pulse">New Image</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageInputVal}
                    onChange={(e) => setImageInputVal(e.target.value)}
                    placeholder="Paste clothing image absolute URL here..."
                    className="w-full border border-slate-200 p-2 rounded-lg bg-slate-50 dark:bg-slate-950 dark:text-white text-xs focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 text-xs font-bold focus:outline-none"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-6 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 text-xs shadow"
                >
                  Confirm Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK UPLOAD MODAL */}
      {isBulkOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" id="bulk-upload-modal">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg shadow-2xl p-6 relative animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Bulk CSV/JSON Imports</h3>
                <p className="text-xs text-slate-400 mt-1">Paste formatted rows to introduce garment logs at volume.</p>
              </div>
              <button onClick={() => setIsBulkOpen(false)} className="p-1 px-2 border border-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 text-left">
              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 text-slate-700 dark:text-slate-300 text-[10.5px]">
                <p className="font-bold">Supported Formats:</p>
                <ol className="list-decimal pl-4 mt-1.5 space-y-1 font-mono">
                  <li>CSV style (excluding headers):<br />Name, SKU, Price, Category, Stock</li>
                  <li>Standard JSON Array containing Product attributes</li>
                </ol>
              </div>

              <textarea
                rows={8}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="Paste your e-commerce export list text here..."
                className="w-full border border-slate-200 p-2.5 rounded-lg font-mono text-xs bg-slate-50 dark:bg-slate-950 dark:text-white focus:outline-none"
              />

              {bulkError && <p className="text-[10px] font-black text-rose-500 font-mono mt-1">{bulkError}</p>}

              <div className="flex justify-end gap-2.5 mt-4">
                <button
                  onClick={() => setIsBulkOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
                >
                  Discard
                </button>
                <button
                  onClick={handleBulkUpload}
                  className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-lg hover:bg-slate-800 text-xs shadow"
                >
                  Execute Batch Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
