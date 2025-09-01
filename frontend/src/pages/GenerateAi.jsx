// // // // // // // // // // import React, { useState } from "react";

// // // // // // // // // // function App() {
// // // // // // // // // //   const [paragraph, setParagraph] = useState("");
// // // // // // // // // //   const [mcqs, setMcqs] = useState([]);

// // // // // // // // // //   const handleGenerate = async () => {
// // // // // // // // // //     const response = await fetch("http://localhost:8000/generate_mcqs", {
// // // // // // // // // //       method: "POST",
// // // // // // // // // //       headers: { "Content-Type": "application/json" },
// // // // // // // // // //       body: JSON.stringify({ text: paragraph }),
// // // // // // // // // //     });
// // // // // // // // // //     const data = await response.json();
// // // // // // // // // //     setMcqs(data.mcqs);
// // // // // // // // // //   };

// // // // // // // // // //   const tamilOptions = ["(அ)", "(ஆ)", "(இ)", "(ஈ)"];
// // // // // // // // // //   const engOptions = ["(a)", "(b)", "(c)", "(d)"];

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="min-h-screen bg-gray-100 p-6">
// // // // // // // // // //       <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
// // // // // // // // // //         AI MCQ Generator
// // // // // // // // // //       </h1>

// // // // // // // // // //       <div className="max-w-3xl mx-auto">
// // // // // // // // // //         {/* Input textarea */}
// // // // // // // // // //         <textarea
// // // // // // // // // //           rows="5"
// // // // // // // // // //           className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
// // // // // // // // // //           placeholder="Enter a paragraph..."
// // // // // // // // // //           value={paragraph}
// // // // // // // // // //           onChange={(e) => setParagraph(e.target.value)}
// // // // // // // // // //         />

// // // // // // // // // //         {/* Generate Button */}
// // // // // // // // // //         <button
// // // // // // // // // //           onClick={handleGenerate}
// // // // // // // // // //           className="mt-4 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all"
// // // // // // // // // //         >
// // // // // // // // // //           Generate MCQs
// // // // // // // // // //         </button>

// // // // // // // // // //         {/* MCQ Cards */}
// // // // // // // // // //         <div className="mt-8 space-y-6">
// // // // // // // // // //           {mcqs.map((q, idx) => (
// // // // // // // // // //             <div
// // // // // // // // // //               key={idx}
// // // // // // // // // //               className="p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow"
// // // // // // // // // //             >
// // // // // // // // // //               {/* Tamil Section */}
// // // // // // // // // //               <div className="mb-4">
// // // // // // // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // // // // // // //                   {q.question_ta}
// // // // // // // // // //                 </p>
// // // // // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // // // // // // //                   {q.options.map((opt, i) => (
// // // // // // // // // //                     <button
// // // // // // // // // //                       key={i}
// // // // // // // // // //                       className="p-2 border border-gray-300 rounded-lg text-left hover:bg-blue-50 transition-colors"
// // // // // // // // // //                     >
// // // // // // // // // //                       {tamilOptions[i]} {opt.ta}
// // // // // // // // // //                     </button>
// // // // // // // // // //                   ))}
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>

// // // // // // // // // //               {/* English Section */}
// // // // // // // // // //               <div className="mb-4">
// // // // // // // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // // // // // // //                   {q.question_en}
// // // // // // // // // //                 </p>
// // // // // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // // // // // // //                   {q.options.map((opt, i) => (
// // // // // // // // // //                     <button
// // // // // // // // // //                       key={i}
// // // // // // // // // //                       className="p-2 border border-gray-300 rounded-lg text-left hover:bg-blue-50 transition-colors"
// // // // // // // // // //                     >
// // // // // // // // // //                       {engOptions[i]} {opt.en}
// // // // // // // // // //                     </button>
// // // // // // // // // //                   ))}
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>

// // // // // // // // // //               {/* Answer */}
// // // // // // // // // //               <p className="mt-3 text-green-600 font-medium">
// // // // // // // // // //                  Answer: {q.answer.ta} ({q.answer.en})
// // // // // // // // // //               </p>
// // // // // // // // // //             </div>
// // // // // // // // // //           ))}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // export default App;

// // // // // // // // // import React, { useState, useEffect } from "react";

// // // // // // // // // function App() {
// // // // // // // // //   const [paragraph, setParagraph] = useState("");
// // // // // // // // //   const [mcqs, setMcqs] = useState([]);

// // // // // // // // //   // Load saved MCQs from localStorage on first render
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const savedMcqs = localStorage.getItem("mcqs");
// // // // // // // // //     const savedParagraph = localStorage.getItem("paragraph");
// // // // // // // // //     if (savedMcqs) {
// // // // // // // // //       setMcqs(JSON.parse(savedMcqs));
// // // // // // // // //     }
// // // // // // // // //     if (savedParagraph) {
// // // // // // // // //       setParagraph(savedParagraph);
// // // // // // // // //     }
// // // // // // // // //   }, []);

// // // // // // // // //   const handleGenerate = async () => {
// // // // // // // // //     const response = await fetch("http://localhost:8000/generate_mcqs", {
// // // // // // // // //       method: "POST",
// // // // // // // // //       headers: { "Content-Type": "application/json" },
// // // // // // // // //       body: JSON.stringify({ text: paragraph }),
// // // // // // // // //     });
// // // // // // // // //     const data = await response.json();
// // // // // // // // //     setMcqs(data.mcqs);

// // // // // // // // //     // Save to localStorage
// // // // // // // // //     localStorage.setItem("mcqs", JSON.stringify(data.mcqs));
// // // // // // // // //     localStorage.setItem("paragraph", paragraph);
// // // // // // // // //   };

// // // // // // // // //   const tamilOptions = ["(அ)", "(ஆ)", "(இ)", "(ஈ)"];
// // // // // // // // //   const engOptions = ["(a)", "(b)", "(c)", "(d)"];

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-gray-100 p-6">
// // // // // // // // //       <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
// // // // // // // // //         AI MCQ Generator
// // // // // // // // //       </h1>

// // // // // // // // //       <div className="max-w-3xl mx-auto">
// // // // // // // // //         {/* Input textarea */}
// // // // // // // // //         <textarea
// // // // // // // // //           rows="5"
// // // // // // // // //           className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
// // // // // // // // //           placeholder="Enter a paragraph..."
// // // // // // // // //           value={paragraph}
// // // // // // // // //           onChange={(e) => {
// // // // // // // // //             setParagraph(e.target.value);
// // // // // // // // //             localStorage.setItem("paragraph", e.target.value); // auto-save
// // // // // // // // //           }}
// // // // // // // // //         />

