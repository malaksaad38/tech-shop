"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar, DollarSign, Loader2, Package, Tag} from "lucide-react";
import {useTranslations} from "next-intl";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("MyOrders");

  useEffect(() => {
    const customer = localStorage.getItem("customer");
    if (!customer) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const {_id} = JSON.parse(customer);

    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?customer=${_id}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground"/>
      </div>
    );
  }

  return (
    <div className="container textsm max-w-3xl mx-auto py-10 px-4">
      <motion.h1
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-3xl font-bold mb-8 text-center"
      >
        {t("title")}
      </motion.h1>

      {orders.length === 0 ? (
        <p className="text-center text-muted-foreground">{t("noOrders")}</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order._id}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: i * 0.05}}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary"/>
                    <Link
                      href={`/auth/orders/${order._id}`}
                      className="hover:text-primary hover:underline text-sm md:text-lg"
                    >
                      {t("order")} #{order._id}
                    </Link>
                  </CardTitle>
                  <Tag className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500"/>
                    <span>{t("total")}: ${Number(order.totalAmount).toFixed(2)}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-blue-500"/>
                    <span>{t("status")}: {order.status}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground"/>
                    <span>{t("date")}: {new Date(order.createdAt).toLocaleDateString()}</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
