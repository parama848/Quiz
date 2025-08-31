import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Game({ level, onComplete }) {
  const [score, setScore] = useState(0);

  const handleComplete = () => {
    alert(`Congrats! You completed the ${level} game.`);
    onComplete();
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1 className="text-4xl font-bold mb-10 animate-bounce">
        {level} Level Game
      </motion.h1>

      <motion.button
        className="px-8 py-4 bg-white text-red-500 rounded-full font-bold shadow-lg hover:bg-gray-200"
        onClick={handleComplete}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95, rotate: 0 }}
      >
        Complete Game
      </motion.button>
    </motion.div>
  );
}
