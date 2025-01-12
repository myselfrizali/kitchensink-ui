import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddMember from './AddMember';
import './DashBoard.css';
import { deleteMember, getMember, getMembers, updateStatus } from '../services/memberService';

const Dashboard = ({ logout }) => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [viewMember, setViewMember] = useState(null);
  
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');

    const handleLogout = () => {
      logout(); // Mark the user as logged out
      navigate('/'); // Redirect to the login page
    };

    const getAllMembers = async () => {
      try {
        const payload = await getMembers();
        setMembers(payload.data);
      } catch(err) {
        console.log(err);
        if (err.status == 401) {
          handleLogout();
        }
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (!token) {
        navigate('/');
      }
  
      getAllMembers();
    }, [navigate]);
    
    if (loading) {
      return <div>Loading dashboard...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }

    // Add a new member to the list
    const addMember = (newMember) => {
      setMembers([...members, newMember]);
    };
  
    const toggleStatus = async (id, status) => {
      try {
        status = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        const payload = await updateStatus(id, status);
        setMembers(
          members.map((member) =>
            member.id === id
              ? { ...member, status: payload.data.status }
              : member
          )
        );
      } catch(err) {
        console.log(err);
        if (err.status == 401) {
          handleLogout();
        }
        setError('An error occurred while fetching data');
      }
    };
  
    // View a member's details
    const handleViewMember = async (id) => {
      try {
        const payload = await getMember(id);
        setViewMember(payload.data);
      } catch(err) {
        console.log(err);
        if (err.status == 401) {
          handleLogout();
        }
        setError('An error occurred while fetching data');
      }
    };
  
    // Delete a member
    const handleDeleteMember = async (id) => {
      try {
        const payload = await deleteMember(id);
        setMembers(members.filter((member) => member.id !== id));
        setViewMember(null); // Clear the view if deleted
      } catch (err) {
        setError('An error occurred while fetching data');
      }
    };
  
    return (
      <div className="app-container">
        <h1>Member Management</h1>
        <button onClick={handleLogout}>Logout</button>
  
        {/* Section header with button aligned to the right */}
        <div className="section-header">
          <h2>All Members</h2>
          <button onClick={() => setShowModal(true)} className="btn">Add Member</button>
        </div>
  
        {/* Member List Section */}
        <div className="section">
          <table className="members-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.status}</td>
                  <td>
                    <button onClick={() => handleViewMember(member.id)} className="btn">View</button>
                    <button onClick={() => toggleStatus(member.id, member.status)} className="btn">Toggle Status</button>
                    <button onClick={() => handleDeleteMember(member.id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Member Details View */}
        {viewMember && (
          <div className="section details-section">
            <h2>Member Details</h2>
            <p><strong>Name:</strong> {viewMember.name}</p>
            <p><strong>Email:</strong> {viewMember.email}</p>
            <p><strong>Status:</strong> {viewMember.status}</p>
            <button onClick={() => setViewMember(null)} className="btn btn-back">Back to List</button>
          </div>
        )}
  
        {/* Modal for Add Member */}
        <AddMember
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onAddMember={addMember}
        />
      </div>
    );
  };

  export default Dashboard;
  