// // // // // // // // // import React, { useState } from "react";
// // // // // // // // // import Modal from "./Modal";
// // // // // // // // // import schoolBg from "../assets/school-bg.jpg";

// // // // // // // // // const Quiz = ({ questions }) => {
// // // // // // // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // // // // // // //   const [selectedAnswer, setSelectedAnswer] = useState("");
// // // // // // // // //   const [answersCorrectness, setAnswersCorrectness] = useState([]);
// // // // // // // // //   const [showPopup, setShowPopup] = useState(false);
// // // // // // // // //   const [popupMessage, setPopupMessage] = useState("");
// // // // // // // // //   const [showPuzzle, setShowPuzzle] = useState(false);
// // // // // // // // //   const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
// // // // // // // // //   const [consecutiveWrong, setConsecutiveWrong] = useState(0);

// // // // // // // // //   const resetQuiz = () => {
// // // // // // // // //     setCurrentIndex(0);
// // // // // // // // //     setSelectedAnswer("");
// // // // // // // // //     setAnswersCorrectness([]);
// // // // // // // // //     setShowPopup(false);
// // // // // // // // //     setPopupMessage("");
// // // // // // // // //     setShowPuzzle(false);
// // // // // // // // //     setConsecutiveCorrect(0);
// // // // // // // // //     setConsecutiveWrong(0);
// // // // // // // // //   };

// // // // // // // // //   const handleAnswer = (optionIndex) => {
// // // // // // // // //     const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
// // // // // // // // //     const correctAnswer = questions[currentIndex].correctAnswer.toUpperCase();
// // // // // // // // //     const isCorrect = optionLetter === correctAnswer;

// // // // // // // // //     setSelectedAnswer(optionLetter);

// // // // // // // // //     // Update answersCorrectness
// // // // // // // // //     const updatedCorrectness = [...answersCorrectness, isCorrect];
// // // // // // // // //     setAnswersCorrectness(updatedCorrectness);

// // // // // // // // //     // Calculate new consecutive counts locally
// // // // // // // // //     const newConsecutiveCorrect = isCorrect ? consecutiveCorrect + 1 : 0;
// // // // // // // // //     const newConsecutiveWrong = !isCorrect ? consecutiveWrong + 1 : 0;

// // // // // // // // //     setConsecutiveCorrect(newConsecutiveCorrect);
// // // // // // // // //     setConsecutiveWrong(newConsecutiveWrong);

// // // // // // // // //     // Check for consecutive popups immediately
// // // // // // // // //     if (newConsecutiveCorrect === 3) {
// // // // // // // // //       setPopupMessage("🎉 3 Correct Answers in a row! Keep it up!");
// // // // // // // // //       setShowPopup(true);
// // // // // // // // //       setConsecutiveCorrect(0); // reset counter
// // // // // // // // //     } else if (newConsecutiveWrong === 3) {
// // // // // // // // //       setPopupMessage("⚠️ 3 Wrong Answers in a row. Try focusing!");
// // // // // // // // //       setShowPopup(true);
// // // // // // // // //       setConsecutiveWrong(0); // reset counter
// // // // // // // // //     }

// // // // // // // // //     setTimeout(() => {
// // // // // // // // //       setSelectedAnswer("");

// // // // // // // // //       if (currentIndex + 1 < questions.length) {
// // // // // // // // //         setCurrentIndex(currentIndex + 1);
// // // // // // // // //       } else {
// // // // // // // // //         // End of quiz
// // // // // // // // //         const allCorrectNow = updatedCorrectness.every((v) => v === true);

// // // // // // // // //         if (allCorrectNow) {
// // // // // // // // //           setPopupMessage("🏆 You answered all questions correctly! Puzzle unlocked!");
// // // // // // // // //           setShowPopup(true);
// // // // // // // // //           setTimeout(() => {
// // // // // // // // //             setShowPopup(false);
// // // // // // // // //             setShowPuzzle(true);
// // // // // // // // //           }, 2000);
// // // // // // // // //         } else {
// // // // // // // // //           setPopupMessage("❌ Some answers were wrong. Try Again to unlock the puzzle!");
// // // // // // // // //           setShowPopup(true);
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //     }, 600);
// // // // // // // // //   };

// // // // // // // // //   if (showPuzzle) {
// // // // // // // // //     return <PathFind resetQuiz={resetQuiz} />;
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <div
// // // // // // // // //       className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
// // // // // // // // //       style={{ backgroundImage: `url(${schoolBg})` }}
// // // // // // // // //     >
// // // // // // // // //       <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
// // // // // // // // //         <div className="flex justify-between items-center mb-6">
// // // // // // // // //           <h2 className="text-3xl font-bold text-gray-800">
// // // // // // // // //             Question {currentIndex + 1}/{questions.length}
// // // // // // // // //           </h2>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
// // // // // // // // //           <p className="font-semibold text-xl mb-2 text-gray-800">{questions[currentIndex].englishQuestion}</p>
// // // // // // // // //           <p className="font-semibold text-lg text-blue-600">{questions[currentIndex].tamilQuestion}</p>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="grid grid-cols-1 gap-4">
// // // // // // // // //           {questions[currentIndex].englishOptions.map((opt, idx) => {
// // // // // // // // //             const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
// // // // // // // // //             const correctAnswer = questions[currentIndex].correctAnswer.toUpperCase();

// // // // // // // // //             return (
// // // // // // // // //               <button
// // // // // // // // //                 key={idx}
// // // // // // // // //                 className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl transition-all duration-300 shadow hover:shadow-lg text-left
// // // // // // // // //                   ${
// // // // // // // // //                     selectedAnswer === optionLetter
// // // // // // // // //                       ? optionLetter === correctAnswer
// // // // // // // // //                         ? "bg-green-300 border-green-500"
// // // // // // // // //                         : "bg-red-300 border-red-500"
// // // // // // // // //                       : "bg-white border-gray-300 hover:bg-purple-100"
// // // // // // // // //                   }`}
// // // // // // // // //                 onClick={() => handleAnswer(idx)}
// // // // // // // // //               >
// // // // // // // // //                 <span className="font-bold text-lg">{optionLetter}.</span>
// // // // // // // // //                 <div>
// // // // // // // // //                   <span className="block font-medium text-gray-700">{opt}</span>
// // // // // // // // //                   <span className="block text-blue-600">{questions[currentIndex].tamilOptions[idx]}</span>
// // // // // // // // //                 </div>
// // // // // // // // //               </button>
// // // // // // // // //             );
// // // // // // // // //           })}
// // // // // // // // //         </div>

// // // // // // // // //         {showPopup && (
// // // // // // // // //           <Modal>
// // // // // // // // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center animate-scaleUp">
// // // // // // // // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">{popupMessage}</h2>
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => setShowPopup(false)}
// // // // // // // // //                 className="mt-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
// // // // // // // // //               >
// // // // // // // // //                 Close
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           </Modal>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Quiz;

// // // // // // // // const Quiz = ({ questions }) => {
// // // // // // // //   const [levelIndex, setLevelIndex] = useState(0);
// // // // // // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // // // // // //   const [selectedAnswer, setSelectedAnswer] = useState("");
// // // // // // // //   const [answersCorrectness, setAnswersCorrectness] = useState([]);
// // // // // // // //   const [showPopup, setShowPopup] = useState(false);
// // // // // // // //   const [popupMessage, setPopupMessage] = useState("");
// // // // // // // //   const [showPuzzle, setShowPuzzle] = useState(false);
// // // // // // // //   const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
// // // // // // // //   const [consecutiveWrong, setConsecutiveWrong] = useState(0);

// // // // // // // //   const currentLevel = questions[levelIndex];
// // // // // // // //   const currentQuestion = currentLevel.questions[currentIndex];

// // // // // // // //   const resetQuiz = () => {
// // // // // // // //     setLevelIndex(0);
// // // // // // // //     setCurrentIndex(0);
// // // // // // // //     setSelectedAnswer("");
// // // // // // // //     setAnswersCorrectness([]);
// // // // // // // //     setShowPopup(false);
// // // // // // // //     setPopupMessage("");
// // // // // // // //     setShowPuzzle(false);
// // // // // // // //     setConsecutiveCorrect(0);
// // // // // // // //     setConsecutiveWrong(0);
// // // // // // // //   };

// // // // // // // //   const handleAnswer = (optionIndex) => {
// // // // // // // //     const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
// // // // // // // //     const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// // // // // // // //     const isCorrect = optionLetter === correctAnswer;

// // // // // // // //     setSelectedAnswer(optionLetter);
// // // // // // // //     const updatedCorrectness = [...answersCorrectness, isCorrect];
// // // // // // // //     setAnswersCorrectness(updatedCorrectness);

// // // // // // // //     const newConsecutiveCorrect = isCorrect ? consecutiveCorrect + 1 : 0;
// // // // // // // //     const newConsecutiveWrong = !isCorrect ? consecutiveWrong + 1 : 0;

// // // // // // // //     setConsecutiveCorrect(newConsecutiveCorrect);
// // // // // // // //     setConsecutiveWrong(newConsecutiveWrong);

// // // // // // // //     if (newConsecutiveCorrect === 3) {
// // // // // // // //       setPopupMessage("🎉 3 Correct Answers in a row! Keep it up!");
// // // // // // // //       setShowPopup(true);
// // // // // // // //       setConsecutiveCorrect(0);
// // // // // // // //     } else if (newConsecutiveWrong === 3) {
// // // // // // // //       setPopupMessage("⚠️ 3 Wrong Answers in a row. Try focusing!");
// // // // // // // //       setShowPopup(true);
// // // // // // // //       setConsecutiveWrong(0);
// // // // // // // //     }

