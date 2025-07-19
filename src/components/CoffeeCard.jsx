import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee, onDelete, user }) => {
    const { _id, name, chef, photurl } = coffee;

    const handleDelete = (id) => {

        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://coffee-store-server-pink-tau.vercel.app/coffee/${_id}`, {
                    method: 'delete'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Coffee has been deleted.",
                                icon: "success"
                            });
                            onDelete(id);
                        }
                    })



            }
        });



    }

    return (
        <div className="flex items-center justify-between p-4 rounded-lg shadow bg-[#F5F4F1]">
            <div className="flex items-center gap-4">
                <img
                    src={photurl || '/assets/placeholder.png'}
                    alt={name}
                    className="w-24 h-24 object-cover rounded-md"
                />
                <div className="text-left">
                    <p><span className="font-bold">Name:</span> {name}</p>
                    <p><span className="font-bold">Chef:</span> {chef}</p>
                    <p><span className="font-bold">Price:</span> 890 Taka</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Link to={`/coffeedetails/${_id}`}>
                    <button className="bg-blue-500 p-2 rounded hover:bg-blue-600 text-white">
                        <FaInfoCircle />
                    </button>
                </Link>

                {user?.email && (
                    <>
                        <Link to={`/updatecoffee/${_id}`}>
                            <button className="bg-[#D2B48C] p-2 rounded hover:bg-[#c19e75]">
                                <FaEdit />
                            </button>
                        </Link>
                        <button
                            onClick={() => handleDelete(_id)}
                            className="bg-red-500 p-2 rounded hover:bg-red-600"
                        >
                            <FaTrashAlt />
                        </button>
                    </>
                )}
            </div>

        </div>
    );
};

export default CoffeeCard;
