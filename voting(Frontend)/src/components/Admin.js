import React, { useEffect, useState } from 'react';
import { voting } from '../components/service/voting'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const AdminHomePage = () => {
    const navigate = useNavigate();
    const [voteCounts, setVoteCounts] = useState({});

    useEffect(() => {
        const fetchVoteCounts = async () => {
            try {
                const candidatesResponse = await voting.get("/candidates");
                const candidates = candidatesResponse.data;

                const votesResponse = await voting.get("/votes");
                const votes = votesResponse.data;

                const counts = {};

                candidates.forEach(candidate => {
                    counts[candidate.name] = 0;
                });

                votes.forEach(vote => {
                    const { candidateName } = vote;
                    if (counts.hasOwnProperty(candidateName)) {
                        counts[candidateName]++;
                    }
                });

                setVoteCounts(counts);
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire({
                    title: "Error",
                    text: "Could not fetch data. Please try again later.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        };

        fetchVoteCounts();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("admin");
        navigate('/login'); 
    };

    const handleAdd = () => {
        sessionStorage.removeItem("admin");
        navigate('/candidate'); 
    };

    const handleDelete = () => {
        sessionStorage.removeItem("admin");
        navigate('/delete'); 
    };

    return (
        <div className="container" style={containerStyle}>
            <div className="box" style={boxStyle}>
                <h1 className="heading" style={headingStyle}>Admin Home Page</h1>
                <div className="vote-list" style={voteListStyle}>
                    {Object.keys(voteCounts).map(candidateName => (
                        <div key={candidateName} className="vote-item" style={voteItemStyle}>
                            {candidateName}: {voteCounts[candidateName]} vote{voteCounts[candidateName] !== 1 ? 's' : ''}
                        </div>
                    ))}
                </div>
                <div style={buttonContainerStyle}>
                    <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
                    <button onClick={handleAdd} style={addButtonStyle}>Add</button>
                    <button onClick={handleDelete} style={deleteButtonStyle}>Delete</button>
                </div>
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

const voteListStyle = {
    marginBottom: '20px',
};

const voteItemStyle = {
    marginBottom: '10px',
    fontWeight: 'bold',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
};

const logoutButtonStyle = {
    flex: 1,
    margin: '0 5px',
    padding: '12px 20px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const addButtonStyle = {
    flex: 1,
    margin: '0 5px',
    padding: '12px 20px',
    backgroundColor: '#5cb85c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const deleteButtonStyle = {
    flex: 1,
    margin: '0 5px',
    padding: '12px 20px',
    backgroundColor: '#f0ad4e',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default AdminHomePage;