// // // // // // // // //         {/* Generate Button */}
// // // // // // // // //         <button
// // // // // // // // //           onClick={handleGenerate}
// // // // // // // // //           className="mt-4 cursor-pointer w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all"
// // // // // // // // //         >
// // // // // // // // //           Generate MCQs
// // // // // // // // //         </button>

// // // // // // // // //         {/* MCQ Cards */}
// // // // // // // // //         <div className="mt-8 space-y-6">
// // // // // // // // //           {mcqs.map((q, idx) => (
// // // // // // // // //             <div
// // // // // // // // //               key={idx}
// // // // // // // // //               className="p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow"
// // // // // // // // //             >
// // // // // // // // //               {/* Tamil Section */}
// // // // // // // // //               <div className="mb-4">
// // // // // // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // // // // // //                   {q.question_ta}
// // // // // // // // //                 </p>
// // // // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // // // // // //                   {q.options.map((opt, i) => (
// // // // // // // // //                     <button
// // // // // // // // //                       key={i}
// // // // // // // // //                       className="p-2 border border-gray-300 rounded-lg text-left hover:bg-blue-50 transition-colors"
// // // // // // // // //                     >
// // // // // // // // //                       {tamilOptions[i]} {opt.ta}
// // // // // // // // //                     </button>
// // // // // // // // //                   ))}
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               {/* English Section */}
// // // // // // // // //               <div className="mb-4">
// // // // // // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // // // // // //                   {q.question_en}
// // // // // // // // //                 </p>
// // // // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // // // // // //                   {q.options.map((opt, i) => (
// // // // // // // // //                     <button
// // // // // // // // //                       key={i}
// // // // // // // // //                       className="p-2 border border-gray-300 rounded-lg text-left hover:bg-blue-50 transition-colors"
// // // // // // // // //                     >
// // // // // // // // //                       {engOptions[i]} {opt.en}
// // // // // // // // //                     </button>
// // // // // // // // //                   ))}
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               {/* Answer */}
// // // // // // // // //               <p className="mt-3 text-green-600 font-medium">
// // // // // // // // //                 Answer: {q.answer.ta} ({q.answer.en})
// // // // // // // // //               </p>
// // // // // // // // //             </div>
// // // // // // // // //           ))}
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // export default App;

// // // // // // // // import React, { useState, useEffect } from "react";

// // // // // // // // function App() {
// // // // // // // //   const [paragraph, setParagraph] = useState("");
// // // // // // // //   const [mcqs, setMcqs] = useState([]);
// // // // // // // //   const [savedMcqs, setSavedMcqs] = useState([]);

// // // // // // // //   // Load saved MCQs + paragraph on first render
// // // // // // // //   useEffect(() => {
// // // // // // // //     const savedMcqsData = localStorage.getItem("savedMcqs");
// // // // // // // //     const savedParagraph = localStorage.getItem("paragraph");
// // // // // // // //     if (savedMcqsData) setSavedMcqs(JSON.parse(savedMcqsData));
// // // // // // // //     if (savedParagraph) setParagraph(savedParagraph);
// // // // // // // //   }, []);

// // // // // // // //   // Generate MCQs
// // // // // // // //   const handleGenerate = async () => {
// // // // // // // //     const response = await fetch("http://localhost:8000/generate_mcqs", {
// // // // // // // //       method: "POST",
// // // // // // // //       headers: { "Content-Type": "application/json" },
// // // // // // // //       body: JSON.stringify({ text: paragraph }),
// // // // // // // //     });
// // // // // // // //     const data = await response.json();

// // // // // // // //     // Prepend new MCQs on top of old ones
// // // // // // // //     setMcqs((prev) => [...data.mcqs, ...prev]);
// // // // // // // //   };

// // // // // // // //   // Save question by category
// // // // // // // //   const handleSave = (q, category) => {
// // // // // // // //     const updatedSaved = [...savedMcqs, { ...q, category }];
// // // // // // // //     setSavedMcqs(updatedSaved);
// // // // // // // //     localStorage.setItem("savedMcqs", JSON.stringify(updatedSaved));
// // // // // // // //     alert(`Saved under category: ${category}`);
// // // // // // // //   };

// // // // // // // //   const tamilOptions = ["(அ)", "(ஆ)", "(இ)", "(ஈ)"];
// // // // // // // //   const engOptions = ["(a)", "(b)", "(c)", "(d)"];

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-gray-100 p-6">
// // // // // // // //       <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
// // // // // // // //         AI MCQ Generator
// // // // // // // //       </h1>

// // // // // // // //       <div className="max-w-3xl mx-auto">
// // // // // // // //         {/* Input textarea */}
// // // // // // // //         <textarea
// // // // // // // //           rows="5"
// // // // // // // //           className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
// // // // // // // //           placeholder="Enter a paragraph..."
// // // // // // // //           value={paragraph}
// // // // // // // //           onChange={(e) => {
// // // // // // // //             setParagraph(e.target.value);
// // // // // // // //             localStorage.setItem("paragraph", e.target.value);
// // // // // // // //           }}
// // // // // // // //         />

// // // // // // // //         {/* Generate Button */}
// // // // // // // //         <button
// // // // // // // //           onClick={handleGenerate}
// // // // // // // //           className="mt-4 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all"
// // // // // // // //         >
// // // // // // // //           Generate MCQs
// // // // // // // //         </button>

// // // // // // // //         {/* MCQ Cards */}
// // // // // // // //         <div className="mt-8 space-y-6">
// // // // // // // //           {mcqs.map((q, idx) => (
// // // // // // // //             <div
// // // // // // // //               key={idx}
// // // // // // // //               className="p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow"
// // // // // // // //             >
// // // // // // // //               {/* Tamil Section */}
// // // // // // // //               <div className="mb-4">
// // // // // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // // // // //                   {q.question_ta}
// // // // // // // //                 </p>
// // // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // // // // //                   {q.options.map((opt, i) => (
// // // // // // // //                     <button
// // // // // // // //                       key={i}
// // // // // // // //                       className="p-2 border border-gray-300 rounded-lg text-left hover:bg-blue-50 transition-colors"
// // // // // // // //                     >
// // // // // // // //                       {tamilOptions[i]} {opt.ta}
// // // // // // // //                     </button>
// // // // // // // //                   ))}
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               {/* English Section */}
// // // // // // // //               <div className="mb-4">
// // // // // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // // // // //                   {q.question_en}
// // // // // // // //                 </p>
// // // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // // // // //                   {q.options.map((opt, i) => (
// // // // // // // //                     <button
// // // // // // // //                       key={i}
// // // // // // // //                       className="p-2 border border-gray-300 rounded-lg text-left hover:bg-blue-50 transition-colors"
// // // // // // // //                     >
// // // // // // // //                       {engOptions[i]} {opt.en}
// // // // // // // //                     </button>
// // // // // // // //                   ))}
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               {/* Answer */}
// // // // // // // //               <p className="mt-3 text-green-600 font-medium">
// // // // // // // //                 ✅ Answer: {q.answer.ta} ({q.answer.en})
// // // // // // // //               </p>

