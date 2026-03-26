import { useState } from "react";
import confetti from "canvas-confetti";

export default function App() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [show, setShow] = useState(false);

  const wishes = [
    "🎉 Wishing you a year full of success and happiness!",
    "✨ May all your dreams come true!",
    "🎂 Hope your day is filled with joy and laughter!",
    "🔥 Keep shining and achieving greatness!",
    "🌟 Another year, another level unlocked!",
  ];

  const generateWish = () => {
    const random = wishes[Math.floor(Math.random() * wishes.length)];
    setWish(`Happy Birthday, ${name}! 🎂 ${random}`);
    setShow(true);

    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 },
    });

    const audio = new Audio(
      "https://www.soundjay.com/human/sounds/applause-8.mp3"
    );
    audio.play();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-pink-600 to-yellow-400">

      {/* 🎈 Floating Emojis Background */}
      <div className="absolute text-4xl animate-bounce top-10 left-10">🎈</div>
      <div className="absolute text-4xl animate-pulse top-20 right-20">🎉</div>
      <div className="absolute text-4xl animate-spin bottom-20 left-20">✨</div>
      <div className="absolute text-5xl animate-bounce bottom-10 right-10">🎂</div>
      <div className="absolute text-3xl animate-ping top-1/2 left-5">🎊</div>
      <div className="absolute text-3xl animate-pulse top-1/3 right-5">🥳</div>

      {/* Glow Effects */}
      <div className="absolute w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-yellow-300 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      {/* Main Card */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 rounded-3xl text-center w-[90%] max-w-md">

        <h1 className="text-4xl font-extrabold text-white mb-3 tracking-wide">
          🎂 Birthday Magic
        </h1>

        <p className="text-white/80 mb-6">
          Enter a name and create a special moment ✨
        </p>

        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl mb-4 text-black outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        {/* 🎁 Gift Button */}
        <div
          onClick={generateWish}
          className={`cursor-pointer select-none transition duration-300 ${
            !name ? "opacity-50 pointer-events-none" : "hover:scale-110"
          }`}
        >
          <div className="text-6xl animate-bounce">🎁</div>
          <p className="text-white mt-2 font-semibold">Tap the Gift</p>
        </div>

        {/* Output */}
        {show && (
          <div className="mt-6 p-4 rounded-xl bg-white/20 text-white text-lg animate-fadeIn">
            {wish}
          </div>
        )}
      </div>
    </div>
  );
}