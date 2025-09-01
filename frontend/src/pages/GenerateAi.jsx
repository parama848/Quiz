import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function GenerateAi() {
  const [paragraph, setParagraph] = useState("");
  const [mcqs, setMcqs] = useState([]);

  useEffect(() => {
    const savedMcqs = localStorage.getItem("mcqs");
    if (savedMcqs) setMcqs(JSON.parse(savedMcqs));

    const savedParagraph = localStorage.getItem("paragraph");
    if (savedParagraph) setParagraph(savedParagraph);
  }, []);

  const handleGenerate = async () => {
    if (!paragraph.trim()) {
      alert("Please enter a paragraph before generating!");
      return;
    }

    const response = await fetch("http://localhost:8000/generate_mcqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: paragraph }),
    });
    const data = await response.json();

    const withMeta = data.mcqs.map((q) => ({
      ...q,
      subject: "",
      level: "",
    }));

    setMcqs(withMeta);
    localStorage.setItem("mcqs", JSON.stringify(withMeta));
    localStorage.setItem("paragraph", paragraph);
  };

  const handleSave = (q, idx) => {
    if (!q.subject || !q.level) {
      alert("Please select subject and level before saving!");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("questions")) || [];

    const formatted = {
      id: Date.now(),
      subject: q.subject,
      level: q.level,
      englishQuestion: q.question_en,
      tamilQuestion: q.question_ta,
      options: q.options,
      answer: q.answer,
    };

    const updated = [...saved, formatted];
    localStorage.setItem("questions", JSON.stringify(updated));

    const updatedMcqs = mcqs.filter((_, i) => i !== idx);
    setMcqs(updatedMcqs);
    localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));

    alert(`✅ Saved under ${q.subject} - ${q.level}`);
  };

  const handleDelete = (index) => {
    const updatedMcqs = mcqs.filter((_, i) => i !== index);
    setMcqs(updatedMcqs);
    localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
  };

  const handleDropdownChange = (index, field, value) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[index][field] = value;
    setMcqs(updatedMcqs);
    localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
  };

  const tamilOptions = ["(அ)", "(ஆ)", "(இ)", "(ஈ)"];
  const engOptions = ["(a)", "(b)", "(c)", "(d)"];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 sm:p-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Back Button */}
      <div className="w-full flex justify-center sm:justify-start sm:pl-2 mb-6">
        <Link to={"/"}>
          <motion.button
            className="px-4 py-2 rounded-lg cursor-pointer 
                       bg-gradient-to-r from-blue-400 to-blue-500 
                       hover:from-blue-500 hover:to-blue-600 
                       text-white font-semibold shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>
        </Link>
      </div>

      {/* Title */}
      <motion.h1
        className="text-2xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-10 text-blue-800 drop-shadow-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        ✨ AI MCQ Generator
      </motion.h1>

      {/* Input Card */}
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <textarea
          rows="5"
          className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none text-gray-700 text-sm sm:text-base"
          placeholder="📖 Enter a paragraph for generating MCQs..."
          value={paragraph}
          onChange={(e) => {
            setParagraph(e.target.value);
            localStorage.setItem("paragraph", e.target.value);
          }}
        />

        {/* Generate Button */}
        <div className="flex justify-center sm:justify-start gap-4 mt-6">
          <motion.button
            onClick={handleGenerate}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 
                       hover:from-blue-600 hover:to-blue-700 
                       text-white font-bold rounded-xl shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡ Generate MCQs
          </motion.button>
        </div>
      </motion.div>

      {/* Draft MCQs */}
      <div className="max-w-4xl mx-auto mt-8 sm:mt-10 space-y-6">
        {mcqs.map((q, idx) => (
          <motion.div
            key={idx}
            className="p-5 sm:p-6 border border-gray-200 rounded-2xl shadow-md bg-white relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(idx)}
              className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs sm:text-sm rounded-lg hover:bg-red-600 transition"
            >
              ✖
            </button>

            {/* Tamil */}
            <div className="mb-4">
              <p className="font-bold text-base sm:text-lg mb-3 text-gray-900">
                📝 {q.question_ta}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <p
                    key={i}
                    className="p-3 border border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 text-sm sm:text-base"
                  >
                    {tamilOptions[i]} {opt.ta}
                  </p>
                ))}
              </div>
            </div>

            {/* English */}
            <div className="mb-4">
              <p className="font-bold text-base sm:text-lg mb-3 text-gray-900">
                📝 {q.question_en}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <p
                    key={i}
                    className="p-3 border border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 text-sm sm:text-base"
                  >
                    {engOptions[i]} {opt.en}
                  </p>
                ))}
              </div>
            </div>

            {/* Answer */}
            <p className="mt-3 text-green-700 font-semibold text-sm sm:text-base">
              ✅ Answer: {q.answer.ta} ({q.answer.en})
            </p>

            {/* Subject + Level + Save */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mt-4">
              <select
                value={q.subject}
                onChange={(e) =>
                  handleDropdownChange(idx, "subject", e.target.value)
                }
                className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              >
                <option value="">Select Subject</option>
                <option>Maths</option>
                <option>English</option>
                <option>Science</option>
                <option>GK</option>
              </select>

              <select
                value={q.level}
                onChange={(e) =>
                  handleDropdownChange(idx, "level", e.target.value)
                }
                className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              >
                <option value="">Select Level</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Difficult</option>
              </select>

              <motion.button
                onClick={() => handleSave(q, idx)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 
                           text-white font-bold rounded-xl shadow-md text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💾 Save
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default GenerateAi;
