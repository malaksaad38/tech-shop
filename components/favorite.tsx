"use client"
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {HeartIcon, HeartPlusIcon} from "lucide-react";

const Favorite = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <Button
        onClick={toggleFavorite}
        size={"icon"}
        variant="outline"
        className="min-w-9"
      >
        {isFavorite ? <HeartPlusIcon/> : <HeartIcon/>}
      </Button>
    </div>
  );
};

export default Favorite;