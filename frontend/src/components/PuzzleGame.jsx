import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const cardBank = {
  Maths: {
    Easy: ["➕", "➕", "➖", "➖", "✖️", "✖️", "➗", "➗"],
    Medium: ["1️⃣", "1️⃣", "2️⃣", "2️⃣", "3️⃣", "3️⃣", "4️⃣", "4️⃣"],
    Difficult: ["∑", "∑", "√", "√", "π", "π", "∞", "∞"],
  },
  English: {
    Easy: ["🐱", "🐱", "🐶", "🐶", "🦋", "🦋", "🐟", "🐟"],
    Medium: ["A", "A", "B", "B", "C", "C", "D", "D"],
    Difficult: ["Book", "Book", "Pen", "Pen", "Story", "Story", "Word", "Word"],
  },
  Science: {
    Easy: ["🌞", "🌞", "🌙", "🌙", "⭐", "⭐", "☁️", "☁️"],
    Medium: ["⚛️", "⚛️", "🧪", "🧪", "🔬", "🔬", "💡", "💡"],
    Difficult: ["DNA", "DNA", "Cell", "Cell", "Atom", "Atom", "Force", "Force"],
  },
  GK: {
    Easy: ["🚗", "🚗", "✈️", "✈️", "🚢", "🚢", "🚲", "🚲"],
    Medium: ["🌍", "🌍", "🇮🇳", "🇮🇳", "🏰", "🏰", "🗽", "🗽"],
    Difficult: [
      "History",
      "History",
      "Geography",
      "Geography",
      "Politics",
      "Politics",
      "Sports",
      "Sports",
    ],
  },
};

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const MemoryGame = () => {
  const [subject, setSubject] = useState("Maths");
  const [level, setLevel] = useState("Easy");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // ✅ resetGame now takes subject & level
  const resetGame = (subj = subject, lvl = level) => {
    const newCards = shuffleArray(cardBank[subj][lvl]);
    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDisabled(false);
  };

  // ✅ Effect depends on subject & level
  useEffect(() => {
    resetGame(subject, level);
  }, [subject, level]);

  const handleFlip = (index) => {
    if (disabled || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves((prev) => prev + 1);
      setTimeout(() => checkMatch(newFlipped), 800);
    }
  };

  const checkMatch = ([first, second]) => {
    if (cards[first] === cards[second]) {
      setMatched((prev) => [...prev, first, second]);
    }
    setFlipped([]);
    setDisabled(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6">
      <Link to={"/"} className="absolute top-6 left-6">
        <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
          ← Back
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-4 text-purple-700">🧠 Memory Game</h1>
      <p className="text-gray-700 mb-4">Moves: {moves}</p>

      {/* Subject & Level Selectors */}
      {/* <div className="flex gap-4 mb-6">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm"
        >
          {Object.keys(cardBank).map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm"
        >
          {Object.keys(cardBank[subject]).map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div> */}

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => handleFlip(idx)}
            className={`w-20 h-20 flex items-center justify-center text-xl sm:text-2xl md:text-3xl rounded-lg cursor-pointer shadow-lg transition-all duration-300
              ${
                flipped.includes(idx) || matched.includes(idx)
                  ? "bg-green-200"
                  : "bg-gray-300 hover:bg-gray-400"
              }
            `}
          >
            {(flipped.includes(idx) || matched.includes(idx)) && card}
          </div>
        ))}
      </div>

      {/* Win Message */}
      {matched.length === cards.length && cards.length > 0 && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            🎉 You Won!
          </h2>
          <p className="text-gray-700 mb-4">Completed in {moves} moves.</p>
          <button
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition shadow-md"
            onClick={() => resetGame(subject, level)}
          >
            Play Again
          </button>
        </div>
      )}

      {/* Reset Button */}
      <div className="mt-4">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition shadow-md"
          onClick={() => resetGame(subject, level)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;
