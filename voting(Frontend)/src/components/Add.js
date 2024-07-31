import React, { useState } from 'react';
import { voting } from '../components/service/voting';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Add = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addData = { name };

      const response = await voting.post("/candidate", addData);
      console.log(response.data);

      Swal.fire({
        title: "Success!",
        text: "Added the Candidate successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate('/admin');
      });

    } catch (error) {
      console.error('Candidate failed:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add the Candidate",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={headingStyle}>Add Candidate</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="CANDIDATE"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <div style={buttonContainerStyle}>
            <button type="submit" style={buttonStyle}>Add</button>
            <button type="button" onClick={() => navigate('/admin')} style={buttonStyle}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: '300px',
  height: '500px',
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

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  boxSizing: 'border-box',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const buttonStyle = {
  width: '48%',
  padding: '12px',
  backgroundColor: '#6e726e',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Add;
