import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.username || !formData.password) {
            setError('Please enter both username and password.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/auth/public/login', formData);

            const { jwtToken, username } = response.data;
            const token = jwtToken || response.data.token || response.data;
            const user = username || formData.username;

            if (onLogin) {
                onLogin({ username: user, token: token });
            }

            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Invalid username or password.');
            } else {
                setError('Login failed. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to access your study portal</p>
                </div>

                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-input"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