// // // // // // // //               {/* Save Buttons */}
// // // // // // // //               <div className="mt-4 flex flex-wrap gap-2">
// // // // // // // //                 {["History", "Science", "GK"].map((cat) => (
// // // // // // // //                   <button
// // // // // // // //                     key={cat}
// // // // // // // //                     onClick={() => handleSave(q, cat)}
// // // // // // // //                     className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
// // // // // // // //                   >
// // // // // // // //                     Save as {cat}
// // // // // // // //                   </button>
// // // // // // // //                 ))}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           ))}
// // // // // // // //         </div>

// // // // // // // //         {/* Saved Section */}
// // // // // // // //         {savedMcqs.length > 0 && (
// // // // // // // //           <div className="mt-10">
// // // // // // // //             <h2 className="text-2xl font-bold text-gray-700 mb-4">📌 Saved MCQs</h2>
// // // // // // // //             {savedMcqs.map((s, idx) => (
// // // // // // // //               <div
// // // // // // // //                 key={idx}
// // // // // // // //                 className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded mb-3"
// // // // // // // //               >
// // // // // // // //                 <p className="font-semibold">{s.question_en}</p>
// // // // // // // //                 <p className="text-sm text-gray-600">Category: {s.category}</p>
// // // // // // // //               </div>
// // // // // // // //             ))}
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export default App;

// // // // // // // import React, { useState, useEffect } from "react";

// // // // // // // function App() {
// // // // // // //   const [paragraph, setParagraph] = useState("");
// // // // // // //   const [mcqs, setMcqs] = useState([]);
// // // // // // //   const [subject, setSubject] = useState("Maths");
// // // // // // //   const [level, setLevel] = useState("Easy");

// // // // // // //   // Load saved MCQs from localStorage
// // // // // // //   useEffect(() => {
// // // // // // //     const savedMcqs = localStorage.getItem("mcqs");
// // // // // // //     if (savedMcqs) setMcqs(JSON.parse(savedMcqs));

// // // // // // //     const savedParagraph = localStorage.getItem("paragraph");
// // // // // // //     if (savedParagraph) setParagraph(savedParagraph);
// // // // // // //   }, []);

// // // // // // //   const handleGenerate = async () => {
// // // // // // //     const response = await fetch("http://localhost:8000/generate_mcqs", {
// // // // // // //       method: "POST",
// // // // // // //       headers: { "Content-Type": "application/json" },
// // // // // // //       body: JSON.stringify({ text: paragraph }),
// // // // // // //     });
// // // // // // //     const data = await response.json();

// // // // // // //     // New questions should come on TOP
// // // // // // //     const updatedMcqs = [...data.mcqs, ...mcqs];
// // // // // // //     setMcqs(updatedMcqs);

// // // // // // //     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
// // // // // // //     localStorage.setItem("paragraph", paragraph);
// // // // // // //   };

// // // // // // //   const handleSave = () => {
// // // // // // //     const savedData = {
// // // // // // //       subject,
// // // // // // //       level,
// // // // // // //       questions: mcqs,
// // // // // // //     };

// // // // // // //     // Save by category in localStorage
// // // // // // //     localStorage.setItem(
// // // // // // //       `mcqs_${subject}_${level}`,
// // // // // // //       JSON.stringify(savedData)
// // // // // // //     );

// // // // // // //     alert(`Questions saved under ${subject} - ${level}`);
// // // // // // //   };

// // // // // // //   const tamilOptions = ["(அ)", "(ஆ)", "(இ)", "(ஈ)"];
// // // // // // //   const engOptions = ["(a)", "(b)", "(c)", "(d)"];

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-gray-100 p-6">
// // // // // // //       <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
// // // // // // //         AI MCQ Generator
// // // // // // //       </h1>

// // // // // // //       <div className="max-w-3xl mx-auto">
// // // // // // //         {/* Input */}
// // // // // // //         <textarea
// // // // // // //           rows="5"
// // // // // // //           className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
// // // // // // //           placeholder="Enter a paragraph..."
// // // // // // //           value={paragraph}
// // // // // // //           onChange={(e) => {
// // // // // // //             setParagraph(e.target.value);
// // // // // // //             localStorage.setItem("paragraph", e.target.value);
// // // // // // //           }}
// // // // // // //         />

// // // // // // //         {/* Buttons */}
// // // // // // //         <div className="flex flex-wrap items-center gap-3 mt-4">
// // // // // // //           <button
// // // // // // //             onClick={handleGenerate}
// // // // // // //             className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all"
// // // // // // //           >
// // // // // // //             Generate MCQs
// // // // // // //           </button>

// // // // // // //           {/* Subject Dropdown */}
// // // // // // //           <select
// // // // // // //             value={subject}
// // // // // // //             onChange={(e) => setSubject(e.target.value)}
// // // // // // //             className="px-4 py-2 border rounded-lg"
// // // // // // //           >
// // // // // // //             <option>Maths</option>
// // // // // // //             <option>English</option>
// // // // // // //             <option>Science</option>
// // // // // // //             <option>GK</option>
// // // // // // //           </select>

// // // // // // //           {/* Level Dropdown */}
// // // // // // //           <select
// // // // // // //             value={level}
// // // // // // //             onChange={(e) => setLevel(e.target.value)}
// // // // // // //             className="px-4 py-2 border rounded-lg"
// // // // // // //           >
// // // // // // //             <option>Easy</option>
// // // // // // //             <option>Medium</option>
// // // // // // //             <option>Difficult</option>
// // // // // // //           </select>

