
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {

    const [hidden, setHidden] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    let lastScrollY = 0;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setHidden(true);  // hide when scrolling down
            } else {
                setHidden(false); // show when scrolling up
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <header className={`app-header ${hidden ? "hide-header" : ""}`}>
            <div className="header-content">
                <div className="logo">
                    <Link to="/" style={{ textDecoration: 'none', color: 'var(--primary)' }}>
                        Academia Vault
                    </Link>
                </div>

                <button className="hamburger-menu" onClick={toggleSidebar} aria-label="Toggle menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

                <nav className={`nav-menu ${isSidebarOpen ? 'active' : ''}`}>
                    <button className="close-menu" onClick={closeSidebar} aria-label="Close menu">&times;</button>
                    <Link to="/" className="nav-link" onClick={closeSidebar} style={{ textDecoration: "none" }}>Home</Link>
                    <Link to="/contact" className="nav-link" onClick={closeSidebar} style={{ textDecoration: "none" }}>Contact</Link>

                    {user ? (
                        <>
                            <span className="nav-link user-greeting" style={{ color: 'var(--text-main)', fontWeight: '600' }}>
                                Hi, {user.username}
                            </span>
                            <button
                                onClick={() => { onLogout(); closeSidebar(); }}
                                className="nav-link logout-btn"
                                style={{ cursor: 'pointer', color: 'var(--danger)' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" onClick={closeSidebar} style={{ textDecoration: "none" }}>Login</Link>
                            <Link to="/signup" className="btn-primary nav-signup" onClick={closeSidebar} style={{
                                marginLeft: '1rem',
                                textDecoration: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.9rem'
                            }}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;

