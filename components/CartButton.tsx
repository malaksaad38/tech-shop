"use client";
import {ShoppingCart} from "lucide-react";
import {useCart} from "@/store/useCart";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";

const CartButton = () => {
  const {cart} = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Popover>
      {/* 🔹 Cart button opens popover */}
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

      {/* 🔹 Popover content (dropdown cart) */}
      <PopoverContent className="w-80 p-4 z-[60]">
        <h3 className="font-semibold mb-2">Shopping Cart</h3>

        {cart.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your cart is empty</p>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Button className="w-full mt-2">Checkout</Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CartButton;