// // // // // // //           {/* Save Button */}
// // // // // // //           <button
// // // // // // //             onClick={handleSave}
// // // // // // //             className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
// // // // // // //           >
// // // // // // //             Save
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         {/* MCQ Cards */}
// // // // // // //         <div className="mt-8 space-y-6">
// // // // // // //           {mcqs.map((q, idx) => (
// // // // // // //             <div
// // // // // // //               key={idx}
// // // // // // //               className="p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow"
// // // // // // //             >
// // // // // // //               {/* Tamil */}
// // // // // // //               <div className="mb-4">
// // // // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // // // //                   {q.question_ta}
// // // // // // //                 </p>
// // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // // // //                   {q.options.map((opt, i) => (
// // // // // // //                     <p
// // // // // // //                       key={i}
// // // // // // //                       className="p-2 border border-gray-300 rounded-lg text-left"
// // // // // // //                     >
// // // // // // //                       {tamilOptions[i]} {opt.ta}
// // // // // // //                     </p>
// // // // // // //                   ))}
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* English */}
// // // // // // //               <div className="mb-4">
// // // // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // // // //                   {q.question_en}
// // // // // // //                 </p>
// // // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // // // //                   {q.options.map((opt, i) => (
// // // // // // //                     <p
// // // // // // //                       key={i}
// // // // // // //                       className="p-2 border border-gray-300 rounded-lg text-left"
// // // // // // //                     >
// // // // // // //                       {engOptions[i]} {opt.en}
// // // // // // //                     </p>
// // // // // // //                   ))}
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* Answer */}
// // // // // // //               <p className="mt-3 text-green-600 font-medium">
// // // // // // //                 ✅ Answer: {q.answer.ta} ({q.answer.en})
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default App;

// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import { Link } from "react-router-dom";

// // // // // // function GenerateAi() {
// // // // // //   const [paragraph, setParagraph] = useState("");
// // // // // //   const [mcqs, setMcqs] = useState([]);
// // // // // //   const [subject, setSubject] = useState("Maths");
// // // // // //   const [level, setLevel] = useState("Easy");

// // // // // //   // Load saved MCQs from localStorage
// // // // // //   useEffect(() => {
// // // // // //     const savedMcqs = localStorage.getItem("mcqs");
// // // // // //     if (savedMcqs) setMcqs(JSON.parse(savedMcqs));

// // // // // //     const savedParagraph = localStorage.getItem("paragraph");
// // // // // //     if (savedParagraph) setParagraph(savedParagraph);
// // // // // //   }, []);

// // // // // //   const handleGenerate = async () => {
// // // // // //     const response = await fetch("http://localhost:8000/generate_mcqs", {
// // // // // //       method: "POST",
// // // // // //       headers: { "Content-Type": "application/json" },
// // // // // //       body: JSON.stringify({ text: paragraph }),
// // // // // //     });
// // // // // //     const data = await response.json();

// // // // // //     // New questions should come on TOP
// // // // // //     const updatedMcqs = [...data.mcqs, ...mcqs];
// // // // // //     setMcqs(updatedMcqs);

// // // // // //     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
// // // // // //     localStorage.setItem("paragraph", paragraph);
// // // // // //   };

// // // // // //   const handleSave = () => {
// // // // // //     const savedData = {
// // // // // //       subject,
// // // // // //       level,
// // // // // //       questions: mcqs,
// // // // // //     };

// // // // // //     // Save by category in localStorage
// // // // // //     localStorage.setItem(`mcqs_${subject}_${level}`, JSON.stringify(savedData));

// // // // // //     alert(`Questions saved under ${subject} - ${level}`);
// // // // // //   };

// // // // // //   // ✅ Delete single question
// // // // // //   const handleDelete = (index) => {
// // // // // //     const updatedMcqs = mcqs.filter((_, i) => i !== index);
// // // // // //     setMcqs(updatedMcqs);
// // // // // //     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
// // // // // //   };

// // // // // //   const tamilOptions = ["(அ)", "(ஆ)", "(இ)", "(ஈ)"];
// // // // // //   const engOptions = ["(a)", "(b)", "(c)", "(d)"];

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-100 p-6">
// // // // // //       <Link to={"/teacherdashboard"} className="absolute top-6 left-6">
// // // // // //         <button className="px-4 cursor-pointer py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
// // // // // //           ← Back
// // // // // //         </button>
// // // // // //       </Link>
// // // // // //       <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
// // // // // //         AI MCQ Generator
// // // // // //       </h1>

// // // // // //       <div className="max-w-3xl mx-auto">
// // // // // //         {/* Input */}
// // // // // //         <textarea
// // // // // //           rows="5"
// // // // // //           className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
// // // // // //           placeholder="Enter a paragraph..."
// // // // // //           value={paragraph}
// // // // // //           onChange={(e) => {
// // // // // //             setParagraph(e.target.value);
// // // // // //             localStorage.setItem("paragraph", e.target.value);
// // // // // //           }}
// // // // // //         />

// // // // // //         {/* Buttons */}
// // // // // //         <div className="flex flex-wrap items-center gap-3 mt-4">
// // // // // //           <button
// // // // // //             onClick={handleGenerate}
// // // // // //             className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all"
// // // // // //           >
// // // // // //             Generate MCQs
// // // // // //           </button>

// // // // // //           {/* Subject Dropdown */}
// // // // // //           <select
// // // // // //             value={subject}
// // // // // //             onChange={(e) => setSubject(e.target.value)}
// // // // // //             className="px-4 py-2 border rounded-lg"
// // // // // //           >
// // // // // //             <option>Maths</option>
// // // // // //             <option>English</option>
// // // // // //             <option>Science</option>
// // // // // //             <option>GK</option>
// // // // // //           </select>

// // // // // //           {/* Level Dropdown */}
// // // // // //           <select
// // // // // //             value={level}
// // // // // //             onChange={(e) => setLevel(e.target.value)}
// // // // // //             className="px-4 py-2 border rounded-lg"
// // // // // //           >
// // // // // //             <option>Easy</option>
// // // // // //             <option>Medium</option>
// // // // // //             <option>Difficult</option>
// // // // // //           </select>

// // // // // //           {/* Save Button */}
// // // // // //           <button
// // // // // //             onClick={handleSave}
// // // // // //             className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
// // // // // //           >
// // // // // //             Save
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         {/* MCQ Cards */}
// // // // // //         <div className="mt-8 space-y-6">
// // // // // //           {mcqs.map((q, idx) => (
// // // // // //             <div
// // // // // //               key={idx}
// // // // // //               className="p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow relative"
// // // // // //             >
// // // // // //               {/* ❌ Delete Button */}
// // // // // //               <button
// // // // // //                 onClick={() => handleDelete(idx)}
// // // // // //                 className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
// // // // // //               >
// // // // // //                 Delete
// // // // // //               </button>

