import React from 'react';
import Link from 'next/link';

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-green-100 via-white to-green-50 min-h-screen text-gray-800">
      {/* Banner */}
      <div className="bg-green-700 text-white text-center py-8 shadow-md">
        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-2">
          🇵🇰 Contact Us
        </h1>
        <p className="text-sm mt-2">We’d love to hear from you!</p>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <form className="bg-gray-900 text-white shadow-lg rounded-lg p-8 border border-green-600">
          <div className="mb-6">
            <label htmlFor="name" className="block text-green-400 font-semibold mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
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
              placeholder="Enter your email"
              className="w-full border border-green-600 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-green-400 font-semibold mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message..."
              rows={5}
              className="w-full border border-green-600 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Send Message
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
