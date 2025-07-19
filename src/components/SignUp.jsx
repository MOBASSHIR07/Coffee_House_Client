import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleSigup = (e) => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.fullname.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value.trim();

        const validationErrors = {};

        // Full name validation
        if (!fullName || fullName.length < 2) {
            validationErrors.fullname = "Full name must be at least 2 characters.";
        }

        // Email validation
        if (!email) {
            validationErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = "Please enter a valid email.";
        }

        // Password validation
        if (!password) {
            validationErrors.password = "Password is required.";
        } else if (password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters.";
        }

        // If there are validation errors, don't proceed
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({}); // Clear previous errors

        createUser(email, password, fullName)
            .then((result) => {
                const createdAt = result?.user?.metadata?.creationTime;
                const newUser = { fullName, email, createdAt };

                fetch('https://coffee-store-server-pink-tau.vercel.app/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            toast.success('User Created');
                            navigate('/');
                        }
                    });

                form.reset();
            })
            .catch((err) => {
                console.error("Signup error:", err.message);
                let firebaseError = "Something went wrong. Please try again.";

                if (err.code === "auth/email-already-in-use") {
                    firebaseError = "This email is already in use.";
                } else if (err.code === "auth/invalid-email") {
                    firebaseError = "The email address is not valid.";
                } else if (err.code === "auth/weak-password") {
                    firebaseError = "Password should be at least 6 characters.";
                }

                setErrors({ form: firebaseError });
            });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-[#f7f0e8] px-4">
                <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-center text-[#6b4f4f] mb-6 font-[cursive]">
                        Join <span className="font-extrabold">Espresso Emporium</span>
                    </h2>

                    <form onSubmit={handleSigup} className="space-y-5">
                        {errors.form && (
                            <p className="text-red-500 text-sm text-center">{errors.form}</p>
                        )}

                        <div>
                            <label className="block text-sm text-[#6b4f4f] mb-1">Full Name</label>
                            <input
                                type="text"
                                name='fullname'
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
                                placeholder="John Doe"
                            />
                            {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
                        </div>

                        <div>
                            <label className="block text-sm text-[#6b4f4f] mb-1">Email Address</label>
                            <input
                                name='email'
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm text-[#6b4f4f] mb-1">Password</label>
                            <input
                                name='password'
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
                                placeholder="********"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#6b4f4f] text-white py-2 rounded-lg hover:bg-[#593f3f] transition duration-300"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-[#6b4f4f] font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUp;
