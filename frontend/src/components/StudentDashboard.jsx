import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      {/* Header */}
       <Link to={"/"}>
                 <button className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-md transition-all">
                   ← Back
                 </button>
               </Link>
      <div className="flex flex-col mb-20 sm:flex-row justify-center items-center text-center sm:text-left gap-4 mb-8">
        <div className="justify-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Student Dashboard <br />
          <span className="text-gray-500 text-base sm:text-lg">
            மாணவர் கட்டுப்பாட்டு பலகை
          </span>
        </h1>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Questions */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Questions
          </h2>
          <p className="text-sm text-gray-500 mt-1">Available in question bank</p>
          <p className="text-4xl sm:text-5xl font-bold text-blue-600 mt-3">
            {totalQuestions}
          </p>
        </div>

        {/* Subjects Available */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-105 transition">
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
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {sub} ({count})
                </span>
              ))
            )}
          </div>
        </div>

        {/* Difficulty Levels */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-105 transition">
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
        </div>

        {/* Start Quiz Button */}
        <div className="col-span-1 mt-10 sm:col-span-2 lg:col-span-3 flex justify-center">
         <Link to={"/startquiz"}>
          <button className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg
                             shadow-md hover:bg-blue-700 hover:shadow-lg
                             transition-all duration-200 w-full sm:w-auto">
            Start Quiz
          </button>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
