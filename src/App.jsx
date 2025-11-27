import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ContactPage from './components/ContactPage';


import './index.css';

const App = () => {
    // Auth State
    const [user, setUser] = useState(null);

    // Check for token on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setUser({ username, token });
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('username', userData.username);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    // App Logic State (Lifted from original App.jsx)
    const getInitialState = (key, defaultValue) => {
        try {
            const savedValue = localStorage.getItem(key);
            if (savedValue === null || savedValue === 'null' || savedValue === 'undefined') {
                return defaultValue;
            }
            return JSON.parse(savedValue);
        } catch (error) {
            console.error(`Failed to parse ${key} from localStorage:`, error);
            localStorage.removeItem(key);
            return defaultValue;
        }
    };

    const [selectedSemester, setSelectedSemester] = useState(() => getInitialState('selectedSemester', ''));
    const [selectedDepartment, setSelectedDepartment] = useState(() => getInitialState('selectedDepartment', ''));
    const [selectedSubject, setSelectedSubject] = useState(() => getInitialState('selectedSubject', null));
    const [selectedOption, setSelectedOption] = useState(() => getInitialState('selectedOption', ''));

    useEffect(() => { localStorage.setItem('selectedSemester', JSON.stringify(selectedSemester)); }, [selectedSemester]);
    useEffect(() => { localStorage.setItem('selectedDepartment', JSON.stringify(selectedDepartment)); }, [selectedDepartment]);
    useEffect(() => { localStorage.setItem('selectedSubject', JSON.stringify(selectedSubject)); }, [selectedSubject]);
    useEffect(() => { localStorage.setItem('selectedOption', JSON.stringify(selectedOption)); }, [selectedOption]);

    const handleSemesterDepartmentSelect = (semester, department) => {
        setSelectedSemester(semester);
        setSelectedDepartment(department);
        setSelectedSubject(null);
        setSelectedOption('');
    };

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        setSelectedOption('');
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const resetToHome = () => {
        setSelectedSemester('');
        setSelectedDepartment('');
        setSelectedSubject(null);
        setSelectedOption('');
        localStorage.removeItem('selectedSemester');
        localStorage.removeItem('selectedDepartment');
        localStorage.removeItem('selectedSubject');
        localStorage.removeItem('selectedOption');
    };

    const resetToSubjectSelection = () => {
        setSelectedSubject(null);
        setSelectedOption('');
        localStorage.removeItem('selectedSubject');
        localStorage.removeItem('selectedOption');
    };

    const resetToOptionSelection = () => {
        setSelectedOption('');
        localStorage.removeItem('selectedOption');
    };

    return (
        <Router>
            <div className="app-layout">
                <Header user={user} onLogout={handleLogout} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                user={user}
                                selectedSemester={selectedSemester}
                                selectedDepartment={selectedDepartment}
                                selectedSubject={selectedSubject}
                                selectedOption={selectedOption}
                                handleSemesterDepartmentSelect={handleSemesterDepartmentSelect}
                                handleSubjectSelect={handleSubjectSelect}
                                handleOptionSelect={handleOptionSelect}
                                resetToSubjectSelection={resetToSubjectSelection}
                                resetToOptionSelection={resetToOptionSelection}
                                resetToHome={resetToHome}
                            />
                        }
                    />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/contact" element={<ContactPage />} />

                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