// // // // // // // //     setTimeout(() => {
// // // // // // // //       setSelectedAnswer("");

// // // // // // // //       if (currentIndex + 1 < currentLevel.questions.length) {
// // // // // // // //         setCurrentIndex(currentIndex + 1);
// // // // // // // //       } else if (levelIndex + 1 < questions.length) {
// // // // // // // //         // Move to next level
// // // // // // // //         setLevelIndex(levelIndex + 1);
// // // // // // // //         setCurrentIndex(0);
// // // // // // // //       } else {
// // // // // // // //         // End of all levels
// // // // // // // //         const allCorrectNow = updatedCorrectness.every((v) => v === true);

// // // // // // // //         if (allCorrectNow) {
// // // // // // // //           setPopupMessage("🏆 You answered all questions correctly! Puzzle unlocked!");
// // // // // // // //           setShowPopup(true);
// // // // // // // //           setTimeout(() => {
// // // // // // // //             setShowPopup(false);
// // // // // // // //             setShowPuzzle(true);
// // // // // // // //           }, 2000);
// // // // // // // //         } else {
// // // // // // // //           setPopupMessage("❌ Some answers were wrong. Try Again to unlock the puzzle!");
// // // // // // // //           setShowPopup(true);
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     }, 600);
// // // // // // // //   };

// // // // // // // //   if (showPuzzle) {
// // // // // // // //     return <PathFind resetQuiz={resetQuiz} />;
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-6" style={{ backgroundImage: `url(${schoolBg})` }}>
// // // // // // // //       <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
// // // // // // // //         <div className="flex justify-between items-center mb-6">
// // // // // // // //           <h2 className="text-3xl font-bold text-gray-800">
// // // // // // // //             {currentLevel.level} Level: Question {currentIndex + 1}/{currentLevel.questions.length}
// // // // // // // //           </h2>
// // // // // // // //         </div>

// // // // // // // //         <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
// // // // // // // //           <p className="font-semibold text-xl mb-2 text-gray-800">{currentQuestion.englishQuestion}</p>
// // // // // // // //           <p className="font-semibold text-lg text-blue-600">{currentQuestion.tamilQuestion}</p>
// // // // // // // //         </div>

// // // // // // // //         <div className="grid grid-cols-1 gap-4">
// // // // // // // //           {currentQuestion.englishOptions.map((opt, idx) => {
// // // // // // // //             const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
// // // // // // // //             const correctAnswer = currentQuestion.correctAnswer.toUpperCase();

// // // // // // // //             return (
// // // // // // // //               <button
// // // // // // // //                 key={idx}
// // // // // // // //                 className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl transition-all duration-300 shadow hover:shadow-lg text-left
// // // // // // // //                   ${selectedAnswer === optionLetter
// // // // // // // //                     ? optionLetter === correctAnswer
// // // // // // // //                       ? "bg-green-300 border-green-500"
// // // // // // // //                       : "bg-red-300 border-red-500"
// // // // // // // //                     : "bg-white border-gray-300 hover:bg-purple-100"
// // // // // // // //                   }`}
// // // // // // // //                 onClick={() => handleAnswer(idx)}
// // // // // // // //               >
// // // // // // // //                 <span className="font-bold text-lg">{optionLetter}.</span>
// // // // // // // //                 <div>
// // // // // // // //                   <span className="block font-medium text-gray-700">{opt}</span>
// // // // // // // //                   <span className="block text-blue-600">{currentQuestion.tamilOptions[idx]}</span>
// // // // // // // //                 </div>
// // // // // // // //               </button>
// // // // // // // //             );
// // // // // // // //           })}
// // // // // // // //         </div>

// // // // // // // //         {showPopup && (
// // // // // // // //           <Modal>
// // // // // // // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center animate-scaleUp">
// // // // // // // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">{popupMessage}</h2>
// // // // // // // //               <button
// // // // // // // //                 onClick={() => setShowPopup(false)}
// // // // // // // //                 className="mt-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
// // // // // // // //               >
// // // // // // // //                 Close
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </Modal>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };
// // // // // // // // export default Quiz;

// // // // // // // import React, { useState } from "react";
// // // // // // // import Modal from "./Modal";
// // // // // // // import schoolBg from "../assets/school-bg.jpg";
// // // // // // // import PathFind from "../game/PathFind";

// // // // // // // const Quiz = ({ questions }) => {
// // // // // // //   const [levelIndex, setLevelIndex] = useState(0);
// // // // // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // // // // //   const [selectedAnswer, setSelectedAnswer] = useState("");
// // // // // // //   const [answersCorrectness, setAnswersCorrectness] = useState([]);
// // // // // // //   const [showPopup, setShowPopup] = useState(false);
// // // // // // //   const [popupMessage, setPopupMessage] = useState("");
// // // // // // //   const [showPuzzle, setShowPuzzle] = useState(false);
// // // // // // //   const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
// // // // // // //   const [consecutiveWrong, setConsecutiveWrong] = useState(0);
// // // // // // //   const [levelCompletedPopup, setLevelCompletedPopup] = useState(false);
// // // // // // // const [levelCompletedMessage, setLevelCompletedMessage] = useState("");

// // // // // // //   const currentLevel = questions[levelIndex];
// // // // // // //   const currentQuestion = currentLevel.questions[currentIndex];

// // // // // // //   const resetQuiz = () => {
// // // // // // //     setLevelIndex(0);
// // // // // // //     setCurrentIndex(0);
// // // // // // //     setSelectedAnswer("");
// // // // // // //     setAnswersCorrectness([]);
// // // // // // //     setShowPopup(false);
// // // // // // //     setPopupMessage("");
// // // // // // //     setShowPuzzle(false);
// // // // // // //     setConsecutiveCorrect(0);
// // // // // // //     setConsecutiveWrong(0);
// // // // // // //   };

// // // // // // //   const handleAnswer = (optionIndex) => {
// // // // // // //     const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
// // // // // // //     const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// // // // // // //     const isCorrect = optionLetter === correctAnswer;

// // // // // // //     setSelectedAnswer(optionLetter);

// // // // // // //     const updatedCorrectness = [...answersCorrectness, isCorrect];
// // // // // // //     setAnswersCorrectness(updatedCorrectness);

// // // // // // //     const newConsecutiveCorrect = isCorrect ? consecutiveCorrect + 1 : 0;
// // // // // // //     const newConsecutiveWrong = !isCorrect ? consecutiveWrong + 1 : 0;

// // // // // // //     setConsecutiveCorrect(newConsecutiveCorrect);
// // // // // // //     setConsecutiveWrong(newConsecutiveWrong);

// // // // // // //     if (newConsecutiveCorrect === 3) {
// // // // // // //       setPopupMessage("🎉 3 Correct Answers in a row! Keep it up!");
// // // // // // //       setShowPopup(true);
// // // // // // //       setConsecutiveCorrect(0);
// // // // // // //     } else if (newConsecutiveWrong === 3) {
// // // // // // //       setPopupMessage("⚠️ 3 Wrong Answers in a row. Try focusing!");
// // // // // // //       setShowPopup(true);
// // // // // // //       setConsecutiveWrong(0);
// // // // // // //     }

// // // // // // //     setTimeout(() => {
// // // // // // //       setSelectedAnswer("");

// // // // // // //       if (currentIndex + 1 < currentLevel.questions.length) {
// // // // // // //         setCurrentIndex(currentIndex + 1);
// // // // // // //       } else if (levelIndex + 1 < questions.length) {
// // // // // // //     // Level completed, show popup
// // // // // // //     setLevelCompletedMessage(`🎉 You have completed ${currentLevel.level} level!`);
// // // // // // //     setLevelCompletedPopup(true);
// // // // // // //       }
// // // // // // //       else {
// // // // // // //         const allCorrectNow = updatedCorrectness.every((v) => v === true);

// // // // // // //         if (allCorrectNow) {
// // // // // // //           setPopupMessage("🏆 You answered all questions correctly! Puzzle unlocked!");
// // // // // // //           setShowPopup(true);
// // // // // // //           setTimeout(() => {
// // // // // // //             setShowPopup(false);
// // // // // // //             setShowPuzzle(true);
// // // // // // //           }, 2000);
// // // // // // //         } else {
// // // // // // //           setPopupMessage("❌ Some answers were wrong. Try Again to unlock the puzzle!");
// // // // // // //           setShowPopup(true);
// // // // // // //         }
// // // // // // //       }
// // // // // // //     }, 600);
// // // // // // //   };

// // // // // // //   const handleLevelCompletedClose = () => {
// // // // // // //     setLevelCompletedPopup(false);
// // // // // // //     setLevelIndex(levelIndex + 1);
// // // // // // //     setCurrentIndex(0);
// // // // // // // };

// // // // // // //   if (showPuzzle) return <PathFind resetQuiz={resetQuiz} />;

// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
// // // // // // //       style={{ backgroundImage: `url(${schoolBg})` }}
// // // // // // //     >
// // // // // // //       <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
// // // // // // //         <div className="flex justify-between items-center mb-6">
// // // // // // //           <h2 className="text-3xl font-bold text-gray-800">
// // // // // // //             {currentLevel.level} Level: Question {currentIndex + 1}/{currentLevel.questions.length}
// // // // // // //           </h2>
// // // // // // //         </div>

// // // // // // //         <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
// // // // // // //           <p className="font-semibold text-xl mb-2 text-gray-800">{currentQuestion.englishQuestion}</p>
// // // // // // //           <p className="font-semibold text-lg text-blue-600">{currentQuestion.tamilQuestion}</p>
// // // // // // //         </div>

