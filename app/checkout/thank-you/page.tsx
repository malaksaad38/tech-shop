"use client";

import {motion} from "framer-motion";
import {CheckCircle} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 sm:px-6 text-center">
      {/* Icon */}
      <motion.div
        initial={{scale: 0}}
        animate={{scale: 1}}
        transition={{type: "spring", stiffness: 200, damping: 15}}
        className="mb-6"
      >
        <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-green-500"/>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        Thank You for Your Order!
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-sm sm:text-base text-muted-foreground max-w-md mb-6 sm:mb-8"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.3}}
      >
        Your order has been placed successfully. We’ll send you a confirmation
        email shortly with all the details.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none justify-center items-center"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.5}}
      >
        <Link href="/products" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto rounded-2xl shadow-md">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/checkout/order-details" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto rounded-2xl">
            View My Orders
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
