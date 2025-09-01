import React, { useState } from "react";
import Modal from "../components/Modal";
import Quiz from "../components/Quiz";
import defaultQuestions from "../data/DefaultQuestions";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ModernDropdown = ({ options, selected, setSelected, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white border-2 border-purple-300 rounded-xl px-4 py-3 flex justify-between items-center text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm hover:shadow-md transition"
      >
        {selected || placeholder}
        <ChevronDown className="ml-2 text-gray-400" size={20} />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-purple-100 cursor-pointer transition"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const StartQuiz = () => {
  const [subject, setSubject] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  const subjects = ["Maths", "English", "Science", "GK"];
  const levels = ["Easy", "Medium", "Difficult"];

  const startQuiz = () => {
    if (!subject) {
      alert("Please select a subject first.");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("questions")) || [];
    const allQuestions = [...defaultQuestions, ...saved];

    const filtered = allQuestions.filter((q) => q.subject === subject);

    if (filtered.length === 0) {
      alert("No questions available for this subject.");
      return;
    }

    // Group questions by level, keep order, skip empty levels
    const groupedQuestions = levels
      .map((level) => ({
        level,
        questions: filtered.filter((q) => q.level === level),
      }))
      .filter((grp) => grp.questions.length > 0);

    setFilteredQuestions(groupedQuestions);
    setShowPopup(false);
  };

  if (showPopup) {
    return (
      <Modal>
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-3xl shadow-2xl w-96 mx-auto flex flex-col items-center animate-fadeIn">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700">
            🎯 Select Subject
          </h2>

          <div className="flex flex-col gap-4 w-full mb-6">
            <ModernDropdown
              options={subjects}
              selected={subject}
              setSelected={setSubject}
              placeholder="Select Subject"
            />
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-purple-600 text-white font-bold text-lg py-3 rounded-2xl shadow-lg hover:bg-purple-700 hover:scale-105 transition-transform duration-300"
          >
            Start Quiz
          </button>
          <div className="w-full mt-5 flex justify-center lg:justify-center sm:justify-start sm:pl-2 mb-6">
            <Link to="/studentdashboard">
              <motion.button
                className="px-4 mr-1.5 py-3.5 rounded-xl cursor-pointer w-[315px]
               bg-gradient-to-r from-blue-400 to-blue-500 
               hover:from-blue-500 hover:to-blue-600 
               text-white font-semibold shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
            </Link>
          </div>
        </div>
      </Modal>
    );
  }

  return <Quiz questions={filteredQuestions} />;
};

export default StartQuiz;