// // // // // // //         <div className="grid grid-cols-1 gap-4">
// // // // // // //           {currentQuestion.englishOptions.map((opt, idx) => {
// // // // // // //             const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
// // // // // // //             const correctAnswer = currentQuestion.correctAnswer.toUpperCase();

// // // // // // //             return (
// // // // // // //               <button
// // // // // // //                 key={idx}
// // // // // // //                 className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl transition-all duration-300 shadow hover:shadow-lg text-left
// // // // // // //                   ${selectedAnswer === optionLetter
// // // // // // //                     ? optionLetter === correctAnswer
// // // // // // //                       ? "bg-green-300 border-green-500"
// // // // // // //                       : "bg-red-300 border-red-500"
// // // // // // //                     : "bg-white border-gray-300 hover:bg-purple-100"
// // // // // // //                   }`}
// // // // // // //                 onClick={() => handleAnswer(idx)}
// // // // // // //               >
// // // // // // //                 <span className="font-bold text-lg">{optionLetter}.</span>
// // // // // // //                 <div>
// // // // // // //                   <span className="block font-medium text-gray-700">{opt}</span>
// // // // // // //                   <span className="block text-blue-600">{currentQuestion.tamilOptions[idx]}</span>
// // // // // // //                 </div>
// // // // // // //               </button>
// // // // // // //             );
// // // // // // //           })}
// // // // // // //         </div>

// // // // // // //         {showPopup && (
// // // // // // //           <Modal>
// // // // // // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center animate-scaleUp">
// // // // // // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">{popupMessage}</h2>
// // // // // // //               <button
// // // // // // //                 onClick={() => setShowPopup(false)}
// // // // // // //                 className="mt-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
// // // // // // //               >
// // // // // // //                 Close
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </Modal>
// // // // // // //         )}

// // // // // // //         {levelCompletedPopup && (
// // // // // // //   <Modal>
// // // // // // //     <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-green-200 via-white to-blue-200 rounded-3xl shadow-2xl text-center animate-scaleUp">
// // // // // // //       <h2 className="text-2xl font-bold text-purple-700 mb-4">
// // // // // // //         {levelCompletedMessage}
// // // // // // //       </h2>
// // // // // // //       <button
// // // // // // //         onClick={handleLevelCompletedClose}
// // // // // // //         className="mt-2 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
// // // // // // //       >
// // // // // // //         Continue
// // // // // // //       </button>
// // // // // // //     </div>
// // // // // // //   </Modal>
// // // // // // // )}

// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Quiz;

// // // // // // import React, { useState } from "react";
// // // // // // import Modal from "./Modal";
// // // // // // import schoolBg from "../assets/school-bg.jpg";
// // // // // // import PathFind from "../game/PathFind";
// // // // // // import levelCompleteSound from "../assets/level-complete.mp3"; // Add your sound here

// // // // // // const Quiz = ({ questions }) => {
// // // // // //   const [levelIndex, setLevelIndex] = useState(0);
// // // // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // // // //   const [selectedAnswer, setSelectedAnswer] = useState("");
// // // // // //   const [answersCorrectness, setAnswersCorrectness] = useState([]);
// // // // // //   const [showPopup, setShowPopup] = useState(false);
// // // // // //   const [popupMessage, setPopupMessage] = useState("");
// // // // // //   const [showPuzzle, setShowPuzzle] = useState(false);
// // // // // //   const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
// // // // // //   const [consecutiveWrong, setConsecutiveWrong] = useState(0);
// // // // // //   const [levelCompletedPopup, setLevelCompletedPopup] = useState(false);
// // // // // //   const [levelCompletedMessage, setLevelCompletedMessage] = useState("");

// // // // // //   const levelCompleteAudio = new Audio(levelCompleteSound); // Audio object

// // // // // //   const currentLevel = questions[levelIndex];
// // // // // //   const currentQuestion = currentLevel.questions[currentIndex];

// // // // // //   const resetQuiz = () => {
// // // // // //     setLevelIndex(0);
// // // // // //     setCurrentIndex(0);
// // // // // //     setSelectedAnswer("");
// // // // // //     setAnswersCorrectness([]);
// // // // // //     setShowPopup(false);
// // // // // //     setPopupMessage("");
// // // // // //     setShowPuzzle(false);
// // // // // //     setConsecutiveCorrect(0);
// // // // // //     setConsecutiveWrong(0);
// // // // // //   };

// // // // // //   const handleAnswer = (optionIndex) => {
// // // // // //     const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
// // // // // //     const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// // // // // //     const isCorrect = optionLetter === correctAnswer;

// // // // // //     setSelectedAnswer(optionLetter);

// // // // // //     const updatedCorrectness = [...answersCorrectness, isCorrect];
// // // // // //     setAnswersCorrectness(updatedCorrectness);

// // // // // //     const newConsecutiveCorrect = isCorrect ? consecutiveCorrect + 1 : 0;
// // // // // //     const newConsecutiveWrong = !isCorrect ? consecutiveWrong + 1 : 0;

// // // // // //     setConsecutiveCorrect(newConsecutiveCorrect);
// // // // // //     setConsecutiveWrong(newConsecutiveWrong);

// // // // // //     if (newConsecutiveCorrect === 3) {
// // // // // //       setPopupMessage("🎉 3 Correct Answers in a row! Keep it up!");
// // // // // //       setShowPopup(true);
// // // // // //       setConsecutiveCorrect(0);
// // // // // //     } else if (newConsecutiveWrong === 3) {
// // // // // //       setPopupMessage("⚠️ 3 Wrong Answers in a row. Try focusing!");
// // // // // //       setShowPopup(true);
// // // // // //       setConsecutiveWrong(0);
// // // // // //     }

// // // // // //     setTimeout(() => {
// // // // // //       setSelectedAnswer("");

// // // // // //       if (currentIndex + 1 < currentLevel.questions.length) {
// // // // // //         setCurrentIndex(currentIndex + 1);
// // // // // //       } else if (levelIndex + 1 < questions.length) {
// // // // // //         // Level completed
// // // // // //         setLevelCompletedMessage(`🎉 You have completed ${currentLevel.level} level!`);
// // // // // //         setLevelCompletedPopup(true);
// // // // // //         levelCompleteAudio.play(); // Play sound
// // // // // //       } else {
// // // // // //         const allCorrectNow = updatedCorrectness.every((v) => v === true);

// // // // // //         if (allCorrectNow) {
// // // // // //           setPopupMessage("🏆 You answered all questions correctly! Puzzle unlocked!");
// // // // // //           setShowPopup(true);
// // // // // //           setTimeout(() => {
// // // // // //             setShowPopup(false);
// // // // // //             setShowPuzzle(true);
// // // // // //           }, 2000);
// // // // // //         } else {
// // // // // //           setPopupMessage("❌ Some answers were wrong. Try Again to unlock the puzzle!");
// // // // // //           setShowPopup(true);
// // // // // //         }
// // // // // //       }
// // // // // //     }, 600);
// // // // // //   };

// // // // // //   const handleLevelCompletedClose = () => {
// // // // // //     setLevelCompletedPopup(false);
// // // // // //     setLevelIndex(levelIndex + 1);
// // // // // //     setCurrentIndex(0);
// // // // // //     setAnswersCorrectness([]);
// // // // // //   };

// // // // // //   if (showPuzzle) return <PathFind resetQuiz={resetQuiz} />;

// // // // // //   return (
// // // // // //     <div
// // // // // //       className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
// // // // // //       style={{ backgroundImage: `url(${schoolBg})` }}
// // // // // //     >
// // // // // //       <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
// // // // // //         <div className="flex justify-between items-center mb-6">
// // // // // //           <h2 className="text-3xl font-bold text-gray-800">
// // // // // //             {currentLevel.level} Level: Question {currentIndex + 1}/{currentLevel.questions.length}
// // // // // //           </h2>
// // // // // //         </div>

// // // // // //         <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
// // // // // //           <p className="font-semibold text-xl mb-2 text-gray-800">{currentQuestion.englishQuestion}</p>
// // // // // //           <p className="font-semibold text-lg text-blue-600">{currentQuestion.tamilQuestion}</p>
// // // // // //         </div>

// // // // // //         <div className="grid grid-cols-1 gap-4">
// // // // // //           {currentQuestion.englishOptions.map((opt, idx) => {
// // // // // //             const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
// // // // // //             const correctAnswer = currentQuestion.correctAnswer.toUpperCase();

// // // // // //             return (
// // // // // //               <button
// // // // // //                 key={idx}
// // // // // //                 className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl transition-all duration-300 shadow hover:shadow-lg text-left
// // // // // //                   ${selectedAnswer === optionLetter
// // // // // //                     ? optionLetter === correctAnswer
// // // // // //                       ? "bg-green-300 border-green-500"
// // // // // //                       : "bg-red-300 border-red-500"
// // // // // //                     : "bg-white border-gray-300 hover:bg-purple-100"
// // // // // //                   }`}
// // // // // //                 onClick={() => handleAnswer(idx)}
// // // // // //               >
// // // // // //                 <span className="font-bold text-lg">{optionLetter}.</span>
// // // // // //                 <div>
// // // // // //                   <span className="block font-medium text-gray-700">{opt}</span>
// // // // // //                   <span className="block text-blue-600">{currentQuestion.tamilOptions[idx]}</span>
// // // // // //                 </div>
// // // // // //               </button>
// // // // // //             );
// // // // // //           })}
// // // // // //         </div>

