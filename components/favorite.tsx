"use client"
import React, {useState} from 'react';

const Favorite = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <button
        onClick={toggleFavorite}
        className={`p-2 rounded-lg transition border border-green-300 hover:bg-green-50`}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default Favorite;