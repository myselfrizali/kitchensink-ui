// import React, { useState } from "react";
// import './App.css';
// import AddMember from "./components/AddMember";

// Sample data to simulate a database of members
// const initialMembers = [
//   { id: 1, name: "John Doe", email: "john@example.com", password: "password123", status: "active" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", password: "password456", status: "inactive" },
// ];

// const App = () => {
//   const [members, setMembers] = useState(initialMembers);
//   const [showModal, setShowModal] = useState(false);
//   const [viewMember, setViewMember] = useState(null);

//   // Add a new member to the list
//   const addMember = (newMember) => {
//     setMembers([...members, newMember]);
//   };

//   // Toggle the status of a member (active/inactive)
//   const toggleStatus = (id) => {
//     setMembers(
//       members.map((member) =>
//         member.id === id
//           ? { ...member, status: member.status === "active" ? "inactive" : "active" }
//           : member
//       )
//     );
//   };

//   // View a member's details
//   const handleViewMember = (id) => {
//     const member = members.find((m) => m.id === id);
//     setViewMember(member);
//   };

//   // Delete a member
//   const handleDeleteMember = (id) => {
//     setMembers(members.filter((member) => member.id !== id));
//     setViewMember(null); // Clear the view if deleted
//   };

//   return (
//     <div className="app-container">
//       <h1>Member Management</h1>

//       {/* Section header with button aligned to the right */}
//       <div className="section-header">
//         <h2>All Members</h2>
//         <button onClick={() => setShowModal(true)} className="btn">Add Member</button>
//       </div>

//       {/* Member List Section */}
//       <div className="section">
//         <table className="members-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {members.map((member) => (
//               <tr key={member.id}>
//                 <td>{member.name}</td>
//                 <td>{member.email}</td>
//                 <td>{member.status}</td>
//                 <td>
//                   <button onClick={() => handleViewMember(member.id)} className="btn">View</button>
//                   <button onClick={() => toggleStatus(member.id)} className="btn">Toggle Status</button>
//                   <button onClick={() => handleDeleteMember(member.id)} className="btn btn-danger">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Member Details View */}
//       {viewMember && (
//         <div className="section details-section">
//           <h2>Member Details</h2>
//           <p><strong>Name:</strong> {viewMember.name}</p>
//           <p><strong>Email:</strong> {viewMember.email}</p>
//           <p><strong>Status:</strong> {viewMember.status}</p>
//           <button onClick={() => setViewMember(null)} className="btn btn-back">Back to List</button>
//         </div>
//       )}

//       {/* Modal for Add Member */}
//       <AddMember
//         showModal={showModal}
//         onClose={() => setShowModal(false)}
//         onAddMember={addMember}
//       />
//     </div>
//   );
// };

// export default App;




import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';  // Dashboard component after login
import ProtectedRoute from './components/ProtectedRoute';  // ProtectedRoute to guard dashboard
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated by checking if JWT token exists
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true); // User is authenticated if JWT token is present
    }
  }, []);

  // Function to mark user as logged in
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to mark user as logged out
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('jwtToken'); // Remove JWT token on logout
  };

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route 
          path="/" 
          element={<Login isAuthenticated={isAuthenticated} login={login} />} 
        />

        {/* Protected route for dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard logout={logout} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
