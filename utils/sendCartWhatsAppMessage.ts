export function sendCartWhatsAppMessage(cart: any[], user?: {
  name: string;
  number: string;
  email: string;
  address: string;
}) {
  const phoneNumber = "923015488577"; // WhatsApp number without '+'

  if (cart.length === 0) return;

  let message = `*🛒 New Cart Order Request*\n\n`;

  // Add user details if available
  if (user) {
    message += `*👤 Customer Details:*\n`;
    message += `*Name:* ${user.name}\n`;
    message += `*Phone:* ${user.number}\n`;
    message += `*Email:* ${user.email}\n`;
    message += `*Address:* ${user.address}\n\n`;
  }

  // Add product details
  cart.forEach((item, index) => {
    message += `*${index + 1}. Product:* ${item.name}\n`;
    message += `*Price:* $${item.price.toFixed(2)}\n`;
    message += `*Quantity:* ${item.quantity}\n`;
    message += `📦 View Product: https://pak-shop.vercel.app/products/${item._id}\n\n`;
  });

  // Add total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  message += `*Total:* $${total.toFixed(2)}\n\nPlease confirm availability. ✅`;

  // Encode and send
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