// // // // // //               {/* Tamil */}
// // // // // //               <div className="mb-4">
// // // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // // //                   {q.question_ta}
// // // // // //                 </p>
// // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // // //                   {q.options.map((opt, i) => (
// // // // // //                     <p
// // // // // //                       key={i}
// // // // // //                       className="p-2 border border-gray-300 rounded-lg text-left"
// // // // // //                     >
// // // // // //                       {tamilOptions[i]} {opt.ta}
// // // // // //                     </p>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* English */}
// // // // // //               <div className="mb-4">
// // // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // // //                   {q.question_en}
// // // // // //                 </p>
// // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // // //                   {q.options.map((opt, i) => (
// // // // // //                     <p
// // // // // //                       key={i}
// // // // // //                       className="p-2 border border-gray-300 rounded-lg text-left"
// // // // // //                     >
// // // // // //                       {engOptions[i]} {opt.en}
// // // // // //                     </p>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Answer */}
// // // // // //               <p className="mt-3 text-green-600 font-medium">
// // // // // //                 ✅ Answer: {q.answer.ta} ({q.answer.en})
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default GenerateAi;
// // // // // import React, { useState, useEffect } from "react";
// // // // // import { Link } from "react-router-dom";

// // // // // function GenerateAi() {
// // // // //   const [paragraph, setParagraph] = useState("");
// // // // //   const [mcqs, setMcqs] = useState([]);
// // // // //   const [subject, setSubject] = useState("Maths");
// // // // //   const [level, setLevel] = useState("Easy");

// // // // //   // Load saved MCQs from localStorage
// // // // //   useEffect(() => {
// // // // //     const savedMcqs = localStorage.getItem("mcqs");
// // // // //     if (savedMcqs) setMcqs(JSON.parse(savedMcqs));

// // // // //     const savedParagraph = localStorage.getItem("paragraph");
// // // // //     if (savedParagraph) setParagraph(savedParagraph);
// // // // //   }, []);

// // // // //   // Generate from backend
// // // // //   const handleGenerate = async () => {
// // // // //     const response = await fetch("http://localhost:8000/generate_mcqs", {
// // // // //       method: "POST",
// // // // //       headers: { "Content-Type": "application/json" },
// // // // //       body: JSON.stringify({ text: paragraph }),
// // // // //     });
// // // // //     const data = await response.json();

// // // // //     // New questions should come on TOP
// // // // //     const updatedMcqs = [...data.mcqs, ...mcqs];
// // // // //     setMcqs(updatedMcqs);

// // // // //     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
// // // // //     localStorage.setItem("paragraph", paragraph);
// // // // //   };

// // // // //   // ✅ Save questions into TeacherDashboard structure
// // // // //   const handleSave = () => {
// // // // //     const saved = JSON.parse(localStorage.getItem("questions")) || [];

// // // // //     const formatted = mcqs.map((q, idx) => ({
// // // // //       id: Date.now() + idx,
// // // // //       subject,
// // // // //       level,
// // // // //       englishQuestion: q.question_en,
// // // // //       tamilQuestion: q.question_ta,
// // // // //       options: q.options,
// // // // //       answer: q.answer,
// // // // //     }));

// // // // //     const updated = [...saved, ...formatted];

// // // // //     localStorage.setItem("questions", JSON.stringify(updated));

// // // // //     alert(`Questions saved under ${subject} - ${level}`);
// // // // //   };

// // // // //   // Delete single question
// // // // //   const handleDelete = (index) => {
// // // // //     const updatedMcqs = mcqs.filter((_, i) => i !== index);
// // // // //     setMcqs(updatedMcqs);
// // // // //     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
// // // // //   };

// // // // //   const tamilOptions = ["(அ)", "(ஆ)", "(இ)", "(ஈ)"];
// // // // //   const engOptions = ["(a)", "(b)", "(c)", "(d)"];

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-100 p-6">
// // // // //       <Link to={"/teacherdashboard"} className="absolute top-6 left-6">
// // // // //         <button className="px-4 cursor-pointer py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
// // // // //           ← Back
// // // // //         </button>
// // // // //       </Link>
// // // // //       <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
// // // // //         AI MCQ Generator
// // // // //       </h1>

// // // // //       <div className="max-w-3xl mx-auto">
// // // // //         {/* Input */}
// // // // //         <textarea
// // // // //           rows="5"
// // // // //           className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
// // // // //           placeholder="Enter a paragraph..."
// // // // //           value={paragraph}
// // // // //           onChange={(e) => {
// // // // //             setParagraph(e.target.value);
// // // // //             localStorage.setItem("paragraph", e.target.value);
// // // // //           }}
// // // // //         />

// // // // //         {/* Buttons */}
// // // // //         <div className="flex flex-wrap items-center gap-3 mt-4">
// // // // //           <button
// // // // //             onClick={handleGenerate}
// // // // //             className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all"
// // // // //           >
// // // // //             Generate MCQs
// // // // //           </button>

// // // // //           {/* Subject Dropdown */}
// // // // //           <select
// // // // //             value={subject}
// // // // //             onChange={(e) => setSubject(e.target.value)}
// // // // //             className="px-4 py-2 border rounded-lg"
// // // // //           >
// // // // //             <option>Maths</option>
// // // // //             <option>English</option>
// // // // //             <option>Science</option>
// // // // //             <option>GK</option>
// // // // //           </select>

// // // // //           {/* Level Dropdown */}
// // // // //           <select
// // // // //             value={level}
// // // // //             onChange={(e) => setLevel(e.target.value)}
// // // // //             className="px-4 py-2 border rounded-lg"
// // // // //           >
// // // // //             <option>Easy</option>
// // // // //             <option>Medium</option>
// // // // //             <option>Difficult</option>
// // // // //           </select>

// // // // //           {/* Save Button */}
// // // // //           <button
// // // // //             onClick={handleSave}
// // // // //             className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
// // // // //           >
// // // // //             Save
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* MCQ Cards */}
// // // // //         <div className="mt-8 space-y-6">
// // // // //           {mcqs.map((q, idx) => (
// // // // //             <div
// // // // //               key={idx}
// // // // //               className="p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow relative"
// // // // //             >
// // // // //               {/* ❌ Delete Button */}
// // // // //               <button
// // // // //                 onClick={() => handleDelete(idx)}
// // // // //                 className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
// // // // //               >
// // // // //                 Delete
// // // // //               </button>

