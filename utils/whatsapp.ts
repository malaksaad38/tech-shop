export function sendWhatsAppMessage(product: any) {
  const phoneNumber = "923015488577"; // without + for wa.me links
  const message = `
*🛍️ New Order Request*

*Product:*      ${product.name}
*Price:*          $${product.price}

📦 View Product: https://pak-shop.vercel.app/products/${product._id}

Please confirm availability. ✅
`;

  // Encode message for URL
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
