import React from 'react';
import Link from 'next/link';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Banner */}
      <div className="bg-green-700 text-white text-center py-8 shadow-md">
        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-2">
          🇵🇰 About Pakistan Independence Day
        </h1>
        <p className="text-sm mt-2">Celebrating Freedom Since 14th August 1947</p>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl text-gray-700">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Our Story</h2>
        <p className="mb-6 leading-relaxed">
          On 14th August 1947, Pakistan emerged as an independent nation, marking the end of British colonial
          rule and the creation of a homeland for Muslims of the Indian subcontinent. This day symbolizes
          freedom, unity, and the vision of our founding fathers. Every year, Pakistanis across the globe
          celebrate this day with pride and honor.
        </p>

        <h2 className="text-2xl font-bold text-green-800 mb-4">Why We Celebrate</h2>
        <p className="mb-6 leading-relaxed">
          Independence Day is a reminder of the sacrifices made by countless individuals for the sake of our
          freedom. It’s a time to reflect on our achievements, cherish our culture, and strengthen our
          commitment to making Pakistan a prosperous nation.
        </p>

        <h2 className="text-2xl font-bold text-green-800 mb-4">Our Mission</h2>
        <p className="mb-6 leading-relaxed">
          Our mission is to promote patriotism, celebrate Pakistan’s rich heritage, and inspire future
          generations to contribute positively to our beloved country.
        </p>

        {/* Back to Home Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
