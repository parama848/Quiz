import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WordSearchGame = ({ onComplete }) => {
  const words = ["CAT", "DOG", "APPLE"];
  const grid = [
    ["C", "A", "T", "X", "Y"],
    ["X", "D", "O", "G", "Z"],
    ["A", "P", "P", "L", "E"],
    ["X", "X", "X", "X", "X"],
    ["Y", "Z", "X", "X", "X"],
  ];

  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (row, col) => {
    setIsMouseDown(true);
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown) {
      setSelectedCells((prev) => {
        const exists = prev.some((c) => c.row === row && c.col === col);
        return exists ? prev : [...prev, { row, col }];
      });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    const selectedWord = selectedCells.map((c) => grid[c.row][c.col]).join("");
    const reversedWord = selectedWord.split("").reverse().join(""); // allow reverse selection

    const found =
      words.includes(selectedWord) || words.includes(reversedWord);

    if (found) {
      const wordFound = words.find(
        (w) => w === selectedWord || w === reversedWord
      );
      if (!foundWords.includes(wordFound)) {
        setFoundWords([...foundWords, wordFound]);
      }
    }

    setSelectedCells([]);
  };

  useEffect(() => {
    if (foundWords.length === words.length) {
      setTimeout(onComplete, 1000);
    }
  }, [foundWords]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 select-none"
      onMouseUp={handleMouseUp}
    >
      <h1 className="text-3xl font-bold text-white mb-6 animate-bounce">
        Word Search Challenge
      </h1>

      <div className="grid grid-cols-5 gap-2">
        {grid.flatMap((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const isSelected = selectedCells.some(
              (c) => c.row === rowIndex && c.col === colIndex
            );
            const isFound = foundWords.some((word) =>
              word.includes(letter)
            );

            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                className={`w-14 h-14 flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all
                  ${isSelected ? "bg-yellow-400 text-white shadow-lg" : ""}
                  ${isFound ? "bg-green-500 text-white shadow-xl" : "bg-white text-gray-800"} 
                  hover:shadow-xl`}
              >
                {letter}
              </motion.div>
            );
          })
        )}
      </div>

      <div className="mt-6 flex space-x-4">
        {words.map((word) => (
          <span
            key={word}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              foundWords.includes(word)
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-gray-800 border border-gray-300"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordSearchGame;
