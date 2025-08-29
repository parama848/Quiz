import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

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

  // Classic input classes
  const inputClass =
    "w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400";

  const selectClass =
    "w-52 p-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Link to={"/teacher-dashboard"} className="absolute top-6 left-6">
        <button className="px-4 py-2 cursor-pointer rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
          ←
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add Question</h1>

      {/* Subject + Level */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="flex flex-col">
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

        <div className="flex flex-col">
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
      </div>

      {/* Question Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded shadow">
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
        </div>

        <div className="bg-white p-6 rounded shadow">
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
        </div>
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
                className="text-blue-600 focus:ring-1 focus:ring-blue-400"
              />
              <span>Option {opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 px-8 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
      >
        Save Question
      </button>

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
              <li
                key={q.id}
                className="bg-white rounded shadow p-4 border-l-4 border-blue-500"
              >
                <div className="flex justify-between mb-2">
                  <strong className="text-gray-800">{q.subject}</strong>
                  <em className="text-gray-500">{q.level}</em>
                </div>
                <p className="mb-1">
                  <b>EN:</b> {q.englishQuestion}
                </p>
                <p className="mb-1">
                  <b>TA:</b> {q.tamilQuestion}
                </p>
                <p className="text-green-600 font-semibold">
                  ✅ Correct Answer: Option {q.correctAnswer}
                </p>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AddQuestion;
