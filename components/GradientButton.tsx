"use client";

import {motion} from "framer-motion";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {ReactNode} from "react";

interface GradientButtonProps {
  link?: string;
  label?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GradientButton({
                                         link,
                                         label,
                                         icon,
                                         className,
                                         onClick,
                                       }: GradientButtonProps) {
  const content = (
    <>
      {/* gradient motion background */}
      <motion.span
        initial={{y: "100%"}}
        animate={{y: "-100%"}}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 scale-125
          bg-gradient-to-t from-indigo-400/0 from-40%
          via-indigo-400/100 to-indigo-400/0 to-60%
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* content wrapper */}
      <span className="relative z-10 flex items-center gap-2">
        {icon} {label}
      </span>
    </>
  );

  if (link) {
    return (

      <Button
        asChild
        onClick={onClick}
        className={cn(
          "relative overflow-hidden group text-white hover:bg-gray-800",
          className
        )}
      >
        <Link href={link}>{content}</Link>
      </Button>
    );
  }

}