// // // // // //         {showPopup && (
// // // // // //           <Modal>
// // // // // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center animate-scaleUp">
// // // // // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">{popupMessage}</h2>
// // // // // //               <button
// // // // // //                 onClick={() => setShowPopup(false)}
// // // // // //                 className="mt-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
// // // // // //               >
// // // // // //                 Close
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </Modal>
// // // // // //         )}

// // // // // //         {levelCompletedPopup && (
// // // // // //           <Modal>
// // // // // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-green-200 via-white to-blue-200 rounded-3xl shadow-2xl text-center animate-scaleUp">
// // // // // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">
// // // // // //                 {levelCompletedMessage}
// // // // // //               </h2>
// // // // // //               <button
// // // // // //                 onClick={handleLevelCompletedClose}
// // // // // //                 className="mt-2 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
// // // // // //               >
// // // // // //                 Continue
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </Modal>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Quiz;

// // // // // // src/components/Quiz.jsx
// // // // // import React, { useState } from "react";
// // // // // import Modal from "./Modal";
// // // // // import schoolBg from "../assets/school-bg.jpg";
// // // // // import levelCompleteSound from "../assets/level-complete.mp3";
// // // // // import MemoryFlipGame from "../game/MemoryFlipGame"; // Import the new game component

// // // // // const Quiz = ({ questions }) => {
// // // // //   const [levelIndex, setLevelIndex] = useState(0);
// // // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // // //   const [selectedAnswer, setSelectedAnswer] = useState("");
// // // // //   const [answersCorrectness, setAnswersCorrectness] = useState([]);
// // // // //   const [showPopup, setShowPopup] = useState(false);
// // // // //   const [popupMessage, setPopupMessage] = useState("");
// // // // //   const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
// // // // //   const [consecutiveWrong, setConsecutiveWrong] = useState(0);
// // // // //   const [levelCompletedPopup, setLevelCompletedPopup] = useState(false);
// // // // //   const [levelCompletedMessage, setLevelCompletedMessage] = useState("");
// // // // //   const [showGame, setShowGame] = useState(false);

// // // // //   const levelCompleteAudio = new Audio(levelCompleteSound);

// // // // //   const currentLevel = questions[levelIndex];
// // // // //   const currentQuestion = currentLevel.questions[currentIndex];

// // // // //   const resetQuiz = () => {
// // // // //     setLevelIndex(0);
// // // // //     setCurrentIndex(0);
// // // // //     setSelectedAnswer("");
// // // // //     setAnswersCorrectness([]);
// // // // //     setShowPopup(false);
// // // // //     setPopupMessage("");
// // // // //     setConsecutiveCorrect(0);
// // // // //     setConsecutiveWrong(0);
// // // // //     setLevelCompletedPopup(false);
// // // // //     setShowGame(false);
// // // // //   };

// // // // //   const handleAnswer = (optionIndex) => {
// // // // //     const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
// // // // //     const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// // // // //     const isCorrect = optionLetter === correctAnswer;

// // // // //     setSelectedAnswer(optionLetter);

// // // // //     const updatedCorrectness = [...answersCorrectness, isCorrect];
// // // // //     setAnswersCorrectness(updatedCorrectness);

// // // // //     setConsecutiveCorrect(isCorrect ? consecutiveCorrect + 1 : 0);
// // // // //     setConsecutiveWrong(!isCorrect ? consecutiveWrong + 1 : 0);

// // // // //     if (consecutiveCorrect + 1 === 3) {
// // // // //       setPopupMessage("🎉 3 Correct Answers in a row! Keep it up!");
// // // // //       setShowPopup(true);
// // // // //       setConsecutiveCorrect(0);
// // // // //     } else if (consecutiveWrong + 1 === 3) {
// // // // //       setPopupMessage("⚠️ 3 Wrong Answers in a row. Try focusing!");
// // // // //       setShowPopup(true);
// // // // //       setConsecutiveWrong(0);
// // // // //     }

// // // // //     setTimeout(() => {
// // // // //       setSelectedAnswer("");

// // // // //       // If more questions in current level
// // // // //       if (currentIndex + 1 < currentLevel.questions.length) {
// // // // //         setCurrentIndex(currentIndex + 1);
// // // // //       } else {
// // // // //         // Level completed
// // // // //         setLevelCompletedMessage(`🎉 You have completed ${currentLevel.level} level!`);
// // // // //         setLevelCompletedPopup(true);
// // // // //         levelCompleteAudio.play();
// // // // //       }
// // // // //     }, 600);
// // // // //   };

// // // // //   const handleLevelCompletedClose = () => {
// // // // //     setLevelCompletedPopup(false);
// // // // //     setShowGame(true); // Show game after level completion
// // // // //   };

// // // // //   const handleGameComplete = () => {
// // // // //     setShowGame(false);
// // // // //     // Move to next level
// // // // //     let nextLevelIndex = levelIndex + 1;
// // // // //     if (nextLevelIndex < questions.length) {
// // // // //       setLevelIndex(nextLevelIndex);
// // // // //       setCurrentIndex(0);
// // // // //       setSelectedAnswer("");
// // // // //       setAnswersCorrectness([]);
// // // // //     } else {
// // // // //       // All levels completed
// // // // //       setPopupMessage("🏆 You completed all levels of this subject!");
// // // // //       setShowPopup(true);
// // // // //     }
// // // // //   };

// // // // //   // Render MemoryFlipGame if showGame
// // // // //   if (showGame) return <MemoryFlipGame onComplete={handleGameComplete} />;

// // // // //   return (
// // // // //     <div
// // // // //       className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
// // // // //       style={{ backgroundImage: `url(${schoolBg})` }}
// // // // //     >
// // // // //       <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
// // // // //         <div className="flex justify-between items-center mb-6">
// // // // //           <h2 className="text-3xl font-bold text-gray-800">
// // // // //             {currentLevel.level} Level: Question {currentIndex + 1}/{currentLevel.questions.length}
// // // // //           </h2>
// // // // //         </div>

// // // // //         <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 animate-fadeIn">
// // // // //           <p className="font-semibold text-xl mb-2 text-gray-800">{currentQuestion.englishQuestion}</p>
// // // // //           <p className="font-semibold text-lg text-blue-600">{currentQuestion.tamilQuestion}</p>
// // // // //         </div>

// // // // //         <div className="grid grid-cols-1 gap-4">
// // // // //           {currentQuestion.englishOptions.map((opt, idx) => {
// // // // //             const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
// // // // //             const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// // // // //             return (
// // // // //               <button
// // // // //                 key={idx}
// // // // //                 className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl transition-all duration-300 shadow hover:shadow-lg text-left
// // // // //                   ${selectedAnswer === optionLetter
// // // // //                     ? optionLetter === correctAnswer
// // // // //                       ? "bg-green-300 border-green-500"
// // // // //                       : "bg-red-300 border-red-500"
// // // // //                     : "bg-white border-gray-300 hover:bg-purple-100"
// // // // //                   }`}
// // // // //                 onClick={() => handleAnswer(idx)}
// // // // //               >
// // // // //                 <span className="font-bold text-lg">{optionLetter}.</span>
// // // // //                 <div>
// // // // //                   <span className="block font-medium text-gray-700">{opt}</span>
// // // // //                   <span className="block text-blue-600">{currentQuestion.tamilOptions[idx]}</span>
// // // // //                 </div>
// // // // //               </button>
// // // // //             );
// // // // //           })}
// // // // //         </div>

// // // // //         {showPopup && (
// // // // //           <Modal>
// // // // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center animate-scaleUp">
// // // // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">{popupMessage}</h2>
// // // // //               <button
// // // // //                 onClick={() => setShowPopup(false)}
// // // // //                 className="mt-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
// // // // //               >
// // // // //                 Close
// // // // //               </button>
// // // // //             </div>
// // // // //           </Modal>
// // // // //         )}

// // // // //         {levelCompletedPopup && (
// // // // //           <Modal>
// // // // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-green-200 via-white to-blue-200 rounded-3xl shadow-2xl text-center animate-scaleUp">
// // // // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">{levelCompletedMessage}</h2>
// // // // //               <button
// // // // //                 onClick={handleLevelCompletedClose}
// // // // //                 className="mt-2 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
// // // // //               >
// // // // //                 Play Game
// // // // //               </button>
// // // // //             </div>
// // // // //           </Modal>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Quiz;

// // // // import React, { useState, useEffect } from "react";
// // // // import Modal from "./Modal";
// // // // import schoolBg from "../assets/school-bg.jpg";
// // // // import levelCompleteSound from "../assets/level-complete.mp3";
// // // // import { motion } from "framer-motion";

// // // // const Quiz = ({ questions }) => {
// // // //   const [levelIndex, setLevelIndex] = useState(0);
// // // //   const [currentIndex, setCurrentIndex] = useState(0);
// // // //   const [selectedAnswer, setSelectedAnswer] = useState("");
// // // //   const [answersCorrectness, setAnswersCorrectness] = useState([]);
// // // //   const [showPopup, setShowPopup] = useState(false);
// // // //   const [popupMessage, setPopupMessage] = useState("");
// // // //   const [levelCompletedPopup, setLevelCompletedPopup] = useState(false);
// // // //   const [levelCompletedMessage, setLevelCompletedMessage] = useState("");
// // // //   const [showGame, setShowGame] = useState(false);

// // // //   const levelCompleteAudio = new Audio(levelCompleteSound);

// // // //   const currentLevel = questions[levelIndex];
// // // //   const currentQuestion = currentLevel.questions[currentIndex];

