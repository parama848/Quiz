import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DefaultQuestions from "../data/DefaultQuestions";

const StudentDashboard = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("questions")) || [];
    const allQuestions = [...DefaultQuestions, ...saved];
    setQuestions(allQuestions);
  }, []);

  const totalQuestions = questions.length;

  const subjectCounts = questions.reduce((acc, q) => {
    acc[q.subject] = (acc[q.subject] || 0) + 1;
    return acc;
  }, {});

  const levelCounts = questions.reduce((acc, q) => {
    acc[q.level] = (acc[q.level] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-teal-100 to-indigo-200 animate-gradient bg-[length:400%_400%]" />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      <div className="relative p-4 sm:p-8 flex-1">
        {/* Back Button */}
        <Link to={"/"}>
          <motion.button
            className="px-4 py-2 rounded-lg cursor-pointer 
               bg-gradient-to-r from-blue-400 to-blue-500 
               hover:from-blue-500 hover:to-blue-600 
               text-white font-semibold shadow-md
               mx-auto block sm:mx-0 mb-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          className="flex flex-col mb-20 sm:flex-row justify-center items-center text-center sm:text-left gap-4"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 drop-shadow-lg">
            Student Dashboard <br />
            <span className="text-gray-600 text-base sm:text-lg font-medium">
              மாணவர் கட்டுப்பாட்டு பலகை
            </span>
          </h1>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Total Questions */}
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6"
            whileHover={{ scale: 1.05 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Total Questions
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Available in question bank
            </p>
            <p className="text-5xl font-bold text-blue-600 mt-4">
              {totalQuestions}
            </p>
          </motion.div>

          {/* Subjects Available */}
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6"
            whileHover={{ scale: 1.05 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Subjects Available
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Different categories to explore
            </p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {Object.keys(subjectCounts).length === 0 ? (
                <span className="text-gray-400">No subjects yet</span>
              ) : (
                Object.entries(subjectCounts).map(([sub, count]) => (
                  <span
                    key={sub}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                  >
                    {sub} ({count})
                  </span>
                ))
              )}
            </div>
          </motion.div>

          {/* Difficulty Levels */}
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6"
            whileHover={{ scale: 1.05 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Difficulty Levels
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Challenge yourself progressively
            </p>
            <ul className="mt-3 space-y-2">
              {["Easy", "Medium", "Difficult"].map((lvl) => (
                <li key={lvl} className="flex justify-between">
                  <span
                    className={`font-medium ${
                      lvl === "Easy"
                        ? "text-green-600"
                        : lvl === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {lvl}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      lvl === "Easy"
                        ? "bg-green-100 text-green-600"
                        : lvl === "Medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {levelCounts[lvl] || 0}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Start Quiz Button */}
        <motion.div
          className="col-span-1 mt-12 sm:col-span-2 lg:col-span-3 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link to={"/startquiz"}>
            <motion.button
              className="px-8 py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-teal-500 
                         text-white font-bold rounded-xl shadow-lg 
                         hover:from-blue-600 hover:to-teal-600 transition-all w-full sm:w-auto"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
               Start Quiz
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
