export function sendCartWhatsAppMessage(cart: any[]) {
  const phoneNumber = "923015488577"; // WhatsApp number without '+'

  if (cart.length === 0) return;

  let message = `*🛒 New Cart Order Request*\n\n`;

  cart.forEach((item, index) => {
    message += `
*${index + 1}. Product:* ${item.name}
*Price:* $${item.price.toFixed(2)}
*Quantity:* ${item.quantity}
📦 View Product: https://pak-shop.vercel.app/products/${item._id}
`;
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  message += `\n*Total:* $${total.toFixed(2)}\n\nPlease confirm availability. ✅`;

  // Encode message for WhatsApp URL
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
