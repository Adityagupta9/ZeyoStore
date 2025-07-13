// src/pages/Admin/AllUsers.js

import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { RiMenu2Fill } from 'react-icons/ri';
import { MdOutlineClose } from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../../style/allusers.css';

const AllUsers = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

    const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/all-users`);
      if (data?.success) {
        setUsers(data?.users);
      } else {
        toast.error("Error while fetching all users");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title="All Users">
      <div className="admin-dashboard-container">
        <button className={`pgbut menu-toggle-button-${menuOpen ? 'open' : 'close'}`} onClick={toggleMenu}>
          {menuOpen ? <MdOutlineClose className="menu-icon" /> : <RiMenu2Fill className="menu-icon" />}
        </button>
        <div className={`admin-menu ${menuOpen ? 'open' : ''}`}>
          <AdminMenu />
        </div>

        <div className="user-list-section">
            <h2 className="user-table-title">All Registered Users</h2>
            <table className="user-data-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {users?.map((user) => (
                    <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>+{user.phone}</td>
                    <td>{user.role === 1 ? 'Admin' : 'User'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

      </div>
    </Layout>
  );
};

export default AllUsers;
