import React, { useState, useEffect, useRef } from "react"; 
import Modal from "./Modal";
import schoolBg from "../assets/school-bg.jpg";
import levelCompleteSound from "../assets/level-complete.mp3";

// 🎵 Audio
import greatSound from "../assets/Good.mp3";
import commonSound from "../assets/Come-on.mp3";
import excellentSound from "../assets/Excellent.mp3";
import startgame from "../assets/StartGame.mp3";

import { motion } from "framer-motion";
import WordSearchGame from "../game/WordSearchGame";
import MathPuzzleGame from "../game/MathPuzzleGame";

// --- MemoryFlipGame Component ---
const MemoryFlipGame = ({ onComplete }) => {
  const symbols = ["🍎", "🍎", "🚗", "🚗", "🎵", "🎵", "🐶", "🐶"];
  const [cards, setCards] = useState(symbols.sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleFlip = (i) => {
    if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
    setFlipped([...flipped, i]);
    if (flipped.length === 1) {
      const first = flipped[0];
      const second = i;
      if (cards[first] === cards[second]) setMatched([...matched, first, second]);
      setMoves((prev) => prev + 1);
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setTimeout(onComplete, 1500);
    }
  }, [matched]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500 p-4">
      <h1 className="text-3xl text-white mb-4">Memory Flip Game</h1>
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
                  className="absolute w-full h-full bg-white rounded-xl flex items-center justify-center text-3xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  ❓
                </div>
                <div
                  className="absolute w-full h-full bg-yellow-300 rounded-xl flex items-center justify-center text-3xl"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                  {symbol}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// --- Floating Color Paper ---
const FloatingColorPaper = ({ count = 30, duration = 2000 }) => {
  const [papers, setPapers] = useState([]);
  useEffect(() => {
    const newPapers = Array.from({ length: count }).map((_, i) => ({
      id: i,
      color: ["bg-red-400", "bg-blue-400", "bg-yellow-400", "bg-green-400", "bg-pink-400"][
        Math.floor(Math.random() * 5)
      ],
      left: Math.random() * 100,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
    setPapers(newPapers);
    const timer = setTimeout(() => setPapers([]), duration);
    return () => clearTimeout(timer);
  }, [count, duration]);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-50">
      {papers.map((p) => (
        <div
          key={p.id}
          className={`${p.color} absolute rounded-sm`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            animation: `floatPaper ${p.duration}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatPaper {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- NEW QuestionGame (slicing) ---
const QuestionGame = ({ question, onAnswer }) => {
  const [fallingOptions, setFallingOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(null);
  const gameRef = useRef(null);
  const slicePath = useRef([]);

  // spawn balls
  useEffect(() => {
    const spawnBall = () => {
      const idx = Math.floor(Math.random() * question.englishOptions.length);
      const opt = {
        id: Date.now() + Math.random(),
        text: question.englishOptions[idx],
        tamil: question.tamilOptions[idx],
        optionIndex: idx,
        x: Math.random() * 400,
        y: -50,
      };
      setFallingOptions((prev) => [...prev, opt]);
    };

    const spawnInterval = setInterval(spawnBall, 1500);
    return () => clearInterval(spawnInterval);
  }, [question]);

  // falling animation
  useEffect(() => {
    const fallInterval = setInterval(() => {
      setFallingOptions((opts) =>
        opts
          .map((o) => ({ ...o, y: o.y + 8 }))
          .filter((o) => o.y < 500)
      );
    }, 100);
    return () => clearInterval(fallInterval);
  }, []);

  // slice start/move/end
  const handleSliceStart = (e) => {
    slicePath.current = [];
    addSlicePoint(e);
  };

  const handleSliceMove = (e) => {
    addSlicePoint(e);
    checkSliceCollision();
  };

  const handleSliceEnd = () => {
    slicePath.current = [];
  };

  const addSlicePoint = (e) => {
    const rect = gameRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    slicePath.current.push({ x, y });
    if (slicePath.current.length > 10) slicePath.current.shift();
  };

  const checkSliceCollision = () => {
    if (slicePath.current.length < 2) return;

    const last = slicePath.current[slicePath.current.length - 1];
    setFallingOptions((opts) =>
      opts.filter((o) => {
        const hit =
          last.x >= o.x &&
          last.x <= o.x + 60 &&
          last.y >= o.y &&
          last.y <= o.y + 60;

        if (hit) {
          const optionLetter = ["A", "B", "C", "D"][o.optionIndex].toUpperCase();
          const correct = optionLetter === question.correctAnswer.toUpperCase();

          setShowPopup(correct ? "correct" : "wrong");

          setTimeout(() => {
            setShowPopup(null);
            onAnswer(correct, o.optionIndex);
          }, 1500);
        }
        return !hit;
      })
    );
  };

  return (
    <div
      ref={gameRef}
      className="relative w-[500px] h-[500px] bg-blue-100 overflow-hidden rounded-xl shadow-lg touch-none mx-auto"
      onMouseDown={handleSliceStart}
      onMouseMove={handleSliceMove}
      onMouseUp={handleSliceEnd}
      onTouchStart={handleSliceStart}
      onTouchMove={handleSliceMove}
      onTouchEnd={handleSliceEnd}
    >
      {/* Question */}
      <div className="absolute top-2 left-2 right-2 bg-white/70 p-2 rounded-lg text-center z-10">
        <p className="font-bold text-gray-800">{question.englishQuestion}</p>
        <p className="text-blue-600">{question.tamilQuestion}</p>
      </div>

      {/* Falling balls */}
      {fallingOptions.map((o) => (
        <motion.div
          key={o.id}
          className="absolute w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          style={{ top: o.y, left: o.x }}
        >
          <div className="text-center px-1">
            <div className="text-sm">{o.text}</div>
            <div className="text-[10px]">{o.tamil}</div>
          </div>
        </motion.div>
      ))}

      {/* Popup for correct/wrong */}
      {showPopup === "correct" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-green-600 text-6xl font-extrabold"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ type: "spring" }}
        >
          6️⃣
        </motion.div>
      )}
      {showPopup === "wrong" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-red-600 text-6xl font-extrabold"
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring" }}
        >
          🏏 OUT!
        </motion.div>
      )}
    </div>
  );
};

// --- QUIZ Component ---
const Quiz = ({ questions }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersCorrectness, setAnswersCorrectness] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [levelCompletedPopup, setLevelCompletedPopup] = useState(false);
  const [levelCompletedMessage, setLevelCompletedMessage] = useState("");
  const [showGame, setShowGame] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // 🔊 Audio
  const levelCompleteAudio = new Audio(levelCompleteSound);
  const greatAudio = new Audio(greatSound);
  const commonAudio = new Audio(commonSound);
  const excellentAudio = new Audio(excellentSound);
  const startGameAudio = new Audio(startgame);

  const currentLevel = questions[levelIndex];
  const currentQuestion = currentLevel.questions[currentIndex];
  const [correctStreak, setCorrectStreak] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);

  const handleAnswer = (isCorrect, optionIndex) => {
    setAnswersCorrectness([...answersCorrectness, isCorrect]);

    if (isCorrect) setCorrectStreak((prev) => prev + 1), setWrongStreak(0);
    else setWrongStreak((prev) => prev + 1), setCorrectStreak(0);

    setTimeout(() => {
      if (isCorrect && correctStreak + 1 === 3) {
        setPopupMessage("🌟 Good!");
        setShowPopup(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        greatAudio.play();
      }
      if (!isCorrect && wrongStreak + 1 === 3) {
        setPopupMessage("💪 Come on, you can do it!");
        setShowPopup(true);
        commonAudio.play();
      }
      if (isCorrect && correctStreak + 1 === 6) {
        setPopupMessage("🌟 Excellent!");
        setShowPopup(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        excellentAudio.play();
      }
    }, 300);

    setTimeout(() => {
      if (currentIndex + 1 < currentLevel.questions.length) setCurrentIndex(currentIndex + 1);
      else {
        setLevelCompletedMessage(`🏆 You completed ${currentLevel.level} level!`);
        setLevelCompletedPopup(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        startGameAudio.play();
      }
    }, 500);
  };

  const handleLevelCompletedClose = () => {
    setLevelCompletedPopup(false);
    setShowGame(true);
  };

  const handleGameComplete = () => {
    setShowGame(false);
    const nextLevel = levelIndex + 1;
    if (nextLevel < questions.length) {
      setLevelIndex(nextLevel);
      setCurrentIndex(0);
      setAnswersCorrectness([]);
      setCorrectStreak(0);
      setWrongStreak(0);
    } else {
      setPopupMessage("🏆 You completed all levels!");
      setShowPopup(true);
      setShowConfetti(true);
      levelCompleteAudio.play();
      setTimeout(() => {
        setShowConfetti(false);
        setShowPopup(false);
        window.location.href = "/studentdashboard";
      }, 3000);
    }
  };

  const getGameByLevel = (level) => {
    switch (level) {
      case 0:
        return MemoryFlipGame; // Easy
      case 1:
        return WordSearchGame; // Medium
      case 2:
        return MathPuzzleGame; // Hard
      default:
        return MemoryFlipGame;
    }
  };

  if (showGame) {
    const GameComponent = getGameByLevel(levelIndex);
    return <GameComponent onComplete={handleGameComplete} />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 relative"
      style={{ backgroundImage: `url(${schoolBg})` }}
    >
      {showConfetti && <FloatingColorPaper count={50} duration={2500} />}

      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          <span
            className={
              currentLevel.level === "Easy"
                ? "text-green-600"
                : currentLevel.level === "Medium"
                ? "text-yellow-600"
                : "text-red-600"
            }
          >
            {currentLevel.level + " Level: "}
          </span>
          Question {currentIndex + 1}/{currentLevel.questions.length}
        </h2>

        {/* 🎮 Replaced buttons with slicing game */}
        <QuestionGame question={currentQuestion} onAnswer={handleAnswer} />

        {showPopup && (
          <Modal>
            <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">{popupMessage}</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </Modal>
        )}

        {levelCompletedPopup && (
          <Modal>
            <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-green-200 via-white to-blue-200 rounded-3xl shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">{levelCompletedMessage}</h2>
              <button
                onClick={handleLevelCompletedClose}
                className="mt-2 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
              >
                Play Game
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Quiz;
