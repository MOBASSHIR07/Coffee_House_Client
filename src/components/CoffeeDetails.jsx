import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { FaArrowLeft } from 'react-icons/fa';
import Footer from './Footer';

const CoffeeDetails = () => {
  const coffee = useLoaderData();
  const { name, chef, supplier, taste, category, details, photurl } = coffee;

  return (
    <>
      

      <div className="min-h-screen bg-[#f4f3f0] px-4 py-12 flex justify-center items-center">
        <div className="bg-[#F5F4F1] rounded-xl shadow-lg p-6 md:flex max-w-4xl w-full gap-6">
          {/* Coffee Image */}
          <div className="md:w-1/2">
            <img
              src={photurl || '/assets/placeholder.png'}
              alt={name}
              className="rounded-xl w-full h-full object-cover"
            />
          </div>

          {/* Coffee Info */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#331A15] mb-4 font-[cursive]">{name}</h2>
              <p className="text-sm mb-2"><span className="font-semibold text-[#1B1A1A]">Chef:</span> {chef}</p>
              <p className="text-sm mb-2"><span className="font-semibold text-[#1B1A1A]">Supplier:</span> {supplier}</p>
              <p className="text-sm mb-2"><span className="font-semibold text-[#1B1A1A]">Taste:</span> {taste}</p>
              <p className="text-sm mb-2"><span className="font-semibold text-[#1B1A1A]">Category:</span> {category}</p>
              <p className="text-sm mt-4 text-justify"><span className="font-semibold text-[#1B1A1A]">Details:</span> {details}</p>
            </div>

            {/* Back Button */}
            <div className="mt-6">
              <Link to="/">
                <button className="flex items-center gap-2 bg-[#D2B48C] hover:bg-[#c19e75] text-black px-4 py-2 rounded font-semibold transition">
                  <FaArrowLeft /> Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default CoffeeDetails;