// // // // //               {/* Tamil */}
// // // // //               <div className="mb-4">
// // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // //                   {q.question_ta}
// // // // //                 </p>
// // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // //                   {q.options.map((opt, i) => (
// // // // //                     <p
// // // // //                       key={i}
// // // // //                       className="p-2 border border-gray-300 rounded-lg text-left"
// // // // //                     >
// // // // //                       {tamilOptions[i]} {opt.ta}
// // // // //                     </p>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* English */}
// // // // //               <div className="mb-4">
// // // // //                 <p className="font-bold text-lg mb-3 text-gray-800">
// // // // //                   {q.question_en}
// // // // //                 </p>
// // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // // //                   {q.options.map((opt, i) => (
// // // // //                     <p
// // // // //                       key={i}
// // // // //                       className="p-2 border border-gray-300 rounded-lg text-left"
// // // // //                     >
// // // // //                       {engOptions[i]} {opt.en}
// // // // //                     </p>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Answer */}
// // // // //               <p className="mt-3 text-green-600 font-medium">
// // // // //                 ✅ Answer: {q.answer.ta} ({q.answer.en})
// // // // //               </p>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default GenerateAi;

// // // // import React, { useState, useEffect } from "react";
// // // // import { Link } from "react-router-dom";

// // // // function GenerateAi() {
// // // //   const [paragraph, setParagraph] = useState("");
// // // //   const [mcqs, setMcqs] = useState([]);
// // // //   const [subject, setSubject] = useState("Maths");
// // // //   const [level, setLevel] = useState("Easy");

// // // //   // Load saved MCQs from localStorage
// // // //   useEffect(() => {
// // // //     const savedMcqs = localStorage.getItem("mcqs");
// // // //     if (savedMcqs) setMcqs(JSON.parse(savedMcqs));

// // // //     const savedParagraph = localStorage.getItem("paragraph");
// // // //     if (savedParagraph) setParagraph(savedParagraph);
// // // //   }, []);

// // // //   // Generate from backend
// // // //   const handleGenerate = async () => {
// // // //     const response = await fetch("http://localhost:8000/generate_mcqs", {
// // // //       method: "POST",
// // // //       headers: { "Content-Type": "application/json" },
// // // //       body: JSON.stringify({ text: paragraph }),
// // // //     });
// // // //     const data = await response.json();

// // // //     // New questions should come on TOP
// // // //     const updatedMcqs = [...data.mcqs, ...mcqs];
// // // //     setMcqs(updatedMcqs);

// // // //     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
// // // //     localStorage.setItem("paragraph", paragraph);
// // // //   };

// // // //   // Save questions into TeacherDashboard structure
// // // //   const handleSave = () => {
// // // //     const saved = JSON.parse(localStorage.getItem("questions")) || [];

// // // //     const formatted = mcqs.map((q, idx) => ({
// // // //       id: Date.now() + idx,
// // // //       subject,
// // // //       level,
// // // //       englishQuestion: q.question_en,
// // // //       tamilQuestion: q.question_ta,
// // // //       options: q.options,
// // // //       answer: q.answer,
// // // //     }));

// // // //     const updated = [...saved, ...formatted];

// // // //     localStorage.setItem("questions", JSON.stringify(updated));

// // // //     alert(`✅ Questions saved under ${subject} - ${level}`);
// // // //   };

// // // //   // Delete single question
// // // //   const handleDelete = (index) => {
// // // //     const updatedMcqs = mcqs.filter((_, i) => i !== index);
// // // //     setMcqs(updatedMcqs);
// // // //     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
// // // //   };

// // // //   const tamilOptions = ["(அ)", "(ஆ)", "(இ)", "(ஈ)"];
// // // //   const engOptions = ["(a)", "(b)", "(c)", "(d)"];

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
// // // //       {/* Back Button */}
// // // //       <Link to={"/teacher-dashboard"} className="absolute top-6 left-6">
// // // //         <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
// // // //           ← Back
// // // //         </button>
// // // //       </Link>

// // // //       {/* Title */}
// // // //       <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-800 drop-shadow">
// // // //         ✨ AI MCQ Generator
// // // //       </h1>

// // // //       {/* Form Card */}
// // // //       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
// // // //         <textarea
// // // //           rows="5"
// // // //           className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none text-gray-700"
// // // //           placeholder="📖 Enter a paragraph for generating MCQs..."
// // // //           value={paragraph}
// // // //           onChange={(e) => {
// // // //             setParagraph(e.target.value);
// // // //             localStorage.setItem("paragraph", e.target.value);
// // // //           }}
// // // //         />

// // // //         {/* Controls */}
// // // //         <div className="flex flex-wrap items-center gap-4 mt-6">
// // // //           <button
// // // //             onClick={handleGenerate}
// // // //             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-md transition-all"
// // // //           >
// // // //             ⚡ Generate MCQs
// // // //           </button>

// // // //           <select
// // // //             value={subject}
// // // //             onChange={(e) => setSubject(e.target.value)}
// // // //             className="px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
// // // //           >
// // // //             <option>Maths</option>
// // // //             <option>English</option>
// // // //             <option>Science</option>
// // // //             <option>GK</option>
// // // //           </select>

// // // //           <select
// // // //             value={level}
// // // //             onChange={(e) => setLevel(e.target.value)}
// // // //             className="px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
// // // //           >
// // // //             <option>Easy</option>
// // // //             <option>Medium</option>
// // // //             <option>Difficult</option>
// // // //           </select>

// // // //           <button
// // // //             onClick={handleSave}
// // // //             className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-md hover:from-green-600 hover:to-green-700 transition-all"
// // // //           >
// // // //             💾 Save
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Generated MCQs */}
// // // //       <div className="max-w-4xl mx-auto mt-10 space-y-6">
// // // //         {mcqs.map((q, idx) => (
// // // //           <div
// // // //             key={idx}
// // // //             className="p-6 border border-gray-200 rounded-2xl shadow-md bg-white hover:shadow-xl transition relative"
// // // //           >
// // // //             {/* Delete Button */}
// // // //             <button
// // // //               onClick={() => handleDelete(idx)}
// // // //               className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
// // // //             >
// // // //               ✖
// // // //             </button>

