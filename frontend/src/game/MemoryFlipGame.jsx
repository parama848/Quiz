// // // // src/games/MemoryFlipGame.jsx
// // // import React, { useState, useEffect } from "react";
// // // import { motion } from "framer-motion";

// // // const symbols = ["🍎", "🍎", "🚗", "🚗", "🎵", "🎵", "🐶", "🐶"];

// // // export default function MemoryFlipGame() {
// // //   const [cards, setCards] = useState([]);
// // //   const [flipped, setFlipped] = useState([]);
// // //   const [matched, setMatched] = useState([]);
// // //   const [moves, setMoves] = useState(0);

// // //   // Shuffle cards when game starts
// // //   useEffect(() => {
// // //     setCards(symbols.sort(() => Math.random() - 0.5));
// // //   }, []);

// // //   const handleFlip = (index) => {
// // //     if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

// // //     setFlipped([...flipped, index]);

// // //     if (flipped.length === 1) {
// // //       setMoves(moves + 1);
// // //       const first = flipped[0];
// // //       const second = index;

// // //       if (cards[first] === cards[second]) {
// // //         setMatched([...matched, first, second]);
// // //       }

// // //       setTimeout(() => {
// // //         setFlipped([]);
// // //       }, 1000);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-4">
// // //       <h1 className="text-3xl font-bold text-white mb-4">🃏 Memory Flip Game</h1>
// // //       <p className="text-white mb-4">Moves: {moves}</p>
// // //       <div className="grid grid-cols-4 gap-4">
// // //         {cards.map((symbol, index) => {
// // //           const isFlipped = flipped.includes(index) || matched.includes(index);
// // //           return (
// // //             <motion.div
// // //               key={index}
// // //               className={`w-20 h-24 cursor-pointer perspective`}
// // //               onClick={() => handleFlip(index)}
// // //               whileTap={{ scale: 0.9 }}
// // //             >
// // //               <motion.div
// // //                 className="relative w-full h-full transition-transform duration-500"
// // //                 animate={{ rotateY: isFlipped ? 180 : 0 }}
// // //                 style={{ transformStyle: "preserve-3d" }}
// // //               >
// // //                 {/* Back Side */}
// // //                 <div className="absolute w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center text-3xl"
// // //                   style={{ backfaceVisibility: "hidden" }}>
// // //                   ❓
// // //                 </div>
// // //                 {/* Front Side */}
// // //                 <div className="absolute w-full h-full bg-yellow-200 rounded-xl shadow-lg flex items-center justify-center text-3xl"
// // //                   style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
// // //                   {symbol}
// // //                 </div>
// // //               </motion.div>
// // //             </motion.div>
// // //           );
// // //         })}
// // //       </div>

// // //       {matched.length === cards.length && (
// // //         <motion.div
// // //           className="mt-6 text-white text-xl font-semibold"
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //         >
// // //           🎉 Congratulations! You won in {moves} moves!
// // //         </motion.div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // src/games/MemoryFlipGame.jsx
// // import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import Modal from "../components/Modal";
// // import levelCompleteSound from "../assets/level-complete.mp3";

// // const levelsData = {
// //   Easy: ["🍎", "🍎", "🚗", "🚗", "🎵", "🎵", "🐶", "🐶"],
// //   Medium: ["⚽", "⚽", "🏀", "🏀", "🎸", "🎸", "🐱", "🐱"],
// //   Difficult: ["🍕", "🍕", "🍔", "🍔", "🌟", "🌟", "🐻", "🐻"],
// // };

// // export default function MemoryFlipGame() {
// //   const [levelIndex, setLevelIndex] = useState(0);
// //   const [level, setLevel] = useState("Easy");
// //   const [cards, setCards] = useState([]);
// //   const [flipped, setFlipped] = useState([]);
// //   const [matched, setMatched] = useState([]);
// //   const [moves, setMoves] = useState(0);
// //   const [levelCompletedPopup, setLevelCompletedPopup] = useState(false);
// //   const [levelCompleteAudio] = useState(new Audio(levelCompleteSound));

// //   const levelOrder = ["Easy", "Medium", "Difficult"];

// //   // Initialize cards whenever level changes
// //   useEffect(() => {
// //     const symbols = levelsData[level];
// //     setCards(symbols.sort(() => Math.random() - 0.5));
// //     setFlipped([]);
// //     setMatched([]);
// //     setMoves(0);
// //   }, [level]);

// //   const handleFlip = (index) => {
// //     if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

