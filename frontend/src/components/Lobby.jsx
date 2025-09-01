// // // import React from 'react';
// // // import { Link } from 'react-router-dom';

// // // const Lobby = () => {
// // //   return (
// // //     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
// // //       <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 drop-shadow-sm">
// // //          Quiz
// // //       </h1>

// // //       <div className="flex flex-col md:flex-row gap-8">
// // //         {/* Teacher Card */}
// // //         <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-transform w-80 text-center border border-purple-200">
// // //           <div className="bg-purple-200 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
// // //             <span className="text-purple-800 text-2xl">🎓</span>
// // //           </div>
// // //           <h2 className="text-2xl font-semibold text-gray-800">
// // //             Teacher <br />
// // //             <span className="text-purple-400 text-sm">ஆசிரியர்</span>
// // //           </h2>
// // //           <p className="text-gray-600 mt-4 text-sm">
// // //             Create and manage quiz questions for students <br />
// // //             மாணவர்களுக்காக வினாக்களை உருவாக்கி நிர்வகிக்கவும்
// // //           </p>
// // //           <Link to={"/teacher-dashboard"}>
// // //             <button className="mt-6 cursor-pointer px-6 py-2 bg-purple-300 text-purple-900 font-medium rounded-full shadow hover:opacity-90 transition">
// // //               Enter as Teacher
// // //             </button>
// // //           </Link>
// // //         </div>

// // //         {/* Student Card */}
// // //         <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-transform w-80 text-center border border-blue-200">
// // //           <div className="bg-blue-200 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
// // //             <span className="text-blue-800 text-2xl">📘</span>
// // //           </div>
// // //           <h2 className="text-2xl font-semibold text-gray-800">
// // //             Student <br />
// // //             <span className="text-blue-400 text-sm">மாணவர்</span>
// // //           </h2>
// // //           <p className="text-gray-600 mt-4 text-sm">
// // //             Take quizzes and learn in both languages <br />
// // //             இரு மொழிகளிலும் வினாடி வினாக்கள் மற்றும் கற்றல்
// // //           </p>
// // //           <Link to={"/studentdashboard"}>
// // //             <button className="cursor-pointer mt-6 px-6 py-2 bg-blue-300 text-blue-900 font-medium rounded-full shadow hover:opacity-90 transition">
// // //               Start Learning
// // //             </button>
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Lobby;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Lobby = () => {
  return (
    <div className="relative min-h-screen pb-10 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 animate-gradient bg-[length:400%_400%]" />

      {/* Overlay for glassy effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Title */}
      <motion.h1
        className="relative text-5xl md:text-6xl font-extrabold mt-7 mb-7 text-white drop-shadow-lg"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        🎮 Quiz Lobby
      </motion.h1>

      {/* Cards */}
      <div className="relative flex flex-col md:flex-row gap-10">
        {/* Teacher Card */}
        <motion.div
          className="bg-white/15 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80 text-center border border-purple-400/50 hover:shadow-purple-500/50 transition-transform"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          whileHover={{ scale: 1.05, rotate: 1 }}
        >
          <div className="bg-purple-500/30 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-4 shadow-inner">
            <span className="text-purple-200 text-3xl">🎓</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Teacher <br />
            <span className="text-purple-300 text-sm">ஆசிரியர்</span>
          </h2>
          <p className="text-purple-100 mt-4 text-sm leading-relaxed">
            Create and manage quiz questions for students <br />
            மாணவர்களுக்காக வினாக்களை உருவாக்கி நிர்வகிக்கவும்
          </p>
          <Link to={"/teacher-dashboard"}>
            <button className="mt-6 cursor-pointer px-6 py-2 rounded-full font-semibold shadow-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:opacity-90 transition">
              Enter as Teacher
            </button>
          </Link>
        </motion.div>

        {/* Student Card */}
        <motion.div
          className="bg-white/15 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80 text-center border border-blue-400/50 hover:shadow-blue-500/50 transition-transform"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          whileHover={{ scale: 1.05, rotate: -1 }}
        >
          <div className="bg-blue-500/30 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-4 shadow-inner">
            <span className="text-blue-200 text-3xl">📘</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Student <br />
            <span className="text-blue-300 text-sm">மாணவர்</span>
          </h2>
          <p className="text-blue-100 mt-4 text-sm leading-relaxed">
            Take quizzes and learn in both languages <br />
            இரு மொழிகளிலும் வினாடி வினாக்கள் மற்றும் கற்றல்
          </p>
          <Link to={"/studentdashboard"}>
            <button className="mt-6 cursor-pointer px-6 py-2 rounded-full font-semibold shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:opacity-90 transition">
              Start Learning
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Lobby;

// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Lobby = () => {
//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
//       {/* Animated Bright Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 animate-gradient bg-[length:400%_400%]" />

//       {/* Overlay for glassy look */}
//       <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

//       {/* Title */}
//       <motion.h1
//         className="relative text-6xl md:text-7xl font-extrabold mb-14 text-white drop-shadow-2xl"
//         initial={{ scale: 0.5, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//       >
//         🎮 Quiz Lobby
//       </motion.h1>

//       {/* Cards */}
//       <div className="relative flex flex-col md:flex-row gap-12">
//         {/* Teacher Card */}
//         <motion.div
//           className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-80 text-center border border-purple-300/60 hover:shadow-purple-400/60 transition-transform"
//           initial={{ y: 120, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
//           whileHover={{ scale: 1.08, rotate: 1 }}
//         >
//           <div className="bg-purple-500/40 w-24 h-24 flex items-center justify-center rounded-full mx-auto mb-6 shadow-inner">
//             <span className="text-purple-200 text-4xl">🎓</span>
//           </div>
//           <h2 className="text-3xl font-bold text-white">
//             Teacher <br />
//             <span className="text-purple-200 text-sm">ஆசிரியர்</span>
//           </h2>
//           <p className="text-purple-100 mt-5 text-sm leading-relaxed">
//             Create and manage quiz questions for students <br />
//             மாணவர்களுக்காக வினாக்களை உருவாக்கி நிர்வகிக்கவும்
//           </p>
//           <Link to={"/teacher-dashboard"}>
//             <button className="mt-8 cursor-pointer px-7 py-3 rounded-full font-semibold shadow-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:opacity-90 transition">
//               Enter as Teacher
//             </button>
//           </Link>
//         </motion.div>

//         {/* Student Card */}
//         <motion.div
//           className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-80 text-center border border-blue-300/60 hover:shadow-blue-400/60 transition-transform"
//           initial={{ y: 120, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
//           whileHover={{ scale: 1.08, rotate: -1 }}
//         >
//           <div className="bg-blue-500/40 w-24 h-24 flex items-center justify-center rounded-full mx-auto mb-6 shadow-inner">
//             <span className="text-blue-200 text-4xl">📘</span>
//           </div>
//           <h2 className="text-3xl font-bold text-white">
//             Student <br />
//             <span className="text-blue-200 text-sm">மாணவர்</span>
//           </h2>
//           <p className="text-blue-100 mt-5 text-sm leading-relaxed">
//             Take quizzes and learn in both languages <br />
//             இரு மொழிகளிலும் வினாடி வினாக்கள் மற்றும் கற்றல்
//           </p>
//           <Link to={"/studentdashboard"}>
//             <button className="mt-8 cursor-pointer px-7 py-3 rounded-full font-semibold shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:opacity-90 transition">
//               Start Learning
//             </button>
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Lobby;
