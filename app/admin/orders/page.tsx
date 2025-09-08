"use client";

import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {Calendar, ClipboardList, DollarSign, Loader2, Mail, MapPin, Phone, User} from "lucide-react";
import {motion} from "framer-motion";
import AdminControl from "@/components/AdminControl";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <AdminControl>
      <div className="container mx-auto py-6 px-4 pl-8">
        {/* Title */}
        <motion.h1
          className="text-3xl font-bold mb-8 flex items-center gap-2"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          <ClipboardList className="h-8 w-8 text-primary"/>
          Orders
        </motion.h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-8 w-8 text-muted-foreground"/>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block rounded-xl border shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4"/> Customer
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4"/> Phone
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4"/> Email
                      </div>
                    </TableHead>
                    <TableHead className="max-w-[250px]">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4"/> Address
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4"/> Total
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4"/> Date
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, i) => (
                    <motion.tr
                      key={order._id}
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.3, delay: i * 0.05}}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-medium">{order.customer?.name}</TableCell>
                      <TableCell className="text-muted-foreground">{order.customer?.phone}</TableCell>
                      <TableCell className="text-muted-foreground">{order.customer?.email || "-"}</TableCell>
                      <TableCell className="max-w-[250px] truncate text-muted-foreground">
                        {order.customer?.address || "-"}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ${Number(order.totalAmount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge className={"bg-yellow-500 text-foreground"}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                    </motion.tr>
                  ))}

                  {orders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="grid gap-4 md:hidden">
              {orders.map((order, i) => (
                <motion.div
                  key={order._id}
                  className="border rounded-xl p-4 shadow-sm bg-card"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.3, delay: i * 0.05}}
                >
                  <div className="flex items-center gap-2 font-semibold text-lg mb-2">
                    <User className="h-5 w-5 text-primary"/>
                    {order.customer?.name}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4"/> {order.customer?.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4"/> {order.customer?.email || "-"}
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5"/> {order.customer?.address || "-"}
                    </p>
                    <p className="flex items-center gap-2 font-semibold text-green-600">
                      <DollarSign className="h-4 w-4"/> ${Number(order.totalAmount).toFixed(2)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Badge className={"bg-yellow-500 text-foreground"}>{order.status}</Badge>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4"/>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}

              {orders.length === 0 && (
                <p className="text-center text-muted-foreground">No orders found</p>
              )}
            </div>
          </>
        )}
      </div>
    </AdminControl>
  );
}
