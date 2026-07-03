import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { ShoppingCart, X as XIcon } from "lucide-react";
import type { Product } from "../../types";
import { Btn } from "./Btn";

/**
 * CartToast — Confirmation toast after adding to cart.
 */
export function CartToast({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed top-14 right-4 z-[200] animate-[fadeIn_0.2s_ease-out] bg-white border border-[#E5E7EB] rounded-[6px] shadow-lg p-4 w-80">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-[#F1F3F5] rounded-[6px] overflow-hidden shrink-0">
          {product.image ? (
            <img loading="lazy" src={product.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#CBD5E1]">
              <ShoppingCart className="w-5 h-5" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[13px] text-[#16A34A] font-medium mb-1">
            <CheckCircle className="w-3.5 h-3.5" /> Added to Cart
          </div>
          <div className="text-[14px] font-medium text-[#1B2332] line-clamp-1">{product.name}</div>
          <div className="text-[13px] text-[#475569]">${product.price.toFixed(2)}</div>
        </div>
        <button onClick={onClose} className="text-[#94A3B8] hover:text-[#475569]">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * MiniCartDrawer — Slide-in cart summary.
 */
export function MiniCartDrawer({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: { product: Product; qty: number }[];
}) {
  if (!open) return null;
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-[190]" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-96 max-w-full bg-white shadow-xl z-[200] flex flex-col animate-[slideInRight_0.25s_ease-out]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
          <h3 className="text-[15px] font-semibold text-[#1B2332]">
            Cart ({items.length} {items.length === 1 ? "item" : "items"})
          </h3>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#1B2332]">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3 pb-4 border-b border-[#E5E7EB] last:border-0 last:pb-0">
              <div className="w-14 h-14 bg-[#F1F3F5] rounded-[6px] overflow-hidden shrink-0">
                {item.product.image ? (
                  <img loading="lazy" src={item.product.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#CBD5E1]">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-[#1B2332] line-clamp-1">{item.product.name}</div>
                <div className="text-[13px] text-[#475569]">
                  Qty: {item.qty} × ${item.product.price.toFixed(2)}
                </div>
              </div>
              <div className="text-[14px] font-semibold text-[#1B2332] shrink-0">
                ${(item.product.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#E5E7EB] p-5">
          <div className="flex justify-between mb-4">
            <span className="text-[14px] font-semibold text-[#1B2332]">Subtotal</span>
            <span className="text-[17px] font-semibold text-[#1B2332]">${total.toFixed(2)}</span>
          </div>
          <Btn size="lg" className="w-full" onClick={onClose}>
            View Cart
          </Btn>
        </div>
      </div>
    </>
  );
}
