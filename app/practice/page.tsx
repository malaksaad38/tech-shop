"use client"
import React, {useEffect, useRef, useState} from 'react';
import {motion} from "motion/react"
import ElectricBorder from "@/components/ElectricBorder";

const Practice = () => {
  const [light, setLight] = useState(false);
  const [count, setCount] = useState(0);


  useEffect(() => {
      if (count === 5)
        setLight(true);
    }
    , [count]);

  const constraintsRef = useRef<HTMLDivElement>(null)

  const box = {
    width: 100,
    height: 100,
    backgroundColor: "#0cdcf7",
    borderRadius: 5,
  }
  const variants = {
    visible: {opacity: 1},
    hidden: {opacity: 0},
    danger: {backgroundColor: "red"},

  }
  const constraints = {
    width: "100vw",
    height: "100vh",
    backgroundColor: "lightblue",
    borderRadius: 10,
  }

  return (
    <div className={"min-w-32 min-h-32 m-10 mx-10"}>
      <ElectricBorder
        color="#7df9ff"
        speed={0.5}
        chaos={0.5}
        thickness={2}
        style={{borderRadius: 16}}
      >
        <div className={"w-32 h-32 m-10 mx-10"}>
          <p style={{margin: '6px 0 0', opacity: 0.8}}>
            A glowing, animated border wrapper.
          </p>
        </div>
      </ElectricBorder>
      <div className="h-screen">
        <motion.div ref={constraintsRef} style={constraints}>
          <motion.div

            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            style={box}
          />
        </motion.div>
      </div>
      <div className="flex justify-center items-center h-screen gap-20">

        <motion.div style={box} drag whileDrag={{scale: 1.2, backgroundColor: "#f00"}}/>
        <motion.div
          style={box}
          variants={variants}
          initial="hidden"
          whileInView={["visible", "danger"]}

          whileHover={{
            scale: [null, 1.1, 1.6],
            transition: {
              duration: 0.5,
              times: [0, 0.6, 1],
              ease: ["easeInOut", "easeOut"],
            },
          }}

          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          whileTap={{
            scale: 0.8,
            translateY: [-50, 1]
          }}

        />


        <motion.div

          animate={{

            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            translateX: [300, 10],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={box}
        />
      </div>


      <div className={light ? "bg-yellow-300 p-4" : "bg-gray-700 p-4 text-white"}>Light</div>
      <button onClick={() => setLight(!light)}
              className={"rounded-b-2xl p-3  mb-2 bg-sky-500 hover:bg-sky-700 "}> {!light ? "On" : "Off"}

      </button>
      <div className={"bg-gray-700 p-4"}>Counter: {count}</div>
      <button onClick={() => setCount(count + 1)}
              className={"bg-green-500 hover:bg-green-700 p-2 rounded-b-2xl"}>Count
      </button>
      <button onClick={() => setCount(0)} className={"inline bg-red-700 rounded-b-2xl p-2 ml-2"}>Reset</button>

    </div>
  );
};

export default Practice;