// //     setFlipped([...flipped, index]);

// //     if (flipped.length === 1) {
// //       setMoves((prev) => prev + 1);
// //       const first = flipped[0];
// //       const second = index;

// //       if (cards[first] === cards[second]) {
// //         setMatched((prev) => [...prev, first, second]);
// //       }

// //       setTimeout(() => setFlipped([]), 1000);
// //     }
// //   };

// //   // Trigger level complete popup after finishing all matches
// //   useEffect(() => {
// //     if (matched.length === cards.length && cards.length > 0) {
// //       levelCompleteAudio.play();
// //       setTimeout(() => setLevelCompletedPopup(true), 500);
// //     }
// //   }, [matched, cards, levelCompleteAudio]);

// //   const handleLevelCompletedClose = () => {
// //     setLevelCompletedPopup(false);

// //     if (levelIndex + 1 < levelOrder.length) {
// //       const nextLevelIndex = levelIndex + 1;
// //       setLevelIndex(nextLevelIndex);
// //       setLevel(levelOrder[nextLevelIndex]);

// //       // Reset state for the new level
// //       setFlipped([]);
// //       setMatched([]);
// //       setMoves(0);
// //     } else {
// //       alert("🏆 You completed all levels!");
// //       // Reset to first level
// //       setLevelIndex(0);
// //       setLevel(levelOrder[0]);
// //       setFlipped([]);
// //       setMatched([]);
// //       setMoves(0);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-4">
// //       <h1 className="text-3xl font-bold text-white mb-4">🃏 Memory Flip Game - {level} Level</h1>
// //       <p className="text-white mb-4">Moves: {moves}</p>

// //       <div className="grid grid-cols-4 gap-4">
// //         {cards.map((symbol, index) => {
// //           const isFlipped = flipped.includes(index) || matched.includes(index);
// //           return (
// //             <motion.div
// //               key={index}
// //               className={`w-20 h-24 cursor-pointer perspective`}
// //               onClick={() => handleFlip(index)}
// //               whileTap={{ scale: 0.9 }}
// //             >
// //               <motion.div
// //                 className="relative w-full h-full transition-transform duration-500"
// //                 animate={{ rotateY: isFlipped ? 180 : 0 }}
// //                 style={{ transformStyle: "preserve-3d" }}
// //               >
// //                 <div
// //                   className="absolute w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center text-3xl"
// //                   style={{ backfaceVisibility: "hidden" }}
// //                 >
// //                   ❓
// //                 </div>
// //                 <div
// //                   className="absolute w-full h-full bg-yellow-200 rounded-xl shadow-lg flex items-center justify-center text-3xl"
// //                   style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
// //                 >
// //                   {symbol}
// //                 </div>
// //               </motion.div>
// //             </motion.div>
// //           );
// //         })}
// //       </div>

// //       {levelCompletedPopup && (
// //         <Modal>
// //           <div className="p-6 w-96 bg-green-200 rounded-2xl shadow-lg text-center">
// //             <h2 className="text-xl font-bold mb-4">🎉 You completed {level} level!</h2>
// //             <button
// //               onClick={handleLevelCompletedClose}
// //               className="px-6 py-2 bg-green-400 text-white rounded hover:bg-green-500"
// //             >
// //               Continue
// //             </button>
// //           </div>
// //         </Modal>
// //       )}
// //     </div>
// //   );
// // }

// // src/games/MemoryFlipGame.jsx
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const symbols = ["🍎", "🍎", "🚗", "🚗", "🎵", "🎵", "🐶", "🐶"];

// export default function MemoryFlipGame({ onComplete }) {
//   const [cards, setCards] = useState([]);
//   const [flipped, setFlipped] = useState([]);
//   const [matched, setMatched] = useState([]);
//   const [moves, setMoves] = useState(0);

//   // Shuffle cards when game starts
//   useEffect(() => {
//     setCards(symbols.sort(() => Math.random() - 0.5));
//   }, []);

//   const handleFlip = (index) => {
//     if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

//     setFlipped([...flipped, index]);

//     if (flipped.length === 1) {
//       setMoves((prev) => prev + 1);
//       const first = flipped[0];
//       const second = index;

//       if (cards[first] === cards[second]) {
//         setMatched((prev) => [...prev, first, second]);
//       }

//       setTimeout(() => {
//         setFlipped([]);
//       }, 1000);
//     }
//   };

