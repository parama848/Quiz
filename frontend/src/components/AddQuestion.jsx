import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function AddQuestion() {
  const [englishQuestion, setEnglishQuestion] = useState("");
  const [tamilQuestion, setTamilQuestion] = useState("");
  const [englishOptions, setEnglishOptions] = useState(["", "", "", ""]);
  const [tamilOptions, setTamilOptions] = useState(["", "", "", ""]);
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("questions");
    if (saved) setQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const translateText = async (text, setTamil) => {
    if (!text) return setTamil("");
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=en|ta`
      );
      const data = await response.json();
      setTamil(data.responseData.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const handleEnglishQuestion = (e) => {
    const value = e.target.value;
    setEnglishQuestion(value);
    translateText(value, setTamilQuestion);
  };

  const handleEnglishOption = (index, value) => {
    const updatedEnglish = [...englishOptions];
    updatedEnglish[index] = value;
    setEnglishOptions(updatedEnglish);

    translateText(value, (translated) => {
      const updatedTamil = [...tamilOptions];
      updatedTamil[index] = translated;
      setTamilOptions(updatedTamil);
    });
  };

  const handleSave = () => {
    if (!subject || !level || !englishQuestion.trim() || !correctAnswer) {
      alert("Please fill Subject, Level, Question, and select Correct Answer");
      return;
    }

    const newQuestion = {
      id: Date.now(),
      subject,
      level,
      englishQuestion,
      tamilQuestion,
      englishOptions,
      tamilOptions,
      correctAnswer,
    };

    setQuestions((prev) => [...prev, newQuestion]);
    setEnglishQuestion("");
    setTamilQuestion("");
    setEnglishOptions(["", "", "", ""]);
    setTamilOptions(["", "", "", ""]);
    setSubject("");
    setLevel("");
    setCorrectAnswer("");
  };

  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Classic inputs
  const inputClass =
    "w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";
  const selectClass =
    "w-full sm:w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-teal-100 animate-gradient bg-[length:400%_400%]" />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      <div className="relative p-6 max-w-6xl mx-auto flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
          <Link to={"/teacher-dashboard"}>
            <motion.button
              className="px-4 py-2 cursor-pointer rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 
                         hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back
            </motion.button>
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center sm:text-left"
          >
            Add Question
          </motion.h1>
        </div>

        {/* Subject + Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4 mb-8"
        >
          <div className="flex flex-col w-full sm:w-auto">
            <label className="font-semibold mb-2 text-gray-700">Subject:</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={selectClass}
            >
              <option value="">Select Subject</option>
              <option value="Maths">Maths</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="GK">GK</option>
            </select>
          </div>

          <div className="flex flex-col w-full sm:w-auto">
            <label className="font-semibold mb-2 text-gray-700">Level:</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={selectClass}
            >
              <option value="">Select Level</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </motion.div>

        {/* Question Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-white/80 to-blue-50 backdrop-blur-md 
                       p-6 rounded-2xl shadow-md border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">English</h2>
            <input
              type="text"
              placeholder="Enter Question in English"
              value={englishQuestion}
              onChange={handleEnglishQuestion}
              className={inputClass + " mb-3"}
            />
            {englishOptions.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1} in English`}
                value={opt}
                onChange={(e) => handleEnglishOption(i, e.target.value)}
                className={inputClass + " mb-2"}
              />
            ))}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-white/80 to-indigo-50 backdrop-blur-md 
                       p-6 rounded-2xl shadow-md border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              தமிழ் (Tamil)
            </h2>
            <input
              type="text"
              placeholder="Question in Tamil"
              value={tamilQuestion}
              readOnly
              className={inputClass + " bg-gray-100 mb-3"}
            />
            {tamilOptions.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`விருப்பம் ${i + 1}`}
                value={opt}
                readOnly
                className={inputClass + " bg-gray-100 mb-2"}
              />
            ))}
          </motion.div>
        </div>

        {/* Correct Answer */}
        <div className="mt-6">
          <label className="block font-semibold mb-2 text-gray-700">
            Correct Answer <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-6">
            {["A", "B", "C", "D"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="correctAnswer"
                  value={opt}
                  checked={correctAnswer === opt}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="text-blue-600 focus:ring-2 focus:ring-blue-400"
                />
                <span>Option {opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-teal-400 to-teal-500 
                     hover:from-teal-500 hover:to-teal-600 text-white font-semibold 
                     rounded-lg shadow-md"
        >
          Save Question
        </motion.button>

        {/* Saved Questions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Saved Questions
          </h2>
          {questions.length === 0 ? (
            <p className="text-gray-500">No questions added yet.</p>
          ) : (
            <ul className="space-y-4">
              {questions.map((q) => (
                <motion.li
                  key={q.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-white/90 to-blue-50 
                             rounded-xl shadow-md p-4 border-l-4 border-blue-500"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-stone-800">{q.subject}</div>
                    <div
                      className={`font-medium ${
                        q.level === "Easy"
                          ? "text-green-600"
                          : q.level === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      ({q.level})
                    </div>
                  </div>
                  <p className="mb-1">
                    <b>EN:</b> {q.englishQuestion}
                  </p>
                  <p className="mb-1">
                    <b>TA:</b> {q.tamilQuestion}
                  </p>
                  <p className="text-green-600 font-semibold">
                    Correct Answer: Option {q.correctAnswer}
                  </p>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer transition"
                  >
                    Delete
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
