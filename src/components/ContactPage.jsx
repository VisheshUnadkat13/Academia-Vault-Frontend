import React, { useState } from 'react';
import api from '../api/axiosConfig';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await api.post('/api/contact', formData);
            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">Contact Us</h2>
                    <p className="auth-subtitle">We'd love to hear from you</p>
                </div>

                {status.message && (
                    <div className={`error`} style={{ backgroundColor: status.type === 'success' ? '#d1fae5' : '#fee2e2', color: status.type === 'success' ? '#065f46' : '#b91c1c', borderColor: status.type === 'success' ? '#a7f3d0' : '#fecaca' }}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="form-input"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-input"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="4"
                            required
                            disabled={loading}
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
