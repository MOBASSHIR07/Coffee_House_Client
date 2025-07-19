import React from 'react';
import bgHero from '../assets/3.png'; // replace with your actual image file name

const Header = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="min-h-[80vh] bg-cover bg-center bg-no-repeat flex items-center justify-start px-6 md:px-24"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        <div className="text-white max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[cursive] leading-tight">
            Would you like a Cup of Delicious Coffee?
          </h1>
          <p className="text-base md:text-lg mb-6">
            It’s coffee time — Sip & Savor — Relaxation in every sip! Get the nostalgia back!!
            Your companion of every moment! Enjoy the beautiful moments and make them memorable.
          </p>
          <button className="bg-[#D2B48C] hover:bg-[#c19e75] text-black font-semibold py-2 px-6 rounded transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#ECEAE3] py-12 px-6 md:px-24 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {[
          {
            title: 'Awesome Aroma',
            desc: 'You will definitely be a fan of the design & aroma of your coffee.',
            icon: '☕️',
          },
          {
            title: 'High Quality',
            desc: 'We served the coffee to you maintaining the best quality.',
            icon: '⭐',
          },
          {
            title: 'Pure Grades',
            desc: 'The coffee is made of the green coffee beans which you will love.',
            icon: '🌿',
          },
          {
            title: 'Proper Roasting',
            desc: 'Your coffee is brewed by first roasting the green coffee beans.',
            icon: '🔥',
          },
        ].map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="text-3xl">{item.icon}</div>
            <h3 className="text-lg font-bold text-[#331A15]">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Header;
