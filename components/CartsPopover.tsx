'use client'
import React from "react";
import Link from "next/link";
import {Minus, Plus, ShoppingCart, Trash2,} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useCart} from "@/store/useCart";
import {sendCartWhatsAppMessage} from "@/utils/sendCartWhatsAppMessage";

const CartsPopover = () => {
  const {cart, removeFromCart, updateQuantity, clearCart} = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5"/>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">
              {totalItems}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-4 z-[60]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
        </div>

        {cart.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your cart is empty 🛒</p>
        ) : (
          <>
            <div className="space-y-3 max-h-56 overflow-y-auto pb-2">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-muted/40 rounded flex items-center justify-center">
                      N/A
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4"/>
                      </Button>
                      <span className="text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4"/>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500"/>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <div className="flex justify-between font-bold mb-2">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-5 gap-2 w-full">
                <Button variant="outline" className="col-span-1" onClick={() => clearCart()}>
                  Clear
                </Button>

                <Link href="/cart" className="col-span-2 ">
                  <Button className="w-full">Go to Cart</Button>
                </Link>
                <Button
                  className="col-span-2 w-full"
                  onClick={() => sendCartWhatsAppMessage(cart)}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default CartsPopover;