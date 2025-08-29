// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import defaultQuestions from "../data/DefaultQuestions";

// const TeacherDashboard = () => {
//   const [createdQuestions, setCreatedQuestions] = useState([]);
//   const [allQuestions, setAllQuestions] = useState([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("questions")) || [];
//     setCreatedQuestions(saved);
//     setAllQuestions([...defaultQuestions, ...saved]);
//   }, []);

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
//           <button className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-md transition-all">
//             ✨ AI Generate
//           </button>
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
//             <h3 className="text-gray-800 font-semibold mb-4 text-lg">All Questions</h3>
//             <ul className="space-y-3 max-h-[500px] overflow-y-auto">
//               {allQuestions.map((q) => (
//                 <li
//                   key={q.id}
//                   className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition cursor-pointer shadow-sm hover:shadow-md"
//                 >
//                   <div className="font-medium text-gray-700">
//                     {q.subject} ({q.level})
//                   </div>
//                   <div className="text-gray-800 mt-1 font-semibold">{q.englishQuestion}</div>
//                   <div className="text-gray-500 mt-1 text-sm italic">{q.tamilQuestion}</div>
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
import defaultQuestions from "../data/DefaultQuestions";

const TeacherDashboard = () => {
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("questions")) || [];
    setAllQuestions([...defaultQuestions, ...saved]);
  }, []);

  // ✅ Delete question
  const handleDelete = (id) => {
    // Keep default questions unchanged
    const saved = JSON.parse(localStorage.getItem("questions")) || [];
    const updated = saved.filter((q) => q.id !== id);

    localStorage.setItem("questions", JSON.stringify(updated));

    // Update UI
    setAllQuestions([...defaultQuestions, ...updated]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <Link to={"/"}>
          <button className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-md transition-all">
            ← Back
          </button>
        </Link>

        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Teacher Dashboard
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            ஆசிரியர் கட்டுப்பாட்டு பலகை
          </p>
        </div>

        <div className="flex gap-2 mt-2 sm:mt-0">
          <Link to="/generate-ai">
            <button className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-md transition-all">
              ✨ AI Generate
            </button>
          </Link>
          <Link to="/addquestions">
            <button className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold shadow-md transition-all">
              + Add Question
            </button>
          </Link>
        </div>
      </div>

      {/* Question Bank Overview */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 hover:shadow-lg transition-all">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Question Bank ({allQuestions.length} questions)
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Manage your quiz questions here. Questions are automatically saved.
        </p>
      </div>

      {/* Display All Questions */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        {allQuestions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 font-medium mb-2 text-lg">
              No questions yet
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Create your first question to get started!
            </p>
            <Link to="/addquestions">
              <button className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md transition-all">
                + Add First Question
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 text-lg">
              All Questions
            </h3>
            <ul className="space-y-3 max-h-[500px] overflow-y-auto">
              {allQuestions.map((q) => (
                <li
                  key={q.id}
                  className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition shadow-sm hover:shadow-md relative"
                >
                  <div className="font-medium text-gray-700">
                    {q.subject} ({q.level})
                  </div>
                  <div className="text-gray-800 mt-1 font-semibold">
                    {q.englishQuestion}
                  </div>
                  <div className="text-gray-500 mt-1 text-sm italic">
                    {q.tamilQuestion}
                  </div>

                  {/* ✅ Delete button for generated questions only */}
                  {q.id && (
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
