import React, { useState } from 'react';
import Navbar from './Navbar';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from './Footer';

const UpdateCoffee = () => {
    const coffee = useLoaderData();

    const [errors, setErrors] = useState({});

    const handleUpdate = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value.trim();
        const chef = form.chef.value.trim();
        const supplier = form.supplier.value.trim();
        const taste = form.taste.value.trim();
        const category = form.category.value.trim();
        const details = form.details.value.trim();
        const photurl = form.photurl.value.trim();

        const validationErrors = {};

        if (!name || name.length < 2) validationErrors.name = "Name must be at least 2 characters";
        if (!chef) validationErrors.chef = "Chef name is required";
        if (!supplier) validationErrors.supplier = "Supplier is required";
        if (!taste) validationErrors.taste = "Taste is required";
        if (!category) validationErrors.category = "Category is required";
        if (!details) validationErrors.details = "Details are required";
        if (!photurl) {
            validationErrors.photurl = "Photo URL is required";
        } else {
            try {
                new URL(photurl);
            } catch {
                validationErrors.photurl = "Invalid Photo URL";
            }
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({}); // Clear errors if valid

        const updatedCoffee = { name, chef, supplier, taste, category, details, photurl };

        fetch(`https://coffee-store-server-pink-tau.vercel.app/updatecoffee/${coffee._id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedCoffee)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('☕ Coffee updated successfully!');
                } else {
                    toast.warn('No changes were made.');
                }
            });
    };

    return (
        <>
            <div className="min-h-screen bg-[#f4f3f0] flex items-center justify-center px-4 py-8">
                <div className="max-w-4xl w-full bg-[#f4f3f0] p-8 rounded shadow">
                    <h2 className="text-3xl font-bold text-center text-[#374151] mb-4" style={{ fontFamily: "'Lobster', cursive" }}>
                        Update Coffee Info
                    </h2>
                    <p className="text-center text-gray-600 mb-10">
                        Update the fields below to modify the coffee details.
                    </p>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Name</label>
                                <input type="text" name="name" defaultValue={coffee.name} className="input input-bordered w-full" />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Chef</label>
                                <input type="text" name="chef" defaultValue={coffee.chef} className="input input-bordered w-full" />
                                {errors.chef && <p className="text-red-500 text-sm mt-1">{errors.chef}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Supplier</label>
                                <input type="text" name="supplier" defaultValue={coffee.supplier} className="input input-bordered w-full" />
                                {errors.supplier && <p className="text-red-500 text-sm mt-1">{errors.supplier}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Taste</label>
                                <input type="text" name="taste" defaultValue={coffee.taste} className="input input-bordered w-full" />
                                {errors.taste && <p className="text-red-500 text-sm mt-1">{errors.taste}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Category</label>
                                <input type="text" name="category" defaultValue={coffee.category} className="input input-bordered w-full" />
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Details</label>
                                <input type="text" name="details" defaultValue={coffee.details} className="input input-bordered w-full" />
                                {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">Photo</label>
                            <input type="text" name="photurl" defaultValue={coffee.photurl} className="input input-bordered w-full" />
                            {errors.photurl && <p className="text-red-500 text-sm mt-1">{errors.photurl}</p>}
                        </div>

                        <div className="text-center">
                            <button type="submit" className="bg-[#D2B48C] text-black font-semibold py-2 px-6 rounded hover:bg-[#c7a87c] transition">
                                Update Coffee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateCoffee;
