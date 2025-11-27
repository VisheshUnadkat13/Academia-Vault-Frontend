import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SemesterDepartmentSelection from './SemesterDepartmentSelection';
import SubjectSelection from './SubjectSelection';
import MaterialSection from './MaterialSection';
import PreviousYearPaperSection from './PreviousYearPaperSection';
import YouTubeLinkSection from './YouTubeLinkSection';
import GateMaterialSection from './GateMaterialSection';

const PortalContent = () => {
    // Helper function to get initial state from localStorage
    const getInitialState = (key, defaultValue) => {
        try {
            const savedValue = localStorage.getItem(key);
            if (savedValue === null || savedValue === 'null' || savedValue === 'undefined') {
                return defaultValue;
            }
            const parsedValue = JSON.parse(savedValue);
            return parsedValue;
        } catch (error) {
            console.error(`Failed to parse ${key} from localStorage:`, error);
            localStorage.removeItem(key);
            return defaultValue;
        }
    };

    // States for academic selections, persisted in localStorage
    const [selectedSemester, setSelectedSemester] = useState(() => getInitialState('selectedSemester', ''));
    const [selectedDepartment, setSelectedDepartment] = useState(() => getInitialState('selectedDepartment', ''));
    const [selectedSubject, setSelectedSubject] = useState(() => getInitialState('selectedSubject', null));
    const [selectedOption, setSelectedOption] = useState(() => getInitialState('selectedOption', ''));

    // Effects to save navigation-related states to localStorage
    useEffect(() => {
        localStorage.setItem('selectedSemester', JSON.stringify(selectedSemester));
    }, [selectedSemester]);

    useEffect(() => {
        localStorage.setItem('selectedDepartment', JSON.stringify(selectedDepartment));
    }, [selectedDepartment]);

    useEffect(() => {
        localStorage.setItem('selectedSubject', JSON.stringify(selectedSubject));
    }, [selectedSubject]);

    useEffect(() => {
        localStorage.setItem('selectedOption', JSON.stringify(selectedOption));
    }, [selectedOption]);

    /**
     * Callback function for when a semester and department are selected.
     * Resets subject and option selections.
     * @param {string} semester - The chosen semester.
     * @param {string} department - The chosen department.
     */
    const handleSemesterDepartmentSelect = (semester, department) => {
        setSelectedSemester(semester);
        setSelectedDepartment(department);
        setSelectedSubject(null);
        setSelectedOption('');
    };

    /**
     * Callback function for when a subject is selected.
     * Resets the option selection.
     * @param {Object} subject - The selected subject object.
     */
    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        setSelectedOption('');
    };

    /**
     * Callback function for when an option (Material/Previous Year Paper/YouTube/GATE Material) is selected.
     * @param {string} option - 'material', 'paper', 'youtube', or 'gate_material'.
     */
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    /**
     * Resets all navigation states to the home/initial selection.
     */
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

    /**
     * Resets the application state to the subject selection stage.
     */
    const resetToSubjectSelection = () => {
        setSelectedSubject(null);
        setSelectedOption('');
        localStorage.removeItem('selectedSubject');
        localStorage.removeItem('selectedOption');
    };

    /**
     * Resets the application state to the option selection stage.
     */
    const resetToOptionSelection = () => {
        setSelectedOption('');
        localStorage.removeItem('selectedOption');
    };

    return (
        <div className="container">
            <h2>Explore Resources</h2>

            {!selectedSemester || !selectedDepartment ? (
                <SemesterDepartmentSelection
                    onSelect={handleSemesterDepartmentSelect}
                />
            ) : (
                <>
                    <h3>Selected: Semester {selectedSemester}, Department {selectedDepartment}</h3>
                    <div className="nav-buttons">
                        <button onClick={() => { setSelectedSemester(''); setSelectedDepartment(''); resetToSubjectSelection(); }}>
                            Change Semester/Department
                        </button>
                    </div>

                    {!selectedSubject ? (
                        <SubjectSelection
                            semester={selectedSemester}
                            department={selectedDepartment}
                            onSubjectSelect={handleSubjectSelect}
                        />
                    ) : (
                        <>
                            <h3>Selected Subject: {selectedSubject.name}</h3>
                            <div className="nav-buttons">
                                <button onClick={resetToSubjectSelection}>Change Subject</button>
                            </div>

                            {!selectedOption ? (
                                <div>
                                    <h4>Choose an option for {selectedSubject.name}:</h4>
                                    <div className="options-grid">
                                        <div className="option-card" onClick={() => handleOptionSelect('material')}>
                                            Material
                                        </div>
                                        <div className="option-card" onClick={() => handleOptionSelect('paper')}>
                                            Previous Year Paper
                                        </div>
                                        <div className="option-card" onClick={() => handleOptionSelect('youtube')}>
                                            YouTube Videos
                                        </div>
                                        <div className="option-card" onClick={() => handleOptionSelect('gate_material')}>
                                            GATE Material
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="nav-buttons">
                                        <button onClick={resetToOptionSelection}>Back to Options</button>
                                    </div>
                                    {selectedOption === 'material' && (
                                        <MaterialSection subjectId={selectedSubject.id} />
                                    )}
                                    {selectedOption === 'paper' && (
                                        <PreviousYearPaperSection subjectId={selectedSubject.id} />
                                    )}
                                    {selectedOption === 'youtube' && (
                                        <YouTubeLinkSection subjectId={selectedSubject.id} />
                                    )}
                                    {selectedOption === 'gate_material' && (
                                        <GateMaterialSection subjectId={selectedSubject.id} />
                                    )}
                                </>
                            )}
                        </>
                    )}
                    <div className="nav-buttons">
                        <button onClick={resetToHome}>Start Over</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PortalContent;