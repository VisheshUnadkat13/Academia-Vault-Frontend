import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <section className="landing-hero">
            <div className="hero-content">
                <h1>Welcome to Academia Vault</h1>
                <p>Your one-stop destination for study materials, previous year papers, and more.</p>
                <div className="hero-actions">
                    <button className="btn-primary">Get Started</button>
                    <button className="btn-secondary">Learn More</button>
                </div>
            </div>
        </section>
    );
};

export default LandingPage;
