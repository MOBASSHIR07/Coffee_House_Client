import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEdit = (id) => {
    console.log("Edit user:", id);
    // You can navigate to edit route or show modal
  };

  const handleDelete = (id) => {
    console.log("Delete user:", id);
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
    
                    fetch(`https://coffee-store-server-pink-tau.vercel.app/users/${id}`, {
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
                                const remainingUser = users.filter(user=>user._id!==id)
                                setUsers(remainingUser)
                            }
                        })
    
    
    
                }
            });
  };

  return (
    <div className="min-h-screen bg-[#f7f0e8] px-6 py-10">
      <h2 className="text-3xl font-bold text-[#6b4f4f] text-center font-[cursive] mb-8">
        Registered <span className="font-extrabold">Users</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-[#6b4f4f] text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Joined On</th>
              <th className="py-3 px-4 text-left">Last SigIn</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? 'bg-[#fdf9f3]' : 'bg-white'}
              >
                <td className="py-3 px-4 text-sm">{index + 1}</td>
                <td className="py-3 px-4 text-sm font-medium text-[#6b4f4f]">
                  {user.fullName || '—'}
                </td>
                <td className="py-3 px-4 text-sm">{user.email}</td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {user.lastSignInTime ? formatDate(user.lastSignInTime) : 'N/A'}
                </td>
                <td className="py-3 px-4 text-sm flex gap-3">
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="text-[#c8a97e] hover:text-[#6b4f4f]"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-400 hover:text-red-600"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
