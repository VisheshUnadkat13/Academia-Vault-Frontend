

import React, { useState } from 'react';


const SemesterDepartmentSelection = ({ onSelect }) => {
    // State to hold the selected semester
    const [semester, setSemester] = useState('');
    // State to hold the selected department
    const [department, setDepartment] = useState('');
    // State to display error messages
    const [error, setError] = useState('');

    // Predefined lists for semesters and departments
    const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const departments = [
        'Computer Engineering',
        'Information Technology',
        'Electronics & Communication',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electrical Engineering'
    ];

    /**
     * Handles the form submission for semester and department selection.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form refresh
        setError('');      // Clear previous errors

        // Validate that both semester and department are selected
        if (!semester || !department) {
            setError('Please select both semester and department.');
            return;
        }
        // Call the onSelect prop with the selected values
        onSelect(semester, department);
    };

    return (
        <div>
            <h2>Select Your Academic Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="semester">Semester:</label>
                    <select
                        id="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                    >
                        <option value="">Select Semester</option>
                        {semesters.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="department">Department:</label>
                    <select
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
                {error && <p className="error">{error}</p>} {/* Display error message if present */}
                <button type="submit">View Subjects</button>
            </form>
        </div>
    );
};

export default SemesterDepartmentSelection;