// components/ui/popover.tsx
"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {cn} from "@/lib/utils";
import {X} from "lucide-react";
import {sendCartWhatsAppMessage} from "@/utils/sendCartWhatsAppMessage";
import {useCart} from "@/store/useCart";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

interface PopoverContentProps extends PopoverPrimitive.PopoverContentProps {
  className?: string;
  onCheckout?: () => void;
}

function PopoverContent({
                          className,
                          align = "end",
                          sideOffset = 6,
                          children,
                          onCheckout,
                          ...props
                        }: PopoverContentProps) {
  const {cart} = useCart();

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        {...props}
        className={cn(
          "z-50 w-full max-w-xs sm:max-w-sm md:max-w-md " +
          "rounded-2xl border border-gray-200 dark:border-gray-700 " +
          "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md " +
          "shadow-lg max-h-[85vh] flex flex-col " +
          "animate-in fade-in-0 zoom-in-95 " +
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
      >
        {/* Close button (X) */}
        <PopoverPrimitive.Close
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-300"/>
        </PopoverPrimitive.Close>

        {/* Scrollable content */}
        <div className="p-4 overflow-y-auto flex-1">{children}</div>

        {/* Sticky Checkout button */}

      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

export {Popover, PopoverTrigger, PopoverContent};
export type {PopoverPrimitive as PopoverPrimitiveTypes};
