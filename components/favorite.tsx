"use client"
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {HeartIcon, HeartOffIcon} from "lucide-react";

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
        className={`min-w-9 ${isFavorite ? "border-rose-500" : " border-foreground/50"}`}
      >
        {isFavorite ? <HeartIcon className={"text-rose-500"}/> : <HeartOffIcon/>}
      </Button>
    </div>
  );
};

export default Favorite;