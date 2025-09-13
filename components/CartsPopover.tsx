"use client";

import React from "react";
import Link from "next/link";
import {DollarSign, FolderOpen, Minus, Package, Plus, ShoppingCart, Trash2,} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useCart} from "@/store/useCart";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import ClickSpark from "@/components/ClickSpark";

const CartsPopover = () => {
  const {cart, removeFromCart, updateQuantity, clearCart} = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const router = useRouter();
  const t = useTranslations("cartsPopover");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative md:border" aria-label={t("openMenu")}>
          <ShoppingCart className="h-5 w-5"/>
          {totalItems > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-4 z-[60]">
        <ClickSpark
          sparkColor="blue"
          sparkSize={10}
          sparkRadius={25}
          sparkCount={20}
          duration={500}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary"/> {t("title")}
            </h3>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center gap-2 py-6">
              <FolderOpen className="h-8 w-8 text-muted-foreground"/>
              <p className="text-sm text-muted-foreground">{t("empty")}</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-56 overflow-y-auto pb-2 pr-2">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-3 border rounded p-2 px-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted/40 rounded flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground"/>
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/products/${item._id}`}
                          className="font-medium text-sm hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm font-semibold flex items-center gap-1">
                          <DollarSign className="h-4 w-4"/>
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="mt-1 flex items-center gap-2">
                          <Button
                            className="rounded-full"
                            variant="ghost"
                            size="icon"
                            aria-label={t("decrease")}
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4 text-yellow-500"/>
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button
                            className="rounded-full"
                            variant="ghost"
                            size="icon"
                            aria-label={t("increase")}
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4 text-green-500"/>
                          </Button>
                        </div>
                        <Button
                          className="rounded-full"
                          variant="ghost"
                          size="icon"
                          aria-label={t("remove")}
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
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-green-600"/> {t("total")}
                </span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-5 gap-2 w-full">
                  <Button
                    variant="destructive"
                    className="col-span-1"
                    onClick={() => clearCart()}
                    aria-label={t("clear")}
                  >
                    <Trash2 className="h-4 w-4"/>
                  </Button>

                  <Link href="/cart" className="col-span-2">
                    <Button className="w-full flex items-center gap-1">
                      <ShoppingCart className="h-4 w-4"/> {t("goToCart")}
                    </Button>
                  </Link>

                  <Button
                    className="col-span-2 w-full flex items-center gap-1"
                    onClick={() => router.push("/checkout")}
                    aria-label={t("checkout")}
                  >
                    <DollarSign className="h-4 w-4"/> {t("checkout")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </ClickSpark>
      </PopoverContent>
    </Popover>
  );
};

export default CartsPopover;
