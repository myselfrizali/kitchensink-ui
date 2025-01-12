import React, { useState } from "react";
import './App.css';

// Sample data to simulate a database of members
const initialMembers = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "password123", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", password: "password456", status: "inactive" },
];

// Modal component for Add Member
const AddMemberModal = ({ showModal, onClose, onAddMember }) => {
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPassword, setNewMemberPassword] = useState("");
  const [error, setError] = useState("");

  // Handle adding a new member
  const handleAddMember = () => {
    if (!newMemberName.trim() || !newMemberEmail.trim() || !newMemberPassword.trim()) {
      setError("All fields are required.");
      return;
    }

    const newMember = {
      id: Date.now(), // using current timestamp for unique id
      name: newMemberName,
      email: newMemberEmail,
      password: newMemberPassword,
      status: "active",
    };

    onAddMember(newMember); // Pass the new member to parent
    setNewMemberName("");
    setNewMemberEmail("");
    setNewMemberPassword("");
    setError("");
  };

  // Close modal and reset fields
  const handleClose = () => {
    setNewMemberName("");
    setNewMemberEmail("");
    setNewMemberPassword("");
    setError("");
    onClose();
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Member</h2>
        <div className="input-group">
          <input
            type="text"
            className="input"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder="Enter member name"
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            className="input"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Enter member email"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            className="input"
            value={newMemberPassword}
            onChange={(e) => setNewMemberPassword(e.target.value)}
            placeholder="Enter member password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="modal-buttons">
          <button onClick={handleAddMember} className="btn">Add Member</button>
          <button onClick={handleClose} className="btn btn-close">Cancel</button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [members, setMembers] = useState(initialMembers);
  const [showModal, setShowModal] = useState(false);
  const [viewMember, setViewMember] = useState(null);

  // Add a new member to the list
  const addMember = (newMember) => {
    setMembers([...members, newMember]);
  };

  // Toggle the status of a member (active/inactive)
  const toggleStatus = (id) => {
    setMembers(
      members.map((member) =>
        member.id === id
          ? { ...member, status: member.status === "active" ? "inactive" : "active" }
          : member
      )
    );
  };

  // View a member's details
  const handleViewMember = (id) => {
    const member = members.find((m) => m.id === id);
    setViewMember(member);
  };

  // Delete a member
  const handleDeleteMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
    setViewMember(null); // Clear the view if deleted
  };

  return (
    <div className="app-container">
      <h1>Member Management</h1>

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
                  <button onClick={() => toggleStatus(member.id)} className="btn">Toggle Status</button>
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
      <AddMemberModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onAddMember={addMember}
      />
    </div>
  );
};

export default App;
