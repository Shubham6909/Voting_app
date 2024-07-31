import React, { useEffect, useState } from 'react';
import { voting } from '../components/service/voting';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const VotingPage = () => {
    const navigate = useNavigate();
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        voting.get("/candidates")
            .then((res) => {
                setCandidates(res.data);
            })
            .catch((error) => {
                console.error('Error fetching candidates:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = sessionStorage.getItem("user");
            const voteData = {
                candidateName: selectedCandidate,
                username: user
            };
            
            const response = await voting.post("/vote", voteData);
            console.log(response.data);
            
            Swal.fire({
                title: "Success!",
                text: "Successfully voted.",
                icon: "success",
                confirmButtonText: "OK"
            }).then(() => {
                navigate('/login'); // Navigate to success page after voting
            });
        } catch (error) {
            console.error('Voting failed:', error);
            
            const errorMessage = error.response && error.response.data
            ? error.response.data
            : "User is not registered. Please register.";

            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h1 style={headingStyle}>Vote</h1>
                <form onSubmit={handleSubmit}>
                    {candidates.map((candidate) => (
                        <label key={candidate.id} style={labelStyle}>
                            <input
                                type="radio"
                                name="candidate"
                                value={candidate.name}
                                checked={selectedCandidate === candidate.name}
                                onChange={() => setSelectedCandidate(candidate.name)}
                            />
                            <span style={{ marginLeft: '5px' }}>{candidate.name}</span>
                        </label>
                    ))}
                    <input
                        type="submit"
                        value="Vote"
                        style={buttonStyle}
                    />
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

const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#6e726e',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
};

export default VotingPage;
