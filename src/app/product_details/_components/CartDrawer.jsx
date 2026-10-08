import React from "react";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  updateCartQuantity,
  removeFromCart,
  subtotal,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-800">আপনার কার্ট ({cartItems.length})</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">কার্ট বর্তমানে খালি রয়েছে।</div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                    <span className="text-[11px] text-slate-500">সাইজ: {item.size} | কালার: {item.color}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-emerald-600 text-xs">৳{item.price * item.quantity}</span>
                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg bg-white p-0.5">
                      <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1 hover:bg-slate-100 rounded">
                        <Minus className="w-3 h-3 text-slate-600" />
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1 hover:bg-slate-100 rounded">
                        <Plus className="w-3 h-3 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-200 space-y-3 bg-slate-50">
            <div className="flex justify-between text-sm font-bold text-slate-800">
              <span>মোট (Subtotal):</span>
              <span className="text-emerald-600">৳{subtotal}</span>
            </div>
            <button className="w-full h-11 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-700 transition">
              চেকআউট করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
