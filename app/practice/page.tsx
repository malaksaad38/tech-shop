"use client"
import React, {useEffect, useState} from 'react';

const Practice = () => {
  const [light, setLight] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
      if (count === 5)
        setLight(true);
    }
    , [count]);


  return (
    <div>


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