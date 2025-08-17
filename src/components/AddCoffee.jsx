import React from 'react';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const AddCoffee = () => {

    const handleAddCoffee = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value.trim();
        const chef = form.chef.value.trim();
        const supplier = form.supplier.value.trim();
        const taste = form.taste.value.trim();
        const category = form.category.value.trim();
        const price = form.price.value.trim();
        const details = form.details.value.trim();
        const photurl = form.photurl.value.trim();

        // ✅ Standard validation
        const errors = [];

        if (!name || name.length < 2) errors.push("Name must be at least 2 characters.");
        if (!chef) errors.push("Chef name is required.");
        if (!supplier) errors.push("Supplier is required.");
        if (!taste) errors.push("Taste is required.");
        if (!category) errors.push("Category is required.");
        if (!price) errors.push("Price is required.");
        if (!details) errors.push("Details are required.");
        if (!photurl) {
            errors.push("Photo URL is required.");
        } else {
            try {
                new URL(photurl);
            } catch (_) {
                errors.push("Photo URL is not valid.");
            }
        }

        if (errors.length > 0) {
            errors.forEach((err) => toast.error(`❌ ${err}`));
            return;
        }

        const newCoffee = { name, chef, supplier, taste, category,price,  details, photurl };
        console.log(newCoffee);

        fetch('https://coffee-store-server-pink-tau.vercel.app/addcoffee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCoffee),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    toast.success('☕ Coffee added successfully!');
                    form.reset();
                } else {
                    toast.error('Something went wrong!');
                }
            })
            .catch((error) => {
                console.error('Error adding coffee:', error);
                toast.error('❌ Failed to add coffee. Please try again.');
            });
    };




    return (
        <>
            <div>

            </div>
            <div className="min-h-screen bg-[#f4f3f0] flex items-center justify-center px-4 py-8">
                <div className="max-w-4xl w-full bg-[#f4f3f0] p-8 rounded shadow">
                    <h2 className="text-3xl font-bold text-center text-[#374151] mb-4" style={{ fontFamily: "'Lobster', cursive" }}>
                        Add New Coffee
                    </h2>
                    <p className="text-center text-gray-600 mb-10">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.
                    </p>

                    <form onSubmit={handleAddCoffee} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Name</label>
                                <input type="text" placeholder="Enter coffee name" name='name' className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Chef</label>
                                <input type="text" placeholder="Enter coffee chef" name='chef'
                                    className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Supplier</label>
                                <input type="text" placeholder="Enter coffee supplier" name='supplier' className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Taste</label>
                                <input type="text" placeholder="Enter coffee taste" name='taste' className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Category</label>
                                <input type="text" placeholder="Enter coffee category" name='category' className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Price</label>
                                <input type="text" placeholder="Enter coffee category" name='price' className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Details</label>
                                <input type="text" placeholder="Enter coffee details" name='details' className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Photo</label>
                            <input type="text" placeholder="Enter photo URL" name='photurl' className="input input-bordered w-full" />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="bg-[#D2B48C] text-black font-semibold py-2 px-6 rounded hover:bg-[#c7a87c] transition">
                                Add Coffee
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default AddCoffee;
