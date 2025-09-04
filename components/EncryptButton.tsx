"use client";

import {ReactNode, useRef, useState} from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

interface EncryptButtonProps {
  link?: string;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export default function EncryptButton({
                                        link = "/",
                                        label,
                                        icon,
                                        className,
                                      }: EncryptButtonProps) {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [text, setText] = useState(label);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = label
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= label.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(label);
  };

  return (
    <Button
      onClick={() => router.push(link)}
      className={cn(
        "relative overflow-hidden group text-white hover:bg-gray-800",
        className
      )}
    >
      {/* Content wrapper */}
      <motion.div
        whileHover={{scale: 1.025}}
        whileTap={{scale: 0.975}}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        className="relative flex items-center gap-2 px-3 py-2 md:px-4 rounded-lg"
      >
        <span className="relative z-10 flex items-center gap-2">
          {icon}
          {text}
        </span>

        {/* gradient animation */}
        <motion.span
          initial={{y: "100%"}}
          animate={{y: "-100%"}}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          }}
          className="absolute inset-0 z-0 w-full scale-125
            bg-gradient-to-t from-indigo-400/0 from-40%
            via-indigo-400/100 to-indigo-400/0 to-60%
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100"
        />
      </motion.div>
    </Button>
  );
}
