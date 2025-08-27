"use client"
import {useRef, useState} from "react";
import {motion} from "framer-motion";
import {LockIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";


const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";


const EncryptButton = ({link = "/", label = "Admin"}) => {
  const intervalRef = useRef(null);
  const router = useRouter()
  const [text, setText] = useState(label);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = label.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
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
    clearInterval(intervalRef.current || undefined);

    setText(label);
  };

  return (
    <Button onClick={() => router.push(link)}
            className={"p-0 m-0 bg-gray-700 text-white hover:bg-gray-900 hover:border"}>
      <motion.div
        whileHover={{
          scale: 1.025,
        }}
        whileTap={{
          scale: 0.975,
        }}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        className=" flex justify-center items-center w-full group relative overflow-hidden rounded-lg  px-4 py-2  transition-colors "
      >
        <div className="relative z-10 flex items-center gap-2 ">
          <LockIcon size={"15"}/>
          <span>{text}</span>
        </div>
        <motion.span
          initial={{y: "100%"}}
          animate={{y: "-100%"}}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          }}
          whileTap={{opacity: 1}} // 👈 mobile tap effect
          className="duration-300 w-full absolute inset-0 z-0 scale-125
             bg-gradient-to-t from-indigo-400/0 from-40%
             via-indigo-400/100 to-indigo-400/0 to-60%
             opacity-0 transition-opacity
             group-hover:opacity-100 group-focus:opacity-100" // 👈 works on tap/focus too
        />

      </motion.div>
    </Button>

  );
};

export default EncryptButton;