// // // //   const resetQuiz = () => {
// // // //     setLevelIndex(0);
// // // //     setCurrentIndex(0);
// // // //     setSelectedAnswer("");
// // // //     setAnswersCorrectness([]);
// // // //     setShowPopup(false);
// // // //     setPopupMessage("");
// // // //     setLevelCompletedPopup(false);
// // // //     setLevelCompletedMessage("");
// // // //     setShowGame(false);
// // // //   };

// // // //   const handleAnswer = (optionIndex) => {
// // // //     const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
// // // //     const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// // // //     const isCorrect = optionLetter === correctAnswer;

// // // //     setSelectedAnswer(optionLetter);

// // // //     const updatedCorrectness = [...answersCorrectness, isCorrect];
// // // //     setAnswersCorrectness(updatedCorrectness);

// // // //     setTimeout(() => {
// // // //       setSelectedAnswer("");

// // // //       if (currentIndex + 1 < currentLevel.questions.length) {
// // // //         setCurrentIndex(currentIndex + 1);
// // // //       } else {
// // // //         // Level completed
// // // //         setLevelCompletedMessage(`🎉 You completed ${currentLevel.level} level!`);
// // // //         setLevelCompletedPopup(true);
// // // //         levelCompleteAudio.play();
// // // //       }
// // // //     }, 500);
// // // //   };

// // // //   const handleLevelCompletedClose = () => {
// // // //     setLevelCompletedPopup(false);
// // // //     setShowGame(true); // show a game after level completion
// // // //   };

// // // //   const handleGameComplete = () => {
// // // //     setShowGame(false);
// // // //     const nextLevel = levelIndex + 1;
// // // //     if (nextLevel < questions.length) {
// // // //       setLevelIndex(nextLevel);
// // // //       setCurrentIndex(0);
// // // //       setAnswersCorrectness([]);
// // // //     } else {
// // // //       setPopupMessage("🏆 You completed all levels!");
// // // //       setShowPopup(true);
// // // //     }
// // // //   };

// // // //   // --- Inline Games for each level ---
// // // //   const MemoryFlipGame = ({ onComplete }) => {
// // // //     const symbols = ["🍎", "🍎", "🚗", "🚗", "🎵", "🎵", "🐶", "🐶"];
// // // //     const [cards, setCards] = useState(symbols.sort(() => Math.random() - 0.5));
// // // //     const [flipped, setFlipped] = useState([]);
// // // //     const [matched, setMatched] = useState([]);
// // // //     const [moves, setMoves] = useState(0);

// // // //     const handleFlip = (i) => {
// // // //       if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
// // // //       setFlipped([...flipped, i]);
// // // //       if (flipped.length === 1) {
// // // //         const first = flipped[0];
// // // //         const second = i;
// // // //         if (cards[first] === cards[second]) setMatched([...matched, first, second]);
// // // //         setMoves((prev) => prev + 1);
// // // //         setTimeout(() => setFlipped([]), 1000);
// // // //       }
// // // //     };

// // // //     useEffect(() => {
// // // //       if (matched.length === cards.length && cards.length > 0) {
// // // //         setTimeout(onComplete, 1500);
// // // //       }
// // // //     }, [matched]);

// // // //     return (
// // // //       <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500 p-4">
// // // //         <h1 className="text-3xl text-white mb-4">Memory Flip Game</h1>
// // // //         <p className="text-white mb-4">Moves: {moves}</p>
// // // //         <div className="grid grid-cols-4 gap-4">
// // // //           {cards.map((symbol, index) => {
// // // //             const isFlipped = flipped.includes(index) || matched.includes(index);
// // // //             return (
// // // //               <motion.div
// // // //                 key={index}
// // // //                 className="w-20 h-24 cursor-pointer perspective"
// // // //                 onClick={() => handleFlip(index)}
// // // //                 whileTap={{ scale: 0.9 }}
// // // //               >
// // // //                 <motion.div
// // // //                   className="relative w-full h-full transition-transform duration-500"
// // // //                   animate={{ rotateY: isFlipped ? 180 : 0 }}
// // // //                   style={{ transformStyle: "preserve-3d" }}
// // // //                 >
// // // //                   <div className="absolute w-full h-full bg-white rounded-xl flex items-center justify-center text-3xl" style={{ backfaceVisibility: "hidden" }}>❓</div>
// // // //                   <div className="absolute w-full h-full bg-yellow-300 rounded-xl flex items-center justify-center text-3xl" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>{symbol}</div>
// // // //                 </motion.div>
// // // //               </motion.div>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const QuickTapGame = ({ onComplete }) => {
// // // //     const [count, setCount] = useState(0);
// // // //     useEffect(() => {
// // // //       if (count >= 10) setTimeout(onComplete, 1000);
// // // //     }, [count]);
// // // //     return (
// // // //       <div className="flex flex-col items-center justify-center min-h-screen bg-green-500 p-4">
// // // //         <h1 className="text-3xl text-white mb-4">Quick Tap Game</h1>
// // // //         <p className="text-white mb-4">Taps: {count}/10</p>
// // // //         <button className="px-6 py-3 bg-white rounded" onClick={() => setCount(count + 1)}>Tap Me!</button>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const ColorMatchGame = ({ onComplete }) => {
// // // //     const [color, setColor] = useState("red");
// // // //     const [score, setScore] = useState(0);
// // // //     useEffect(() => {
// // // //       if (score >= 5) setTimeout(onComplete, 1000);
// // // //     }, [score]);
// // // //     const colors = ["red", "blue", "green", "yellow"];
// // // //     const randomColor = colors[Math.floor(Math.random() * colors.length)];
// // // //     return (
// // // //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-4">
// // // //         <h1 className="text-3xl text-white mb-4">Color Match Game</h1>
// // // //         <p className="text-white mb-4">Score: {score}/5</p>
// // // //         <button
// // // //           className={`px-6 py-3 rounded text-white`}
// // // //           style={{ backgroundColor: randomColor }}
// // // //           onClick={() => setScore(score + 1)}
// // // //         >
// // // //           Click {randomColor.toUpperCase()}
// // // //         </button>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const getGameByLevel = (level) => {
// // // //     if (level % 3 === 0) return MemoryFlipGame;
// // // //     if (level % 3 === 1) return QuickTapGame;
// // // //     return ColorMatchGame;
// // // //   };

// // // //   if (showGame) {
// // // //     const GameComponent = getGameByLevel(levelIndex);
// // // //     return <GameComponent onComplete={handleGameComplete} />;
// // // //   }

// // // //   // --- Quiz JSX ---
// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-6" style={{ backgroundImage: `url(${schoolBg})` }}>
// // // //       <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
// // // //         <h2 className="text-3xl font-bold text-gray-800 mb-4">
// // // //           {currentLevel.level} Level: Question {currentIndex + 1}/{currentLevel.questions.length}
// // // //         </h2>
// // // //         <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
// // // //           <p className="font-semibold text-xl mb-2 text-gray-800">{currentQuestion.englishQuestion}</p>
// // // //           <p className="font-semibold text-lg text-blue-600">{currentQuestion.tamilQuestion}</p>
// // // //         </div>
// // // //         <div className="grid grid-cols-1 gap-4">
// // // //           {currentQuestion.englishOptions.map((opt, idx) => {
// // // //             const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
// // // //             const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// // // //             return (
// // // //               <button
// // // //                 key={idx}
// // // //                 className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl shadow hover:shadow-lg text-left
// // // //                   ${selectedAnswer === optionLetter
// // // //                     ? optionLetter === correctAnswer
// // // //                       ? "bg-green-300 border-green-500"
// // // //                       : "bg-red-300 border-red-500"
// // // //                     : "bg-white border-gray-300 hover:bg-purple-100"
// // // //                   }`}
// // // //                 onClick={() => handleAnswer(idx)}
// // // //               >
// // // //                 <span className="font-bold text-lg">{optionLetter}.</span>
// // // //                 <div>
// // // //                   <span className="block font-medium text-gray-700">{opt}</span>
// // // //                   <span className="block text-blue-600">{currentQuestion.tamilOptions[idx]}</span>
// // // //                 </div>
// // // //               </button>
// // // //             );
// // // //           })}
// // // //         </div>

// // // //         {showPopup && (
// // // //           <Modal>
// // // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center">
// // // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">{popupMessage}</h2>
// // // //               <button onClick={() => setShowPopup(false)} className="mt-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition">
// // // //                 Close
// // // //               </button>
// // // //             </div>
// // // //           </Modal>
// // // //         )}

// // // //         {levelCompletedPopup && (
// // // //           <Modal>
// // // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-green-200 via-white to-blue-200 rounded-3xl shadow-2xl text-center">
// // // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">{levelCompletedMessage}</h2>
// // // //               <button onClick={handleLevelCompletedClose} className="mt-2 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-full shadow hover:opacity-90 transition">
// // // //                 Play Game
// // // //               </button>
// // // //             </div>
// // // //           </Modal>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Quiz;

// // // import React, { useState, useEffect } from "react";
// // // import Modal from "./Modal";
// // // import schoolBg from "../assets/school-bg.jpg";
// // // import levelCompleteSound from "../assets/level-complete.mp3";
// // // import { motion } from "framer-motion";

// // // // --- Import professional games ---
// // // import WordSearchGame from "../game/WordSearchGame";
// // // import MathPuzzleGame from "../game/MathPuzzleGame";
// // // import { Link } from "react-router-dom";

