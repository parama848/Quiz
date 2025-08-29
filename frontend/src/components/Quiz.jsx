import React, { useState } from "react";
import PuzzleGame from "./PuzzleGame";
import Modal from "./Modal";
import schoolBg from "../assets/school-bg.jpg";

const Quiz = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answersCorrectness, setAnswersCorrectness] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer("");
    setAnswersCorrectness([]);
    setShowPopup(false);
    setPopupMessage("");
    setShowPuzzle(false);
    setConsecutiveCorrect(0);
    setConsecutiveWrong(0);
  };

  const handleAnswer = (optionIndex) => {
    const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
    const correctAnswer = questions[currentIndex].correctAnswer.toUpperCase();
    const isCorrect = optionLetter === correctAnswer;

    setSelectedAnswer(optionLetter);

    // Update answersCorrectness
    const updatedCorrectness = [...answersCorrectness, isCorrect];
    setAnswersCorrectness(updatedCorrectness);

    // Calculate new consecutive counts locally
    const newConsecutiveCorrect = isCorrect ? consecutiveCorrect + 1 : 0;
    const newConsecutiveWrong = !isCorrect ? consecutiveWrong + 1 : 0;

    setConsecutiveCorrect(newConsecutiveCorrect);
    setConsecutiveWrong(newConsecutiveWrong);

    // Check for consecutive popups immediately
    if (newConsecutiveCorrect === 3) {
      setPopupMessage("🎉 3 Correct Answers in a row! Keep it up!");
      setShowPopup(true);
      setConsecutiveCorrect(0); // reset counter
    } else if (newConsecutiveWrong === 3) {
      setPopupMessage("⚠️ 3 Wrong Answers in a row. Try focusing!");
      setShowPopup(true);
      setConsecutiveWrong(0); // reset counter
    }

    setTimeout(() => {
      setSelectedAnswer("");

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // End of quiz
        const allCorrectNow = updatedCorrectness.every((v) => v === true);

        if (allCorrectNow) {
          setPopupMessage("🏆 You answered all questions correctly! Puzzle unlocked!");
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            setShowPuzzle(true);
          }, 2000);
        } else {
          setPopupMessage("❌ Some answers were wrong. Try Again to unlock the puzzle!");
          setShowPopup(true);
        }
      }
    }, 600);
  };

  if (showPuzzle) {
    return <PuzzleGame resetQuiz={resetQuiz} />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${schoolBg})` }}
    >
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Question {currentIndex + 1}/{questions.length}
          </h2>
        </div>

        <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
          <p className="font-semibold text-xl mb-2 text-gray-800">{questions[currentIndex].englishQuestion}</p>
          <p className="font-semibold text-lg text-blue-600">{questions[currentIndex].tamilQuestion}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {questions[currentIndex].englishOptions.map((opt, idx) => {
            const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
            const correctAnswer = questions[currentIndex].correctAnswer.toUpperCase();

            return (
              <button
                key={idx}
                className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl transition-all duration-300 shadow hover:shadow-lg text-left
                  ${
                    selectedAnswer === optionLetter
                      ? optionLetter === correctAnswer
                        ? "bg-green-300 border-green-500"
                        : "bg-red-300 border-red-500"
                      : "bg-white border-gray-300 hover:bg-purple-100"
                  }`}
                onClick={() => handleAnswer(idx)}
              >
                <span className="font-bold text-lg">{optionLetter}.</span>
                <div>
                  <span className="block font-medium text-gray-700">{opt}</span>
                  <span className="block text-blue-600">{questions[currentIndex].tamilOptions[idx]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {showPopup && (
          <Modal>
            <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center animate-scaleUp">
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
      </div>
    </div>
  );
};

export default Quiz;