// // // //             {/* Tamil */}
// // // //             <div className="mb-4">
// // // //               <p className="font-bold text-lg mb-3 text-gray-900">
// // // //                 📝 {q.question_ta}
// // // //               </p>
// // // //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // //                 {q.options.map((opt, i) => (
// // // //                   <p
// // // //                     key={i}
// // // //                     className="p-3 border border-gray-200 rounded-lg bg-gray-50"
// // // //                   >
// // // //                     {tamilOptions[i]} {opt.ta}
// // // //                   </p>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             {/* English */}
// // // //             <div className="mb-4">
// // // //               <p className="font-bold text-lg mb-3 text-gray-900">
// // // //                 📝 {q.question_en}
// // // //               </p>
// // // //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // // //                 {q.options.map((opt, i) => (
// // // //                   <p
// // // //                     key={i}
// // // //                     className="p-3 border border-gray-200 rounded-lg bg-gray-50"
// // // //                   >
// // // //                     {engOptions[i]} {opt.en}
// // // //                   </p>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             {/* Answer */}
// // // //             <p className="mt-3 text-green-700 font-semibold">
// // // //                Answer: {q.answer.ta} ({q.answer.en})
// // // //             </p>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default GenerateAi;

// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";

// // function GenerateAi() {
// //   const [paragraph, setParagraph] = useState("");
// //   const [mcqs, setMcqs] = useState([]);
// //   const [subject, setSubject] = useState("Maths");
// //   const [level, setLevel] = useState("Easy");

// //   // Load draft MCQs from localStorage
// //   useEffect(() => {
// //     const savedMcqs = localStorage.getItem("mcqs");
// //     if (savedMcqs) setMcqs(JSON.parse(savedMcqs));

// //     const savedParagraph = localStorage.getItem("paragraph");
// //     if (savedParagraph) setParagraph(savedParagraph);
// //   }, []);

// //   // Generate from backend
// //   const handleGenerate = async () => {
// //     if (!paragraph.trim()) {
// //       alert("Please enter a paragraph before generating!");
// //       return;
// //     }

// //     const response = await fetch("http://localhost:8000/generate_mcqs", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ text: paragraph }),
// //     });
// //     const data = await response.json();

// //     setMcqs(data.mcqs); // ✅ only keep the fresh batch

// //     localStorage.setItem("mcqs", JSON.stringify(data.mcqs));
// //     localStorage.setItem("paragraph", paragraph);
// //   };

// //   // Save questions into TeacherDashboard
// //   const handleSave = () => {
// //     if (mcqs.length === 0) {
// //       alert("No questions to save!");
// //       return;
// //     }

// //     const saved = JSON.parse(localStorage.getItem("questions")) || [];

// //     // ✅ attach subject & level to each question at save time
// //     const formatted = mcqs.map((q, idx) => ({
// //       id: Date.now() + idx,
// //       subject,
// //       level,
// //       englishQuestion: q.question_en,
// //       tamilQuestion: q.question_ta,
// //       options: q.options,
// //       answer: q.answer,
// //     }));

// //     const updated = [...saved, ...formatted];

// //     localStorage.setItem("questions", JSON.stringify(updated));

// //     // clear draft questions after saving
// //     setMcqs([]);
// //     localStorage.removeItem("mcqs");

// //     alert(`✅ Saved ${formatted.length} questions under ${subject} - ${level}`);
// //   };

// //   // Delete single draft question
// //   const handleDelete = (index) => {
// //     const updatedMcqs = mcqs.filter((_, i) => i !== index);
// //     setMcqs(updatedMcqs);
// //     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
// //   };

// //   const tamilOptions = ["(அ)", "(ஆ)", "(இ)", "(ஈ)"];
// //   const engOptions = ["(a)", "(b)", "(c)", "(d)"];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
// //       {/* Back Button */}
// //       <Link to={"/teacher-dashboard"} className="absolute top-6 left-6">
// //         <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
// //           ← Back
// //         </button>
// //       </Link>

// //       {/* Title */}
// //       <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-800 drop-shadow">
// //         ✨ AI MCQ Generator
// //       </h1>

// //       {/* Input Card */}
// //       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
// //         <textarea
// //           rows="5"
// //           className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none text-gray-700"
// //           placeholder="📖 Enter a paragraph for generating MCQs..."
// //           value={paragraph}
// //           onChange={(e) => {
// //             setParagraph(e.target.value);
// //             localStorage.setItem("paragraph", e.target.value);
// //           }}
// //         />

// //         {/* Controls */}
// //         <div className="flex flex-wrap items-center gap-4 mt-6">
// //           <button
// //             onClick={handleGenerate}
// //             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-md transition-all"
// //           >
// //             ⚡ Generate MCQs
// //           </button>

// //           <select
// //             value={subject}
// //             onChange={(e) => setSubject(e.target.value)}
// //             className="px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
// //           >
// //             <option>Maths</option>
// //             <option>English</option>
// //             <option>Science</option>
// //             <option>GK</option>
// //           </select>

// //           <select
// //             value={level}
// //             onChange={(e) => setLevel(e.target.value)}
// //             className="px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
// //           >
// //             <option>Easy</option>
// //             <option>Medium</option>
// //             <option>Difficult</option>
// //           </select>

// //           <button
// //             onClick={handleSave}
// //             className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-md hover:from-green-600 hover:to-green-700 transition-all"
// //           >
// //             💾 Save
// //           </button>
// //         </div>
// //       </div>

// //       {/* Draft MCQs (before saving) */}
// //       <div className="max-w-4xl mx-auto mt-10 space-y-6">
// //         {mcqs.map((q, idx) => (
// //           <div
// //             key={idx}
// //             className="p-6 border border-gray-200 rounded-2xl shadow-md bg-white hover:shadow-xl transition relative"
// //           >
// //             {/* Delete Button */}
// //             <button
// //               onClick={() => handleDelete(idx)}
// //               className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
// //             >
// //               ✖
// //             </button>