// // // const Quiz = ({ questions }) => {
// // //   const [levelIndex, setLevelIndex] = useState(0);
// // //   const [currentIndex, setCurrentIndex] = useState(0);
// // //   const [selectedAnswer, setSelectedAnswer] = useState("");
// // //   const [answersCorrectness, setAnswersCorrectness] = useState([]);
// // //   const [showPopup, setShowPopup] = useState(false);
// // //   const [popupMessage, setPopupMessage] = useState("");
// // //   const [levelCompletedPopup, setLevelCompletedPopup] = useState(false);
// // //   const [levelCompletedMessage, setLevelCompletedMessage] = useState("");
// // //   const [showGame, setShowGame] = useState(false);

// // //   const levelCompleteAudio = new Audio(levelCompleteSound);

// // //   const currentLevel = questions[levelIndex];
// // //   const currentQuestion = currentLevel.questions[currentIndex];

// // //   const resetQuiz = () => {
// // //     setLevelIndex(0);
// // //     setCurrentIndex(0);
// // //     setSelectedAnswer("");
// // //     setAnswersCorrectness([]);
// // //     setShowPopup(false);
// // //     setPopupMessage("");
// // //     setLevelCompletedPopup(false);
// // //     setLevelCompletedMessage("");
// // //     setShowGame(false);
// // //   };

// // //   const handleAnswer = (optionIndex) => {
// // //     const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
// // //     const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// // //     const isCorrect = optionLetter === correctAnswer;

// // //     setSelectedAnswer(optionLetter);
// // //     const updatedCorrectness = [...answersCorrectness, isCorrect];
// // //     setAnswersCorrectness(updatedCorrectness);

// // //     setTimeout(() => {
// // //       setSelectedAnswer("");
// // //       if (currentIndex + 1 < currentLevel.questions.length) {
// // //         setCurrentIndex(currentIndex + 1);
// // //       } else {
// // //         setLevelCompletedMessage(`🎉 You completed ${currentLevel.level} level!`);
// // //         setLevelCompletedPopup(true);
// // //         levelCompleteAudio.play();
// // //       }
// // //     }, 500);
// // //   };

// // //   const handleLevelCompletedClose = () => {
// // //     setLevelCompletedPopup(false);
// // //     setShowGame(true);
// // //   };

// // //   const handleGameComplete = () => {
// // //     setShowGame(false);
// // //     const nextLevel = levelIndex + 1;
// // //     if (nextLevel < questions.length) {
// // //       setLevelIndex(nextLevel);
// // //       setCurrentIndex(0);
// // //       setAnswersCorrectness([]);
// // //     } else {
// // //       setPopupMessage("🏆 You completed all levels!");
// // //       setShowPopup(true);
// // //     }
// // //   };

// // //   // --- Inline Memory Flip Game for Easy Level ---
// // //   const MemoryFlipGame = ({ onComplete }) => {
// // //     const symbols = ["🍎", "🍎", "🚗", "🚗", "🎵", "🎵", "🐶", "🐶"];
// // //     const [cards, setCards] = useState(symbols.sort(() => Math.random() - 0.5));
// // //     const [flipped, setFlipped] = useState([]);
// // //     const [matched, setMatched] = useState([]);
// // //     const [moves, setMoves] = useState(0);

// // //     const handleFlip = (i) => {
// // //       if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
// // //       setFlipped([...flipped, i]);
// // //       if (flipped.length === 1) {
// // //         const first = flipped[0];
// // //         const second = i;
// // //         if (cards[first] === cards[second]) setMatched([...matched, first, second]);
// // //         setMoves((prev) => prev + 1);
// // //         setTimeout(() => setFlipped([]), 1000);
// // //       }
// // //     };

// // //     useEffect(() => {
// // //       if (matched.length === cards.length && cards.length > 0) {
// // //         setTimeout(onComplete, 1500);
// // //       }
// // //     }, [matched]);

// // //     return (
// // //       <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500 p-4">
// // //         <h1 className="text-3xl text-white mb-4">Memory Flip Game</h1>
// // //         <p className="text-white mb-4">Moves: {moves}</p>
// // //         <div className="grid grid-cols-4 gap-4">
// // //           {cards.map((symbol, index) => {
// // //             const isFlipped = flipped.includes(index) || matched.includes(index);
// // //             return (
// // //               <motion.div
// // //                 key={index}
// // //                 className="w-20 h-24 cursor-pointer perspective"
// // //                 onClick={() => handleFlip(index)}
// // //                 whileTap={{ scale: 0.9 }}
// // //               >
// // //                 <motion.div
// // //                   className="relative w-full h-full transition-transform duration-500"
// // //                   animate={{ rotateY: isFlipped ? 180 : 0 }}
// // //                   style={{ transformStyle: "preserve-3d" }}
// // //                 >
// // //                   <div className="absolute w-full h-full bg-white rounded-xl flex items-center justify-center text-3xl" style={{ backfaceVisibility: "hidden" }}>❓</div>
// // //                   <div className="absolute w-full h-full bg-yellow-300 rounded-xl flex items-center justify-center text-3xl" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>{symbol}</div>
// // //                 </motion.div>
// // //               </motion.div>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   // --- Select game by level ---
// // //   const getGameByLevel = (level) => {
// // //     switch(level) {
// // //       case 0: // Easy
// // //         return MemoryFlipGame;
// // //       case 1: // Medium
// // //         return WordSearchGame;
// // //       case 2: // Difficult
// // //         return MathPuzzleGame;
// // //       default:
// // //         return MemoryFlipGame;
// // //     }
// // //   };

// // //   // --- Show game if level completed ---
// // //   if (showGame) {
// // //     const GameComponent = getGameByLevel(levelIndex);
// // //     return <GameComponent onComplete={handleGameComplete} />;
// // //   }

// // //   // --- Quiz JSX ---
// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-6" style={{ backgroundImage: `url(${schoolBg})` }}>
// // //       <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
// // //         <h2 className="text-3xl font-bold text-gray-800 mb-4">
// // //           {currentLevel.level} Level: Question {currentIndex + 1}/{currentLevel.questions.length}
// // //         </h2>
// // //         <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
// // //           <p className="font-semibold text-xl mb-2 text-gray-800">{currentQuestion.englishQuestion}</p>
// // //           <p className="font-semibold text-lg text-blue-600">{currentQuestion.tamilQuestion}</p>
// // //         </div>
// // //         <div className="grid grid-cols-1 gap-4">
// // //           {currentQuestion.englishOptions.map((opt, idx) => {
// // //             const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
// // //             const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// // //             return (
// // //               <button
// // //                 key={idx}
// // //                 className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl shadow hover:shadow-lg text-left
// // //                   ${selectedAnswer === optionLetter
// // //                     ? optionLetter === correctAnswer
// // //                       ? "bg-green-300 border-green-500"
// // //                       : "bg-red-300 border-red-500"
// // //                     : "bg-white border-gray-300 hover:bg-purple-100"
// // //                   }`}
// // //                 onClick={() => handleAnswer(idx)}
// // //               >
// // //                 <span className="font-bold text-lg">{optionLetter}.</span>
// // //                 <div>
// // //                   <span className="block font-medium text-gray-700">{opt}</span>
// // //                   <span className="block text-blue-600">{currentQuestion.tamilOptions[idx]}</span>
// // //                 </div>
// // //               </button>
// // //             );
// // //           })}
// // //         </div>

// // //         {showPopup && (
// // //           <Modal>
// // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center">
// // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">{popupMessage}</h2>
// // //               <Link to={"/studentdashboard"}>
// // //               <button onClick={() => setShowPopup(false)} className="mt-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition">
// // //                 Close
// // //               </button>
// // //               </Link>
// // //             </div>
// // //           </Modal>
// // //         )}

// // //         {levelCompletedPopup && (
// // //           <Modal>
// // //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-green-200 via-white to-blue-200 rounded-3xl shadow-2xl text-center">
// // //               <h2 className="text-2xl font-bold text-purple-700 mb-4">{levelCompletedMessage}</h2>
// // //               <button onClick={handleLevelCompletedClose} className="mt-2 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-full shadow hover:opacity-90 transition">
// // //                 Play Game
// // //               </button>
// // //             </div>
// // //           </Modal>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Quiz;

// // import React, { useState, useEffect } from "react";
// // import Modal from "./Modal";
// // import schoolBg from "../assets/school-bg.jpg";
// // import levelCompleteSound from "../assets/level-complete.mp3";

// // // 🎵 Correct sound effects
// // import greatSound from "../assets/Good.mp3";
// // import commonSound from "../assets/Come-on.mp3";
// // import excellentSound from "../assets/Excellent.mp3";
// // import startgame from "../assets/StartGame.mp3";

// // import { motion } from "framer-motion";
// // import WordSearchGame from "../game/WordSearchGame";
// // import MathPuzzleGame from "../game/MathPuzzleGame";
// // import { Link } from "react-router-dom";

// // const Quiz = ({ questions }) => {
// //   const [levelIndex, setLevelIndex] = useState(0);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [selectedAnswer, setSelectedAnswer] = useState("");
// //   const [answersCorrectness, setAnswersCorrectness] = useState([]);
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [popupMessage, setPopupMessage] = useState("");
// //   const [levelCompletedPopup, setLevelCompletedPopup] = useState(false);
// //   const [levelCompletedMessage, setLevelCompletedMessage] = useState("");
// //   const [showGame, setShowGame] = useState(false);

// //   // 🔊 Audio
// //   const levelCompleteAudio = new Audio(levelCompleteSound);
// //   const greatAudio = new Audio(greatSound);
// //   const commonAudio = new Audio(commonSound);
// //   const excellentAudio = new Audio(excellentSound);
// //   const startGameAudio = new Audio(startgame);

// //   const currentLevel = questions[levelIndex];
// //   const currentQuestion = currentLevel.questions[currentIndex];

