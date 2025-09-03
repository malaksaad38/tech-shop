"use client";

import {useEffect, useState} from "react";
import {useCart} from "@/store/useCart";
import {useAuth} from "@/hooks/useAuth";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {DollarSign, Package, ShoppingBag} from "lucide-react";
import {motion} from "framer-motion";
import {sendCartWhatsAppMessage} from "@/utils/sendCartWhatsAppMessage";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useTranslations} from "next-intl";

export default function CheckoutPage() {
  const t = useTranslations("Checkout");

  const {cart, clearCart} = useCart();
  const {customer, loading: authLoading} = useAuth(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    address: "",
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const router = useRouter();

  // ✅ Prefill customer info
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        number: customer.phone || "",
        email: customer.email || "",
        address: customer.address || "",
      });
    }
  }, [customer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleCheckout = async () => {
    setErrorMsg(null);

    if (!formData.name || !formData.number || !formData.address) {
      setErrorMsg(t("requiredFields"));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/orders", {
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        customer: customer?._id || null,
        customerInfo: formData,
        totalAmount: total,
      });

      sendCartWhatsAppMessage(cart, formData);
      clearCart();
      router.push(`/checkout/thank-you?orderId=${response.data._id}`);
    } catch (err: any) {
      setErrorMsg(t("checkoutFailed"));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <p className="text-center mt-10">{t("loading")}</p>;

  if (cart.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-[70vh] text-center p-6"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, ease: "easeOut"}}
      >
        <ShoppingBag className="h-10 w-10 text-muted-foreground mb-3"/>
        <h2 className="text-2xl font-semibold text-muted-foreground">
          {t("emptyCartTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("emptyCartText")}
        </p>
        <Link href="/products">
          <Button className="mt-4">{t("goToProducts")}</Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-8">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2"
        initial={{opacity: 0, y: -10}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        viewport={{once: true, amount: 0.3}}
      >
        <ShoppingBag className="h-7 w-7 text-primary"/>
        {t("checkout")}
      </motion.h1>

      {/* Order Summary */}
      <Card className="shadow-sm border rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary"/>
            {t("yourOrder")}
          </h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm sm:text-base border-b pb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-lg sm:text-xl font-bold pt-2">
            <span className="flex items-center gap-1">
              <DollarSign className="h-5 w-5 text-green-600"/> {t("total")}
            </span>
            <span>${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Customer Info */}
      <Card className="shadow-sm border rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">{t("customerInfo")}</h2>
          <div className="grid gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">{t("fullName")}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!!customer?.name}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number">{t("phoneNumber")}</Label>
              <Input
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                disabled={!!customer?.phone}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!!customer?.email}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t("deliveryAddress")}</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              className="flex-1 flex items-center gap-2"
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
            >
              {loading ? t("processing") : (<><DollarSign className="w-4 h-4"/> {t("placeOrder")}</>)}
            </Button>
            <Link href="/cart" className="flex-1">
              <Button variant="outline" className="w-full">
                {t("backToCart")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