//   // Call onComplete automatically when game is finished
//   useEffect(() => {
//     if (matched.length === cards.length && cards.length > 0) {
//       setTimeout(() => {
//         onComplete(); // Move to next quiz level automatically
//       }, 1500); // Delay so user can see congratulations message
//     }
//   }, [matched, cards, onComplete]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-4">
//       <h1 className="text-3xl font-bold text-white mb-4">🃏 Memory Flip Game</h1>
//       <p className="text-white mb-4">Moves: {moves}</p>
//       <div className="grid grid-cols-4 gap-4">
//         {cards.map((symbol, index) => {
//           const isFlipped = flipped.includes(index) || matched.includes(index);
//           return (
//             <motion.div
//               key={index}
//               className={`w-20 h-24 cursor-pointer perspective`}
//               onClick={() => handleFlip(index)}
//               whileTap={{ scale: 0.9 }}
//             >
//               <motion.div
//                 className="relative w-full h-full transition-transform duration-500"
//                 animate={{ rotateY: isFlipped ? 180 : 0 }}
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 {/* Back Side */}
//                 <div
//                   className="absolute w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center text-3xl"
//                   style={{ backfaceVisibility: "hidden" }}
//                 >
//                   ❓
//                 </div>
//                 {/* Front Side */}
//                 <div
//                   className="absolute w-full h-full bg-yellow-200 rounded-xl shadow-lg flex items-center justify-center text-3xl"
//                   style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
//                 >
//                   {symbol}
//                 </div>
//               </motion.div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {matched.length === cards.length && (
//         <motion.div
//           className="mt-6 text-white text-xl font-semibold"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           🎉 Congratulations! You won in {moves} moves!
//         </motion.div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MemoryFlipGame = ({ onComplete }) => {
  const symbols = ["🍎", "🍎", "🚗", "🚗", "🎵", "🎵", "🐶", "🐶"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setCards(symbols.sort(() => Math.random() - 0.5));
  }, []);

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    setFlipped([...flipped, index]);

    if (flipped.length === 1) {
      setMoves((prev) => prev + 1);
      const first = flipped[0];
      const second = index;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setTimeout(onComplete, 1500);
    }
  }, [matched, cards, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-4">🃏 Memory Flip Game</h1>
      <p className="text-white mb-4">Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((symbol, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <motion.div
              key={index}
              className="w-20 h-24 cursor-pointer perspective"
              onClick={() => handleFlip(index)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="relative w-full h-full transition-transform duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center text-3xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  ❓
                </div>
                <div
                  className="absolute w-full h-full bg-yellow-200 rounded-xl shadow-lg flex items-center justify-center text-3xl"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                  {symbol}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      {matched.length === cards.length && (
        <motion.div className="mt-6 text-white text-xl font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          🎉 Congratulations! You won in {moves} moves!
        </motion.div>
      )}
    </div>
  );
};

// --- Quick Tap Game ---
const QuickTapGame = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer <= 0) return onComplete();
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-teal-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-4">👆 Quick Tap Game</h1>
      <p className="text-white mb-4">Time Left: {timer}s</p>
      <p className="text-white mb-4">Score: {score}</p>
      <button
        onClick={() => setScore((s) => s + 1)}
        className="px-6 py-4 bg-yellow-400 rounded-xl font-bold text-xl shadow-lg hover:scale-105 transition"
      >
        Tap Me!
      </button>
    </div>
  );
};

// --- Color Match Game ---
const ColorMatchGame = ({ onComplete }) => {
  const colors = ["red", "blue", "green", "yellow"];
  const [target, setTarget] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const [score, setScore] = useState(0);

  const handleClick = (color) => {
    if (color === target) setScore((s) => s + 1);
    else setScore((s) => s - 1);
    setTarget(colors[Math.floor(Math.random() * colors.length)]);
    if (score + 1 >= 5) onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-4">🎨 Color Match Game</h1>
      <p className="text-white mb-4">Target Color: <span className="font-bold">{target}</span></p>
      <p className="text-white mb-4">Score: {score}</p>
      <div className="flex gap-4">
        {colors.map((c) => (
          <button key={c} onClick={() => handleClick(c)} className={`w-24 h-24 rounded-xl`} style={{ backgroundColor: c }}></button>
        ))}
      </div>
    </div>
  );
};

// --- Export based on level ---
export const getGameByLevel = (levelIndex) => {
  switch (levelIndex) {
    case 0:
      return MemoryFlipGame;
    case 1:
      return QuickTapGame;
    case 2:
      return ColorMatchGame;
    default:
      return MemoryFlipGame;
  }
};
export default MemoryFlipGame;    