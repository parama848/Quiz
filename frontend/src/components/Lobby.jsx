import React from 'react';
import { Link } from 'react-router-dom';

const Lobby = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 drop-shadow-sm">
         Quiz
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Teacher Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-transform w-80 text-center border border-purple-200">
          <div className="bg-purple-200 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
            <span className="text-purple-800 text-2xl">🎓</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Teacher <br />
            <span className="text-purple-400 text-sm">ஆசிரியர்</span>
          </h2>
          <p className="text-gray-600 mt-4 text-sm">
            Create and manage quiz questions for students <br />
            மாணவர்களுக்காக வினாக்களை உருவாக்கி நிர்வகிக்கவும்
          </p>
          <Link to={"/teacher-dashboard"}>
            <button className="mt-6 cursor-pointer px-6 py-2 bg-purple-300 text-purple-900 font-medium rounded-full shadow hover:opacity-90 transition">
              Enter as Teacher
            </button>
          </Link>
        </div>

        {/* Student Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-transform w-80 text-center border border-blue-200">
          <div className="bg-blue-200 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
            <span className="text-blue-800 text-2xl">📘</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Student <br />
            <span className="text-blue-400 text-sm">மாணவர்</span>
          </h2>
          <p className="text-gray-600 mt-4 text-sm">
            Take quizzes and learn in both languages <br />
            இரு மொழிகளிலும் வினாடி வினாக்கள் மற்றும் கற்றல்
          </p>
          <Link to={"/studentdashboard"}>
            <button className="cursor-pointer mt-6 px-6 py-2 bg-blue-300 text-blue-900 font-medium rounded-full shadow hover:opacity-90 transition">
              Start Learning
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
