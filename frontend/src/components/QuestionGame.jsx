import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// --- Particle Explosion Component ---
const ParticleExplosion = ({ x, y, colors, onComplete }) => {
  const [particles, setParticles] = useState(
    Array.from({ length: 12 }).map(() => ({
      id: Math.random(),
      dx: (Math.random() - 0.5) * 8,
      dy: (Math.random() - 0.5) * 8,
      rotate: Math.random() * 360,
      dRotate: (Math.random() - 0.5) * 20,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  );

  useEffect(() => {
    const timer = setTimeout(onComplete, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.color} rounded-full`}
          style={{ width: p.size, height: p.size, left: x, top: y }}
          animate={{
            x: p.dx * 10,
            y: p.dy * 10,
            rotate: p.rotate + p.dRotate * 10,
            opacity: 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}
    </>
  );
};

const QuestionGame = ({ question, onAnswer }) => {
  const [fallingOptions, setFallingOptions] = useState([]);
  const [slicedOptions, setSlicedOptions] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [showPopup, setShowPopup] = useState(null);
  const gameRef = useRef(null);
  const slicePath = useRef([]);
  const [sliceTrail, setSliceTrail] = useState([]);

  // --- Spawn balls ---
  useEffect(() => {
    const colors = [
      ["bg-purple-400", "bg-pink-500"],
      ["bg-blue-400", "bg-green-400"],
      ["bg-red-400", "bg-yellow-400"],
    ];

    const spawnBall = () => {
      const idx = Math.floor(Math.random() * question.englishOptions.length);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opt = {
        id: Date.now() + Math.random(),
        text: question.englishOptions[idx],
        tamil: question.tamilOptions[idx],
        optionIndex: idx,
        x: Math.random() * 400,
        y: -50,
        color,
      };
      setFallingOptions((prev) => [...prev, opt]);
    };

    const spawnInterval = setInterval(spawnBall, 1500);
    return () => clearInterval(spawnInterval);
  }, [question]);

  // --- Falling animation ---
  useEffect(() => {
    const fallInterval = setInterval(() => {
      setFallingOptions((opts) =>
        opts.map((o) => ({ ...o, y: o.y + 8 })).filter((o) => o.y < 500)
      );
      setSlicedOptions((slices) =>
        slices
          .map((s) => ({ ...s, y: s.y + s.fallSpeed, x: s.x + s.dx, rotate: s.rotate + s.dRotate }))
          .filter((s) => s.y < 500)
      );
    }, 100);
    return () => clearInterval(fallInterval);
  }, []);

  // --- Slice handlers ---
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
    setSliceTrail([]);
  };

  const addSlicePoint = (e) => {
    const rect = gameRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    slicePath.current.push({ x, y });
    setSliceTrail([...slicePath.current]);
    if (slicePath.current.length > 15) slicePath.current.shift();
  };

  // --- Check slice collision ---
  const checkSliceCollision = () => {
    if (slicePath.current.length < 2) return;
    const last = slicePath.current[slicePath.current.length - 1];

    setFallingOptions((opts) =>
      opts.filter((o) => {
        const hit = last.x >= o.x && last.x <= o.x + 60 && last.y >= o.y && last.y <= o.y + 60;

        if (hit) {
          const optionLetter = ["A", "B", "C", "D"][o.optionIndex].toUpperCase();
          const correct = optionLetter === question.correctAnswer.toUpperCase();

          setShowPopup(correct ? "correct" : "wrong");

          // --- Split ball ---
          setSlicedOptions((prev) => [
            ...prev,
            { ...o, dx: -3, dRotate: -10, fallSpeed: 6, side: "left" },
            { ...o, dx: 3, dRotate: 10, fallSpeed: 6, side: "right" },
          ]);

          // --- Add dynamic explosion ---
          setExplosions((prev) => [
            ...prev,
            { id: Date.now(), x: o.x + 30, y: o.y + 30, colors: o.color },
          ]);

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
          className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-br ${o.color[0]} ${o.color[1]}`}
          style={{ top: o.y, left: o.x }}
        >
          <div className="text-center px-1">
            <div className="text-sm">{o.text}</div>
            <div className="text-[10px]">{o.tamil}</div>
          </div>
        </motion.div>
      ))}

      {/* Sliced halves */}
      {slicedOptions.map((s, idx) => (
        <motion.div
          key={`slice-${idx}`}
          className={`absolute w-16 h-8 rounded-tl-full rounded-tr-full flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-br ${s.color?.[0] ?? "bg-purple-400"} ${s.color?.[1] ?? "bg-pink-500"}`}
          style={{
            top: s.y,
            left: s.x,
            rotate: s.rotate,
            transformOrigin: s.side === "left" ? "right bottom" : "left bottom",
          }}
        >
          <div className="text-center px-1">
            <div className="text-sm">{s.text}</div>
            <div className="text-[10px]">{s.tamil}</div>
          </div>
        </motion.div>
      ))}

      {/* Particle explosions */}
      {explosions.map((exp) => (
        <ParticleExplosion
          key={exp.id}
          x={exp.x}
          y={exp.y}
          colors={exp.colors}
          onComplete={() =>
            setExplosions((prev) => prev.filter((e) => e.id !== exp.id))
          }
        />
      ))}

      {/* Slice trail */}
      {sliceTrail.map((point, idx) => {
        const prev = sliceTrail[idx - 1];
        if (!prev) return null;
        return (
          <motion.div
            key={idx}
            className="absolute w-2 h-2 bg-white rounded-full pointer-events-none"
            style={{ left: point.x, top: point.y, opacity: 0.7 }}
          />
        );
      })}

      {/* Popup for correct/wrong */}
      {showPopup === "correct" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-green-600 text-6xl font-extrabold"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ type: "spring" }}
        >
          ✅
        </motion.div>
      )}
      {showPopup === "wrong" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-red-600 text-6xl font-extrabold"
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring" }}
        >
          ❌
        </motion.div>
      )}
    </div>
  );
};

export default QuestionGame;
