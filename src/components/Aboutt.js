import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-6xl bg-white -lg rounded-lg p-10">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">
          About JEE Testing App
        </h2>
        <p className="text-lg text-gray-700 text-center mb-8">
          Your ultimate companion for JEE exam success! 🚀
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg ">
            <h3 className="text-xl font-semibold">
              📚 Comprehensive JEE Preparation
            </h3>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg ">
            <h3 className="text-xl font-semibold">
              🎯 Mock Tests & Practice Questions
            </h3>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg ">
            <h3 className="text-xl font-semibold">
              📊 Instant Performance Analysis
            </h3>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg ">
            <h3 className="text-xl font-semibold">⏳ Time Management Tools</h3>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg ">
            <h3 className="text-xl font-semibold">
              📱 User-Friendly Interface
            </h3>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg ">
            <h3 className="text-xl font-semibold">🏆 Designed by Experts</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
