import { useLoaderData, Link } from 'react-router-dom';
import './App.css';
import CoffeeCard from './components/CoffeeCard';
import bgImg from './assets/1.png';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { useContext, useState } from 'react';
import Footer from './components/Footer';
import { AuthContext } from './Provider/AuthProvider';


function App() {
  const {user} = useContext(AuthContext)
  const loadedcoffee = useLoaderData(); // array of coffee objects
  const [coffeeList, setCoffeeList] = useState(loadedcoffee);

   const handleDelete = (deletedId) => {
    const updatedList = coffeeList.filter(coffee => coffee._id !== deletedId);
    setCoffeeList(updatedList);
  };


  return (
    <>
    
    <Header></Header>
    <div
      className="min-h-screen  bg-no-repeat bg-center bg-contain my-4 py-12 px-4"
        style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[#1B1A1A] italic">--- Sip & Savor ---</p>
        <h2 className="text-4xl font-bold text-[#331A15] my-2 font-[cursive]">Our Popular Products</h2>

        <Link to="/addcoffee">
          <button className="bg-[#D2B48C] hover:bg-[#b89364] px-5 py-2 mt-4 rounded font-semibold">
            Add Coffee ☕
          </button>
        </Link>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {coffeeList.map(item => (
            <CoffeeCard key={item._id} coffee={item}  onDelete={handleDelete} user={user} />
          ))}
        </div>
      </div>
    </div>
    
    </>
  );
}

export default App;