// //   // 👉 Track streaks
// //   const [correctStreak, setCorrectStreak] = useState(0);
// //   const [wrongStreak, setWrongStreak] = useState(0);

// //   const resetQuiz = () => {
// //     setLevelIndex(0);
// //     setCurrentIndex(0);
// //     setSelectedAnswer("");
// //     setAnswersCorrectness([]);
// //     setShowPopup(false);
// //     setPopupMessage("");
// //     setLevelCompletedPopup(false);
// //     setLevelCompletedMessage("");
// //     setShowGame(false);
// //     setCorrectStreak(0);
// //     setWrongStreak(0);
// //   };

// //   const handleAnswer = (optionIndex) => {
// //     const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
// //     const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// //     const isCorrect = optionLetter === correctAnswer;

// //     setSelectedAnswer(optionLetter);
// //     const updatedCorrectness = [...answersCorrectness, isCorrect];
// //     setAnswersCorrectness(updatedCorrectness);

// //     // 👉 Update streaks
// //     if (isCorrect) {
// //       setCorrectStreak((prev) => prev + 1);
// //       setWrongStreak(0);
// //     } else {
// //       setWrongStreak((prev) => prev + 1);
// //       setCorrectStreak(0);
// //     }

// //     // 👉 Popup checks
// //     setTimeout(() => {
// //       if (isCorrect && correctStreak + 1 === 3) {
// //         setPopupMessage("🌟 Good!");
// //         setShowPopup(true);
// //         greatAudio.play();
// //       }
// //       if (!isCorrect && wrongStreak + 1 === 3) {
// //         setPopupMessage("💪 Come on, you can do it!");
// //         setShowPopup(true);
// //         commonAudio.play();
// //       }
// //       if (isCorrect && correctStreak + 1 === 6) {
// //         setPopupMessage("🌟 Excellent!");
// //         setShowPopup(true);
// //         excellentAudio.play();
// //       }
// //     }, 300);

// //     setTimeout(() => {
// //       setSelectedAnswer("");
// //       if (currentIndex + 1 < currentLevel.questions.length) {
// //         setCurrentIndex(currentIndex + 1);
// //       } else {
// //         setLevelCompletedMessage(
// //           `🎉 You completed ${currentLevel.level} level!`
// //         );
// //         setLevelCompletedPopup(true);
// //         // levelCompleteAudio.play();
// //         startGameAudio.play();
// //       }
// //     }, 500);
// //   };

// //   const handleLevelCompletedClose = () => {
// //     setLevelCompletedPopup(false);
// //     setShowGame(true);
// //   };

// //   const handleGameComplete = () => {
// //     setShowGame(false);
// //     const nextLevel = levelIndex + 1;
// //     if (nextLevel < questions.length) {
// //       setLevelIndex(nextLevel);
// //       setCurrentIndex(0);
// //       setAnswersCorrectness([]);
// //       setCorrectStreak(0);
// //       setWrongStreak(0);
// //     } else {
// //       setPopupMessage("🏆 You completed all levels!");
// //       levelCompleteAudio.play();
// //       setShowPopup(true);
// //       setTimeout(() => {
// //         setShowPopup(false); // hide popup
// //         window.location.href = "/studentdashboard";
// //       }, 2000);
// //     }
// //   };

// //   // --- Inline Memory Flip Game ---
// //   const MemoryFlipGame = ({ onComplete }) => {
// //     const symbols = ["🍎", "🍎", "🚗", "🚗", "🎵", "🎵", "🐶", "🐶"];
// //     const [cards, setCards] = useState(symbols.sort(() => Math.random() - 0.5));
// //     const [flipped, setFlipped] = useState([]);
// //     const [matched, setMatched] = useState([]);
// //     const [moves, setMoves] = useState(0);

// //     const handleFlip = (i) => {
// //       if (flipped.length === 2 || flipped.includes(i) || matched.includes(i))
// //         return;
// //       setFlipped([...flipped, i]);
// //       if (flipped.length === 1) {
// //         const first = flipped[0];
// //         const second = i;
// //         if (cards[first] === cards[second])
// //           setMatched([...matched, first, second]);
// //         setMoves((prev) => prev + 1);
// //         setTimeout(() => setFlipped([]), 1000);
// //       }
// //     };

// //     useEffect(() => {
// //       if (matched.length === cards.length && cards.length > 0) {
// //         setTimeout(onComplete, 1500);
// //       }
// //     }, [matched]);

// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500 p-4">
// //         <h1 className="text-3xl text-white mb-4">Memory Flip Game</h1>
// //         <p className="text-white mb-4">Moves: {moves}</p>
// //         <div className="grid grid-cols-4 gap-4">
// //           {cards.map((symbol, index) => {
// //             const isFlipped =
// //               flipped.includes(index) || matched.includes(index);
// //             return (
// //               <motion.div
// //                 key={index}
// //                 className="w-20 h-24 cursor-pointer perspective"
// //                 onClick={() => handleFlip(index)}
// //                 whileTap={{ scale: 0.9 }}
// //               >
// //                 <motion.div
// //                   className="relative w-full h-full transition-transform duration-500"
// //                   animate={{ rotateY: isFlipped ? 180 : 0 }}
// //                   style={{ transformStyle: "preserve-3d" }}
// //                 >
// //                   <div
// //                     className="absolute w-full h-full bg-white rounded-xl flex items-center justify-center text-3xl"
// //                     style={{ backfaceVisibility: "hidden" }}
// //                   >
// //                     ❓
// //                   </div>
// //                   <div
// //                     className="absolute w-full h-full bg-yellow-300 rounded-xl flex items-center justify-center text-3xl"
// //                     style={{
// //                       transform: "rotateY(180deg)",
// //                       backfaceVisibility: "hidden",
// //                     }}
// //                   >
// //                     {symbol}
// //                   </div>
// //                 </motion.div>
// //               </motion.div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     );
// //   };

// //   // --- Select game by level ---
// //   const getGameByLevel = (level) => {
// //     switch (level) {
// //       case 0:
// //         return MemoryFlipGame; // Easy
// //       case 1:
// //         return WordSearchGame; // Medium
// //       case 2:
// //         return MathPuzzleGame; // Hard
// //       default:
// //         return MemoryFlipGame;
// //     }
// //   };

// //   // --- Show game if level completed ---
// //   if (showGame) {
// //     const GameComponent = getGameByLevel(levelIndex);
// //     return <GameComponent onComplete={handleGameComplete} />;
// //   }

// //   // --- Quiz JSX ---
// //   return (
// //     <div
// //       className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
// //       style={{ backgroundImage: `url(${schoolBg})` }}
// //     >
// //       <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
// //         <h2 className="text-3xl font-bold text-gray-800 mb-4">
// //           <span
// //             className={
// //               currentLevel.level === "Easy"
// //                 ? "text-green-600"
// //                 : currentLevel.level === "Medium"
// //                 ? "text-yellow-600"
// //                 : "text-red-600"
// //             }
// //           >
// //             {currentLevel.level+" Level: "}
// //           </span>{" "}
// //            Question{currentIndex + 1}/{currentLevel.questions.length}
// //         </h2>

// //         <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
// //           <p className="font-semibold text-xl mb-2 text-gray-800">
// //             {currentQuestion.englishQuestion}
// //           </p>
// //           <p className="font-semibold text-lg text-blue-600">
// //             {currentQuestion.tamilQuestion}
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 gap-4">
// //           {currentQuestion.englishOptions.map((opt, idx) => {
// //             const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
// //             const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
// //             return (
// //               <button
// //                 key={idx}
// //                 className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl shadow hover:shadow-lg text-left
// //                   ${
// //                     selectedAnswer === optionLetter
// //                       ? optionLetter === correctAnswer
// //                         ? "bg-green-300 border-green-500"
// //                         : "bg-red-300 border-red-500"
// //                       : "bg-white border-gray-300 hover:bg-purple-100"
// //                   }`}
// //                 onClick={() => handleAnswer(idx)}
// //               >
// //                 <span className="font-bold text-lg">{optionLetter}.</span>
// //                 <div>
// //                   <span className="block font-medium text-gray-700">{opt}</span>
// //                   <span className="block text-blue-600">
// //                     {currentQuestion.tamilOptions[idx]}
// //                   </span>
// //                 </div>
// //               </button>
// //             );
// //           })}
// //         </div>

// //         {showPopup && (
// //           <Modal>
// //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center">
// //               <h2 className="text-2xl font-bold text-purple-700 mb-4">
// //                 {popupMessage}
// //               </h2>
// //               <button
// //                 onClick={() => setShowPopup(false)}
// //                 className="mt-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </Modal>
// //         )}

// //         {levelCompletedPopup && (
// //           <Modal>
// //             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-green-200 via-white to-blue-200 rounded-3xl shadow-2xl text-center">
// //               <h2 className="text-2xl font-bold text-purple-700 mb-4">
// //                 {levelCompletedMessage}
// //               </h2>
// //               <button
// //                 onClick={handleLevelCompletedClose}
// //                 className="mt-2 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
// //               >
// //                 Play Game
// //               </button>
// //             </div>
// //           </Modal>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Quiz;

// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import schoolBg from "../assets/school-bg.jpg";
// import levelCompleteSound from "../assets/level-complete.mp3";

// // 🎵 Audio
// import greatSound from "../assets/Good.mp3";
// import commonSound from "../assets/Come-on.mp3";
// import excellentSound from "../assets/Excellent.mp3";
// import startgame from "../assets/StartGame.mp3";

