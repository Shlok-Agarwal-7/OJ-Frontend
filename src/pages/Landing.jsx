import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to <span className="text-blue-500">CodeJudge</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          The competitive programming platform built for coders who crave
          challenge and growth. Solve problems, climb the leaderboard, and
          sharpen your skills.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold transition"
          >
            Get Started
          </Link>
          <Link
            to="/problems"
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            Explore Problems
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">✨ Features</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <FeatureCard
              title="🔥 Real Challenges"
              desc="Hundreds of hand-picked problems from easy to expert level."
            />
            <FeatureCard
              title="📊 Leaderboard"
              desc="Compete and rank globally based on your performance."
            />
            <FeatureCard
              title="📝 Code Editor"
              desc="Write, test, and submit code in a sleek built-in editor."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="card-color p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
