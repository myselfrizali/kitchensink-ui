import { useState } from "react";
import './AddMember.css';
import { addMember } from "../services/memberService";

// Modal component for Add Member
const AddMember = ({ showModal, onClose, onAddMember }) => {
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const saveMember = async (_newMember) => {
    try {
      const payload = await addMember(_newMember);
      onAddMember(payload.data);
    } catch(err) {
      setError('An error occurred. Please try again later.');
    }
  };

  // Handle adding a new member
  const handleAddMember = async () => {
    if (!newMemberName.trim() || !newMemberEmail.trim() || !phoneNumber.trim()) {
      setError("All fields are required.");
      return;
    }

    const newMember = {
      name: newMemberName,
      email: newMemberEmail,
      phoneNumber: phoneNumber
    };
    
    saveMember(newMember);
    handleClose();
  };

  // Close modal and reset fields
  const handleClose = () => {
    setNewMemberName("");
    setNewMemberEmail("");
    setPhoneNumber("");
    setError("");
    onClose();
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Member</h2>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            className="input"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            className="input"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Enter member email"
          />
        </div>
        <div className="input-group">
          <label>Mobile:</label>
          <input
            type="number"
            className="input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter member mobile"
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

export default AddMember;