// import { motion } from "framer-motion";
// import WordSearchGame from "../game/WordSearchGame";
// import MathPuzzleGame from "../game/MathPuzzleGame";
// import { Link } from "react-router-dom";

// const Quiz = ({ questions }) => {
//   const [levelIndex, setLevelIndex] = useState(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   const [answersCorrectness, setAnswersCorrectness] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [levelCompletedPopup, setLevelCompletedPopup] = useState(false);
//   const [levelCompletedMessage, setLevelCompletedMessage] = useState("");
//   const [showGame, setShowGame] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);

//   // 🔊 Audio
//   const levelCompleteAudio = new Audio(levelCompleteSound);
//   const greatAudio = new Audio(greatSound);
//   const commonAudio = new Audio(commonSound);
//   const excellentAudio = new Audio(excellentSound);
//   const startGameAudio = new Audio(startgame);

//   const currentLevel = questions[levelIndex];
//   const currentQuestion = currentLevel.questions[currentIndex];

//   const [correctStreak, setCorrectStreak] = useState(0);
//   const [wrongStreak, setWrongStreak] = useState(0);

//   const resetQuiz = () => {
//     setLevelIndex(0);
//     setCurrentIndex(0);
//     setSelectedAnswer("");
//     setAnswersCorrectness([]);
//     setShowPopup(false);
//     setPopupMessage("");
//     setLevelCompletedPopup(false);
//     setLevelCompletedMessage("");
//     setShowGame(false);
//     setCorrectStreak(0);
//     setWrongStreak(0);
//   };

//   // --- Floating Color Paper / Confetti ---
//   const FloatingColorPaper = ({ count = 30, duration = 2000 }) => {
//     const [papers, setPapers] = useState([]);

//     useEffect(() => {
//       const newPapers = Array.from({ length: count }).map((_, i) => ({
//         id: i,
//         color: ["bg-red-400", "bg-blue-400", "bg-yellow-400", "bg-green-400", "bg-pink-400"][
//           Math.floor(Math.random() * 5)
//         ],
//         left: Math.random() * 100,
//         size: Math.random() * 6 + 4,
//         delay: Math.random() * 2,
//         duration: Math.random() * 3 + 2,
//       }));
//       setPapers(newPapers);

//       const timer = setTimeout(() => setPapers([]), duration);
//       return () => clearTimeout(timer);
//     }, [count, duration]);

//     return (
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-50">
//         {papers.map((p) => (
//           <div
//             key={p.id}
//             className={`${p.color} absolute rounded-sm`}
//             style={{
//               width: `${p.size}px`,
//               height: `${p.size}px`,
//               left: `${p.left}%`,
//               animation: `floatPaper ${p.duration}s linear ${p.delay}s forwards`,
//             }}
//           />
//         ))}
//         <style>{`
//           @keyframes floatPaper {
//             0% { transform: translateY(0) rotate(0deg); opacity: 1; }
//             100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
//           }
//         `}</style>
//       </div>
//     );
//   };

//   // --- Handle answer selection ---
//   const handleAnswer = (optionIndex) => {
//     const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
//     const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
//     const isCorrect = optionLetter === correctAnswer;

//     setSelectedAnswer(optionLetter);
//     setAnswersCorrectness([...answersCorrectness, isCorrect]);

//     if (isCorrect) {
//       setCorrectStreak((prev) => prev + 1);
//       setWrongStreak(0);
//     } else {
//       setWrongStreak((prev) => prev + 1);
//       setCorrectStreak(0);
//     }

//     setTimeout(() => {
//       // ✅ Good! popup + confetti
//       if (isCorrect && correctStreak + 1 === 3) {
//         setPopupMessage("🌟 Good!");
         
//         setShowPopup(true);
       
//         // Show confetti
//         setShowConfetti(true);
//         setTimeout(() => setShowConfetti(false), 2000);

//         greatAudio.play();
//       }

//       if (!isCorrect && wrongStreak + 1 === 3) {
//         setPopupMessage("💪 Come on, you can do it!");
//         setShowPopup(true);
//         commonAudio.play();
//       }

//       if (isCorrect && correctStreak + 1 === 6) {
//         setPopupMessage("🌟 Excellent!");
//         setShowPopup(true);
        
//          setShowConfetti(true);
//         setTimeout(() => setShowConfetti(false), 2000);
//         excellentAudio.play();
//       }
//     }, 300);

//     setTimeout(() => {
//       setSelectedAnswer("");
//       if (currentIndex + 1 < currentLevel.questions.length) {
//         setCurrentIndex(currentIndex + 1);
//       } else {
//         setLevelCompletedMessage(`🎉 You completed ${currentLevel.level} level!`);
//         setLevelCompletedPopup(true);
//          setShowConfetti(true);
//         setTimeout(() => setShowConfetti(false), 2000);
//         startGameAudio.play();
//       }
//     }, 500);
//   };

//   const handleLevelCompletedClose = () => {
//     setLevelCompletedPopup(false);
//     setShowGame(true);
//   };

//   const handleGameComplete = () => {
//     setShowGame(false);
//     const nextLevel = levelIndex + 1;
//     if (nextLevel < questions.length) {
//       setLevelIndex(nextLevel);
//       setCurrentIndex(0);
//       setAnswersCorrectness([]);
//       setCorrectStreak(0);
//       setWrongStreak(0);
//     } else {
//       setPopupMessage("🏆 You completed all levels!");
//       levelCompleteAudio.play();
//       setShowPopup(true);
//       setTimeout(() => {
//         setShowPopup(false);
//         window.location.href = "/studentdashboard";
//       }, 2000);
//     }
//   };

//   // --- Select game by level ---
//   const getGameByLevel = (level) => {
//     switch (level) {
//       case 0:
//         return MemoryFlipGame; // Easy
//       case 1:
//         return WordSearchGame; // Medium
//       case 2:
//         return MathPuzzleGame; // Hard
//       default:
//         return MemoryFlipGame;
//     }
//   };

//   if (showGame) {
//     const GameComponent = getGameByLevel(levelIndex);
//     return <GameComponent onComplete={handleGameComplete} />;
//   }

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 relative"
//       style={{ backgroundImage: `url(${schoolBg})` }}
//     >
//       {showConfetti && <FloatingColorPaper count={40} duration={2000} />}

//       <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">
//           <span
//             className={
//               currentLevel.level === "Easy"
//                 ? "text-green-600"
//                 : currentLevel.level === "Medium"
//                 ? "text-yellow-600"
//                 : "text-red-600"
//             }
//           >
//             {currentLevel.level + " Level: "}
//           </span>{" "}
//           Question {currentIndex + 1}/{currentLevel.questions.length}
//         </h2>

//         <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
//           <p className="font-semibold text-xl mb-2 text-gray-800">
//             {currentQuestion.englishQuestion}
//           </p>
//           <p className="font-semibold text-lg text-blue-600">
//             {currentQuestion.tamilQuestion}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-4">
//           {currentQuestion.englishOptions.map((opt, idx) => {
//             const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
//             const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
//             return (
//               <button
//                 key={idx}
//                 className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl shadow hover:shadow-lg text-left
//                   ${
//                     selectedAnswer === optionLetter
//                       ? optionLetter === correctAnswer
//                         ? "bg-green-300 border-green-500"
//                         : "bg-red-300 border-red-500"
//                       : "bg-white border-gray-300 hover:bg-purple-100"
//                   }`}
//                 onClick={() => handleAnswer(idx)}
//               >
//                 <span className="font-bold text-lg">{optionLetter}.</span>
//                 <div>
//                   <span className="block font-medium text-gray-700">{opt}</span>
//                   <span className="block text-blue-600">
//                     {currentQuestion.tamilOptions[idx]}
//                   </span>
//                 </div>
//               </button>
//             );
//           })}
//         </div>

//         {showPopup && (
//           <Modal>
//             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-yellow-200 via-white to-pink-200 rounded-3xl shadow-2xl text-center">
//               <h2 className="text-2xl font-bold text-purple-700 mb-4">{popupMessage}</h2>
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="mt-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </Modal>
//         )}

//         {levelCompletedPopup && (
//           <Modal>
//             <div className="relative p-6 w-96 max-w-full bg-gradient-to-br from-green-200 via-white to-blue-200 rounded-3xl shadow-2xl text-center">
//               <h2 className="text-2xl font-bold text-purple-700 mb-4">{levelCompletedMessage}</h2>
//               <button
//                 onClick={handleLevelCompletedClose}
//                 className="mt-2 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
//               >
//                 Play Game
//               </button>
//             </div>
//           </Modal>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;


import React, { useState, useEffect } from "react";
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

const Quiz = ({ questions }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
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

  const handleAnswer = (optionIndex) => {
    const optionLetter = ["A", "B", "C", "D"][optionIndex].toUpperCase();
    const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
    const isCorrect = optionLetter === correctAnswer;

    setSelectedAnswer(optionLetter);
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
      setSelectedAnswer("");
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

        <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <p className="font-semibold text-xl mb-2 text-gray-800">{currentQuestion.englishQuestion}</p>
          <p className="font-semibold text-lg text-blue-600">{currentQuestion.tamilQuestion}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.englishOptions.map((opt, idx) => {
            const optionLetter = ["A", "B", "C", "D"][idx].toUpperCase();
            const correctAnswer = currentQuestion.correctAnswer.toUpperCase();
            return (
              <button
                key={idx}
                className={`relative flex items-center justify-start gap-4 p-4 border rounded-2xl shadow hover:shadow-lg text-left
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
                  <span className="block text-blue-600">{currentQuestion.tamilOptions[idx]}</span>
                </div>
              </button>
            );
          })}
        </div>

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
