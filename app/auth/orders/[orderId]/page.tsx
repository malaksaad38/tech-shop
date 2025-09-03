"use client";

import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {motion} from "framer-motion";
import {Activity, Calendar, ClipboardCheck, CreditCard, Mail, MapPin, Phone, ShoppingCart, User} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function OrderIdPage() {
  const params = useParams();
  const orderId = params?.orderId;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center mt-10">Loading order...</p>;
  if (!order) return <p className="text-center mt-10">Order not found</p>;

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
    >
      {/* Order Details */}
      <Card className="mb-6">
        <CardHeader className="flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-primary"/>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="flex items-center gap-2"><Activity className="w-4 h-4 text-muted-foreground"/>
            <strong>Status:</strong> {order.status}</p>
          <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground"/>
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </CardContent>
      </Card>

      {/* Customer Info */}
      <Card className="mb-6">
        <CardHeader className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary"/>
          <CardTitle>Customer Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground"/>
            <strong>Name:</strong> {order.customerInfo?.name || "N/A"}</p>
          <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground"/>
            <strong>Email:</strong> {order.customerInfo?.email || "N/A"}</p>
          <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground"/>
            <strong>Phone:</strong> {order.customerInfo?.phone || "N/A"}</p>
          <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground"/>
            <strong>Address:</strong> {order.customerInfo?.address || "N/A"}</p>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardHeader className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary"/>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {transition: {staggerChildren: 0.1}}
            }}
          >
            {order.products?.length ? (
              order.products.map((item: any, i: number) => (
                <motion.li
                  key={i}
                  className="mb-2 flex items-center gap-2"
                  initial={{opacity: 0, x: -10}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.3}}
                >
                  <ShoppingCart className="w-4 h-4 text-muted-foreground"/>
                  {item.product?.name || "Product"} × {item.quantity || 0} - ${(item.price || 0).toFixed(2)}
                </motion.li>

              ))

            ) : (
              <li>No products found</li>
            )}
          </motion.ul>
          <p className="mt-4 font-bold text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary"/> Total Amount: ${(order.totalAmount || 0).toFixed(2)}
          </p>
        </CardContent>
      </Card>
      <Link href={"/auth/orders"}>
        <Button className={"mt-4"} variant={"default"}>All Orders</Button>
      </Link>

    </motion.div>
  );
}
