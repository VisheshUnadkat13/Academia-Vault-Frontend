
import React, { useState, useEffect } from 'react';
import SemesterDepartmentSelection from './components/SemesterDepartmentSelection';
import SubjectSelection from './components/SubjectSelection';
import MaterialSection from './components/MaterialSection';
import PreviousYearPaperSection from './components/PreviousYearPaperSection';
import YouTubeLinkSection from './components/YouTubeLinkSection';
import GateMaterialSection from './components/GateMaterialSection';
import './index.css'; // Import global styles

/**
 * Main application component responsible for managing the overall flow
 * and state transitions between different sections of the student portal.
 * No authentication required - app starts directly with semester/department selection.
 */
const App = () => {
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
            // If parsing fails, remove the invalid item from localStorage to prevent future errors
            localStorage.removeItem(key);
            return defaultValue;
        }
    };

    // State for selected semester and department, initialized from localStorage
    const [selectedSemester, setSelectedSemester] = useState(() => getInitialState('selectedSemester', ''));
    const [selectedDepartment, setSelectedDepartment] = useState(() => getInitialState('selectedDepartment', ''));

    // State for the currently selected subject, initialized from localStorage
    const [selectedSubject, setSelectedSubject] = useState(() => getInitialState('selectedSubject', null)); // { id, name, semester, department }

    // State to determine which section to display: 'material', 'paper', 'youtube', 'gate_material', or '' (for selection)
    const [selectedOption, setSelectedOption] = useState(() => getInitialState('selectedOption', ''));

    // Effects to save state to localStorage whenever their values change
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
        setSelectedSubject(null); // Reset subject if semester/dept changes
        setSelectedOption('');    // Reset option
    };

    /**
     * Callback function for when a subject is selected.
     * Resets the option selection.
     * @param {Object} subject - The selected subject object.
     */
    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        setSelectedOption(''); // Reset option when a new subject is selected
    };

    /**
     * Callback function for when an option (Material/Previous Year Paper/YouTube/GATE Material) is selected.
     * @param {string} option - 'material', 'paper', 'youtube', or 'gate_material'.
     */
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    /**
     * Resets all application state to the initial selection page (Semester/Department).
     * Clears all relevant navigation data from localStorage.
     */
    const resetToHome = () => {
        setSelectedSemester('');
        setSelectedDepartment('');
        setSelectedSubject(null);
        setSelectedOption('');
        // Manually clear all relevant localStorage items
        localStorage.removeItem('selectedSemester');
        localStorage.removeItem('selectedDepartment');
        localStorage.removeItem('selectedSubject');
        localStorage.removeItem('selectedOption');
    };

    /**
     * Resets the application state to the subject selection stage.
     * Clears relevant data from localStorage.
     */
    const resetToSubjectSelection = () => {
        setSelectedSubject(null);
        setSelectedOption('');
        localStorage.removeItem('selectedSubject');
        localStorage.removeItem('selectedOption');
    };

    /**
     * Resets the application state to the option selection stage (Material/Previous Year Paper/YouTube/GATE Material).
     * Clears relevant data from localStorage.
     */
    const resetToOptionSelection = () => {
        setSelectedOption('');
        localStorage.removeItem('selectedOption');
    };

    return (
        <div className="container">
            <h1>Academia Vault</h1>

            {/* The application starts directly with Semester and Department selection */}
            {!selectedSemester || !selectedDepartment ? (
                // If semester and department are not selected, show the selection component
                <SemesterDepartmentSelection
                    onSelect={handleSemesterDepartmentSelect}
                />
            ) : (
                // If semester and department are selected, show further options
                <>
                    <h2>Explore Resources</h2>
                    <h3>Selected: Semester {selectedSemester}, Department {selectedDepartment}</h3>
                    <div className="nav-buttons">
                        <button onClick={() => { setSelectedSemester(''); setSelectedDepartment(''); resetToSubjectSelection(); }}>
                            Change Semester/Department
                        </button>
                    </div>

                    {!selectedSubject ? (
                        // If no subject is selected, show the subject selection component
                        <SubjectSelection
                            semester={selectedSemester}
                            department={selectedDepartment}
                            onSubjectSelect={handleSubjectSelect}
                        />
                    ) : (
                        // If a subject is selected, show material/paper/youtube/GATE options
                        <>
                            <h3>Selected Subject: {selectedSubject.name}</h3>
                            <div className="nav-buttons">
                                <button onClick={resetToSubjectSelection}>Change Subject</button>
                            </div>

                            {!selectedOption ? (
                                // If no option (Material/Paper/YouTube/GATE) is selected, prompt for selection
                                <div>
                                    <h4>Choose an option for {selectedSubject.name}:</h4>
                                    <div className="nav-buttons">
                                        <button onClick={() => handleOptionSelect('material')}>Material</button>
                                        <button onClick={() => handleOptionSelect('paper')}>Previous Year Paper</button>
                                        <button onClick={() => handleOptionSelect('youtube')}>YouTube Videos</button>
                                        <button onClick={() => handleOptionSelect('gate_material')}>GATE Material</button>
                                    </div>
                                </div>
                            ) : (
                                // If an option is selected, display the relevant content
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

export default App;

