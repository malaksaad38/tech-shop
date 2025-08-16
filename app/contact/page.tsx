"use client";
import React, {useState} from "react";
import Link from "next/link";

const Contact = () => {
  const [form, setForm] = useState({name: "", email: "", message: ""});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({...form, [e.target.id]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "923015488577"; // 👈 your WhatsApp number (with country code, no + sign)
    const text = `📩 New Contact Message\n\n👤 Name: ${form.name}\n📧 Email: ${form.email}\n💬 Message: ${form.message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    // open WhatsApp chat
    window.open(url, "_blank");

    // optional: reset form
    setForm({name: "", email: "", message: ""});
  };

  return (
    <div className="bg-gradient-to-b from-green-100 via-white to-green-50 min-h-screen text-gray-800">
      {/* Banner */}
      <div className="bg-green-700 text-white text-center py-8 shadow-md">
        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-2">
          Contact Us
        </h1>
        <p className="text-sm mt-2">We’d love to hear from you on WhatsApp!</p>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 text-white shadow-lg rounded-lg p-8 border border-green-600"
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-green-400 font-semibold mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-green-600 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-green-400 font-semibold mb-2">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-green-600 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-green-400 font-semibold mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows={5}
              required
              className="w-full border border-green-600 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Send via WhatsApp
          </button>
        </form>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