// //             {/* Tamil */}
// //             <div className="mb-4">
// //               <p className="font-bold text-lg mb-3 text-gray-900">
// //                 📝 {q.question_ta}
// //               </p>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //                 {q.options.map((opt, i) => (
// //                   <p
// //                     key={i}
// //                     className="p-3 border border-gray-200 rounded-lg bg-gray-50"
// //                   >
// //                     {tamilOptions[i]} {opt.ta}
// //                   </p>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* English */}
// //             <div className="mb-4">
// //               <p className="font-bold text-lg mb-3 text-gray-900">
// //                 📝 {q.question_en}
// //               </p>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //                 {q.options.map((opt, i) => (
// //                   <p
// //                     key={i}
// //                     className="p-3 border border-gray-200 rounded-lg bg-gray-50"
// //                   >
// //                     {engOptions[i]} {opt.en}
// //                   </p>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Answer */}
// //             <p className="mt-3 text-green-700 font-semibold">
// //               ✅ Answer: {q.answer.ta} ({q.answer.en})
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default GenerateAi;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function GenerateAi() {
//   const [paragraph, setParagraph] = useState("");
//   const [mcqs, setMcqs] = useState([]);

//   // Load draft MCQs from localStorage
//   useEffect(() => {
//     const savedMcqs = localStorage.getItem("mcqs");
//     if (savedMcqs) setMcqs(JSON.parse(savedMcqs));

//     const savedParagraph = localStorage.getItem("paragraph");
//     if (savedParagraph) setParagraph(savedParagraph);
//   }, []);

//   // Generate from backend
//   const handleGenerate = async () => {
//     if (!paragraph.trim()) {
//       alert("Please enter a paragraph before generating!");
//       return;
//     }

//     const response = await fetch("http://localhost:8000/generate_mcqs", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text: paragraph }),
//     });
//     const data = await response.json();

//     // Add subject + level fields to each question
//     const withMeta = data.mcqs.map((q) => ({
//       ...q,
//       subject: "",
//       level: "",
//     }));

//     setMcqs(withMeta);
//     localStorage.setItem("mcqs", JSON.stringify(withMeta));
//     localStorage.setItem("paragraph", paragraph);
//   };

//   // Save single question into TeacherDashboard
//   const handleSave = (q, idx) => {
//     if (!q.subject || !q.level) {
//       alert("Please select subject and level before saving!");
//       return;
//     }

//     const saved = JSON.parse(localStorage.getItem("questions")) || [];

//     const formatted = {
//       id: Date.now(),
//       subject: q.subject,
//       level: q.level,
//       englishQuestion: q.question_en,
//       tamilQuestion: q.question_ta,
//       options: q.options,
//       answer: q.answer,
//     };

//     const updated = [...saved, formatted];
//     localStorage.setItem("questions", JSON.stringify(updated));

//     // Remove from drafts
//     const updatedMcqs = mcqs.filter((_, i) => i !== idx);
//     setMcqs(updatedMcqs);
//     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));

//     alert(`✅ Saved under ${q.subject} - ${q.level}`);
//   };

//   // Delete single draft question
//   const handleDelete = (index) => {
//     const updatedMcqs = mcqs.filter((_, i) => i !== index);
//     setMcqs(updatedMcqs);
//     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
//   };

//   const handleDropdownChange = (index, field, value) => {
//     const updatedMcqs = [...mcqs];
//     updatedMcqs[index][field] = value;
//     setMcqs(updatedMcqs);
//     localStorage.setItem("mcqs", JSON.stringify(updatedMcqs));
//   };

//   const tamilOptions = ["(அ)", "(ஆ)", "(இ)", "(ஈ)"];
//   const engOptions = ["(a)", "(b)", "(c)", "(d)"];

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
//       {/* Back Button */}
//       <Link to={"/teacher-dashboard"} className="absolute top-6 left-6">
//         <button className="px-4 py-2 cursor-pointer rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
//           ←
//         </button>
//       </Link>

//       {/* Title */}
//       <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-800 drop-shadow">
//         ✨ AI MCQ Generator
//       </h1>

//       {/* Input Card */}
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
//         <textarea
//           rows="5"
//           className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none text-gray-700"
//           placeholder="📖 Enter a paragraph for generating MCQs..."
//           value={paragraph}
//           onChange={(e) => {
//             setParagraph(e.target.value);
//             localStorage.setItem("paragraph", e.target.value);
//           }}
//         />

//         {/* Generate Button */}
//         <div className="flex flex-wrap items-center gap-4 mt-6">
//           <button
//             onClick={handleGenerate}
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-md transition-all"
//           >
//             ⚡ Generate MCQs
//           </button>
//         </div>
//       </div>

//       {/* Draft MCQs (before saving) */}
//       <div className="max-w-4xl mx-auto mt-10 space-y-6">
//         {mcqs.map((q, idx) => (
//           <div
//             key={idx}
//             className="p-6 border border-gray-200 rounded-2xl shadow-md bg-white hover:shadow-xl transition relative"
//           >
//             {/* Delete Button */}
//             <button
//               onClick={() => handleDelete(idx)}
//               className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
//             >
//               ✖
//             </button>

//             {/* Tamil */}
//             <div className="mb-4">
//               <p className="font-bold text-lg mb-3 text-gray-900">
//                 📝 {q.question_ta}
//               </p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {q.options.map((opt, i) => (
//                   <p
//                     key={i}
//                     className="p-3 border border-gray-200 rounded-lg bg-gray-50"
//                   >
//                     {tamilOptions[i]} {opt.ta}
//                   </p>
//                 ))}
//               </div>
//             </div>

//             {/* English */}
//             <div className="mb-4">
//               <p className="font-bold text-lg mb-3 text-gray-900">
//                 📝 {q.question_en}
//               </p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {q.options.map((opt, i) => (
//                   <p
//                     key={i}
//                     className="p-3 border border-gray-200 rounded-lg bg-gray-50"
//                   >
//                     {engOptions[i]} {opt.en}
//                   </p>
//                 ))}
//               </div>
//             </div>

//             {/* Answer */}
//             <p className="mt-3 text-green-700 font-semibold">
//               ✅ Answer: {q.answer.ta} ({q.answer.en})
//             </p>

//             {/* Subject + Level + Save */}
//             <div className="flex flex-wrap items-center gap-4 mt-4">
//               <select
//                 value={q.subject}
//                 onChange={(e) =>
//                   handleDropdownChange(idx, "subject", e.target.value)
//                 }
//                 className="px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
//               >
//                 <option value="">Select Subject</option>
//                 <option>Maths</option>
//                 <option>English</option>
//                 <option>Science</option>
//                 <option>GK</option>
//               </select>

//               <select
//                 value={q.level}
//                 onChange={(e) =>
//                   handleDropdownChange(idx, "level", e.target.value)
//                 }
//                 className="px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
//               >
//                 <option value="">Select Level</option>
//                 <option>Easy</option>
//                 <option>Medium</option>
//                 <option>Difficult</option>
//               </select>

//               <button
//                 onClick={() => handleSave(q, idx)}
//                 className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-md hover:from-green-600 hover:to-green-700 transition-all"
//               >
//                 💾 Save
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default GenerateAi;

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
