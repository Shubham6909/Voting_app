import React, { useState, useEffect } from 'react';
import { voting } from '../components/service/voting';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Delete = () => {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  const fetchCandidates = async () => {
    try {
      const response = await voting.get("/candidates");
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch candidates",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (candidateId) => {
    try {
      await voting.delete(`/candidate/${candidateId}`);
      Swal.fire({
        title: "Success!",
        text: "Deleted the candidate successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        fetchCandidates();
      });
    } catch (error) {
      console.error('Candidate deletion failed:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the candidate",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={headingStyle}>All Candidates</h1>
        <div style={listStyle}>
          {candidates.map(candidate => (
            <div key={candidate.id} style={itemStyle}>
              <span>{candidate.name}</span>
              <button
                style={deleteButtonStyle}
                onClick={() => handleDelete(candidate.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin')}
          style={buttonStyle}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  textAlign: 'center',
};

const boxStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
};

const headingStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

const listStyle = {
  marginBottom: '20px',
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginBottom: '10px',
};

const deleteButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#ff4d4d',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const buttonStyle = {
  padding: '12px 20px',
  backgroundColor: '#6e726e',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Delete;
