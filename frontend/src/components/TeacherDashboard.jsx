// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import defaultQuestions from "../data/DefaultQuestions";

// const TeacherDashboard = () => {
//   const [allQuestions, setAllQuestions] = useState([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("questions")) || [];
//     setAllQuestions([...defaultQuestions, ...saved]);
//   }, []);

//   // ✅ Delete question
//   const handleDelete = (id) => {
//     // Keep default questions unchanged
//     const saved = JSON.parse(localStorage.getItem("questions")) || [];
//     const updated = saved.filter((q) => q.id !== id);

//     localStorage.setItem("questions", JSON.stringify(updated));

//     // Update UI
//     setAllQuestions([...defaultQuestions, ...updated]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
//         <Link to={"/"}>
//           <button className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-md transition-all">
//             ← Back
//           </button>
//         </Link>

//         <div className="text-center sm:text-left">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//             Teacher Dashboard
//           </h1>
//           <p className="text-gray-500 text-sm sm:text-base mt-1">
//             ஆசிரியர் கட்டுப்பாட்டு பலகை
//           </p>
//         </div>

//         <div className="flex gap-2 mt-2 sm:mt-0">
//           <Link to="/generate-ai">
//             <button className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-md transition-all">
//               ✨ AI Generate
//             </button>
//           </Link>
//           <Link to="/addquestions">
//             <button className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold shadow-md transition-all">
//               + Add Question
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Question Bank Overview */}
//       <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 hover:shadow-lg transition-all">
//         <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//           Question Bank ({allQuestions.length} questions)
//         </h2>
//         <p className="text-gray-500 text-sm sm:text-base mt-1">
//           Manage your quiz questions here. Questions are automatically saved.
//         </p>
//       </div>

//       {/* Display All Questions */}
//       <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
//         {allQuestions.length === 0 ? (
//           <div className="text-center py-10">
//             <p className="text-gray-600 font-medium mb-2 text-lg">
//               No questions yet
//             </p>
//             <p className="text-gray-400 text-sm mb-4">
//               Create your first question to get started!
//             </p>
//             <Link to="/addquestions">
//               <button className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md transition-all">
//                 + Add First Question
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div>
//             <h3 className="text-gray-800 font-semibold mb-4 text-lg">
//               All Questions
//             </h3>
//             <ul className="space-y-3 max-h-[500px] overflow-y-auto">
//               {allQuestions.map((q) => (
//                 <li
//                   key={q.id}
//                   className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition shadow-sm hover:shadow-md relative"
//                 >
//                   <div className="flex items-center gap-1 ">
//                     <div className="text-stone-800">{q.subject}</div>
//                     <div
//                       className={`font-medium ${
//                         q.level === "Easy"
//                           ? "text-green-600"
//                           : q.level === "Medium"
//                           ? "text-yellow-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       ({q.level})
//                     </div>
//                   </div>

//                   <div className="text-gray-800 mt-1 font-semibold">
//                     {q.englishQuestion}
//                   </div>
//                   <div className="text-gray-500 mt-1 text-sm italic">
//                     {q.tamilQuestion}
//                   </div>

//                   {/* ✅ Delete button for generated questions only */}
//                   {q.id && (
//                     <button
//                       onClick={() => handleDelete(q.id)}
//                       className="absolute top-3 right-3 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import defaultQuestions from "../data/DefaultQuestions";

const TeacherDashboard = () => {
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("questions")) || [];
    setAllQuestions([...defaultQuestions, ...saved]);
  }, []);

  // ✅ Delete question
  const handleDelete = (id) => {
    const saved = JSON.parse(localStorage.getItem("questions")) || [];
    const updated = saved.filter((q) => q.id !== id);
    localStorage.setItem("questions", JSON.stringify(updated));
    setAllQuestions([...defaultQuestions, ...updated]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-teal-100 animate-gradient bg-[length:400%_400%]" />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      <div className="relative p-4 sm:p-8 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
          <Link to={"/"}>
            <motion.button
              className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 
                         hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center sm:text-left"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 drop-shadow">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1 font-medium">
              ஆசிரியர் கட்டுப்பாட்டு பலகை
            </p>
          </motion.div>

          <div className="flex gap-2">
            <Link to="/generate-ai">
              <motion.button
                className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-teal-400 to-teal-500 
                           hover:from-teal-500 hover:to-teal-600 text-white font-semibold shadow-md"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                ✨ AI Generate
              </motion.button>
            </Link>
            <Link to="/addquestions">
              <motion.button
                className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-400 to-indigo-500 
                           hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold shadow-md"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                + Add Question
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Question Bank Overview */}
        <motion.div
          className="bg-gradient-to-br from-white/80 to-blue-50 backdrop-blur-md 
                     rounded-2xl shadow-lg border border-gray-200 p-6 mb-6"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Question Bank ({allQuestions.length} questions)
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your quiz questions here. Questions are automatically saved.
          </p>
        </motion.div>

        {/* Display All Questions */}
        <motion.div
          className="bg-gradient-to-br from-white/80 to-indigo-50 backdrop-blur-md 
                     rounded-2xl shadow-lg border border-gray-200 p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          {allQuestions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-700 font-medium mb-2 text-lg">
                No questions yet
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Create your first question to get started!
              </p>
              <Link to="/addquestions">
                <motion.button
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-400 to-indigo-500 
                             hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold shadow-md"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  + Add First Question
                </motion.button>
              </Link>
            </div>
          ) : (
            <div>
              <h3 className="text-gray-800 font-semibold mb-4 text-lg">
                All Questions
              </h3>
              <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {allQuestions.map((q) => (
                  <motion.li
                    key={q.id}
                    className="border border-gray-200 rounded-xl p-4 
                               bg-white/70 hover:bg-white transition-all 
                               shadow-sm hover:shadow-md relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-stone-800 font-medium">{q.subject}</div>
                      <div
                        className={`${
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

                    <div className="text-gray-800 mt-1 font-semibold">
                      {q.englishQuestion}
                    </div>
                    <div className="text-gray-500 mt-1 text-sm italic">
                      {q.tamilQuestion}
                    </div>

                    {q.id && (
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="absolute top-3 right-3 px-3 py-1 
                                   bg-blue-500 text-white text-sm 
                                   rounded-md hover:bg-blue-600"
                      >
                        Delete
                      </button>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
