"use client";

import {useCart} from "@/store/useCart";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {DollarSign, FolderOpen, Minus, Package, Plus, ShoppingCart, Trash2,} from "lucide-react";
import {motion} from "framer-motion";
import {sendCartWhatsAppMessage} from "@/utils/sendCartWhatsAppMessage";
import Link from "next/link";

export default function CartPage() {
  const {cart, removeFromCart, updateQuantity, clearCart} = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-[70vh] text-center p-6"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, ease: "easeOut"}}
      >
        <FolderOpen className="h-10 w-10 text-muted-foreground mb-3"/>
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Your cart is empty 🛒
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start shopping and add items to your cart!
        </p>
      </motion.div>
    );
  }

  const itemVariants = {
    hidden: {opacity: 0, y: 40, scale: 0.95},
    visible: {opacity: 1, y: 0, scale: 1},
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-8">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2"
        initial={{opacity: 0, y: -10}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        viewport={{once: true, amount: 0.3}}
      >
        <ShoppingCart className="h-7 w-7 text-primary"/>
        Shopping Cart
      </motion.h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item, i) => (
          <motion.div
            key={item._id}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            transition={{duration: 0.4, delay: i * 0.1}}
            viewport={{once: true, amount: 0.2}}
          >
            <Card className="shadow-sm border rounded-2xl">
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-full sm:w-28 h-40 sm:h-28 flex items-center justify-center bg-muted rounded-lg">
                    <Package className="h-6 w-6 text-muted-foreground"/>
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <Link
                    href={`/products/${item._id}`}
                    className="text-lg font-semibold leading-tight hover:text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <DollarSign className="h-4 w-4"/> {item.price.toFixed(2)}{" "}
                    each
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                    >
                      <Minus className="w-4 h-4"/>
                    </Button>
                    <span className="px-2 sm:px-3 font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4"/>
                    </Button>
                  </div>
                </div>

                <div className="flex sm:flex-col justify-between sm:justify-center sm:items-end gap-3 sm:gap-2">
                  <span className="text-base sm:text-lg font-bold flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600"/>
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <Trash2 className="w-4 h-4"/>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Section */}
      <motion.div
        initial={{opacity: 0, y: 30}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.2}}
        viewport={{once: true, amount: 0.3}}
      >
        <Card className="shadow-md border rounded-2xl sticky bottom-0 sm:static">
          <CardContent className="p-4 sm:p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
              <span className="flex items-center gap-1">
                <DollarSign className="h-5 w-5 text-green-600"/> Total:
              </span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={clearCart}
                className="flex-1 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4"/> Clear Cart
              </Button>
              <Button
                className="flex-1 flex items-center gap-2"
                onClick={() => sendCartWhatsAppMessage(cart)}
              >
                <DollarSign className="w-4 h-4"/> Proceed to Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
