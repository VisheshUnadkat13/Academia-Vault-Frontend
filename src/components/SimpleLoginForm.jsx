
import React, { useState } from 'react';
import axios from 'axios';


const SimpleLoginForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setIsError(false); // Reset error state

        if (!username.trim() || !email.trim()) {
            setMessage('Please enter both username and email ID.');
            setIsError(true);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage('Please enter a valid email address.');
            setIsError(true);
            return;
        }

        try {
            const response = await axios.post(
                '/api/login', // Target endpoint as specified
                { username, email } // Data payload
            );

            // Assuming the backend returns a success message or relevant data
            setMessage(`Form submitted successfully! Backend response: ${JSON.stringify(response.data)}`);
            setUsername('');
            setEmail('');
            console.log('Form submission successful:', response.data);

        } catch (error) {
            setMessage(`Submission failed. Please check backend and console. Error: ${error.message}`);
            setIsError(true);
            console.error('Form submission error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>User Login / Identification</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email ID:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                    />
                </div>
                {message && <p className={isError ? 'error' : 'success-message'} style={{ color: isError ? 'red' : 'green', textAlign: 'center' }}>{message}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SimpleLoginForm;
