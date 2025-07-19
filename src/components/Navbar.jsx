import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import bgImage from '../assets/15.jpg';
import logoImage from '../assets/logo1.png';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log('User logged out');
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const linkClass = ({ isActive }) =>
        `px-3 py-2 text-sm rounded border transition duration-300 ${isActive
            ? 'bg-white text-black border-white'
            : 'text-white border-white hover:bg-white hover:text-black'
        }`;

    return (
        <div
            className="w-full px-4 sm:px-6 lg:px-8 py-4 bg-cover bg-center"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                {/* Left: Logo & Title */}
                <div className="flex items-center gap-3">
                    <img src={logoImage} alt="Coffee Logo" className="h-10 w-auto" />
                    <h1 className="text-white text-xl sm:text-2xl font-semibold font-[cursive] whitespace-nowrap">
                        Espresso <span className="font-bold">Emporium</span>
                    </h1>
                </div>

                {/* Center: Navigation Links */}
                <div className="flex flex-wrap justify-center gap-3 flex-grow text-white">
                    <NavLink to="/" className={linkClass}>
                        Home
                    </NavLink>
                    {user?.email && (
                        <>
                            <NavLink to="/addcoffee" className={linkClass}>
                                Add Coffee
                            </NavLink>
                            <NavLink to="/users" className={linkClass}>
                                Users
                            </NavLink>
                        </>
                    )}

                </div>

                {/* Right: Sign In / Sign Up */}
                <div className="flex items-center gap-4">
                    {user?.email ? (
                        <>
                            <p className="text-white flex items-center gap-2">
                                Welcome,
                                <span className="text-green-400 font-semibold">
                                    {user.displayName || 'User'}
                                </span>
                                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                            </p>

                            <button onClick={handleLogout}

                                className="px-4 py-2 rounded border border-white text-white hover:bg-white hover:text-black transition duration-300"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-3">
                            <NavLink to="/signin" className={linkClass}>
                                Sign In
                            </NavLink>
                            <NavLink to="/signup" className={linkClass}>
                                Sign Up
                            </NavLink>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;
