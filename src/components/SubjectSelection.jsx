


import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for making HTTP requests

/**
 * SubjectSelection component fetches and displays a list of subjects
 * based on the selected semester and department.
 * It calls onSubjectSelect when a subject is chosen by the student.
 */
const SubjectSelection = ({ semester, department, onSubjectSelect }) => {
    // State to store the list of fetched subjects
    const [subjects, setSubjects] = useState([]);
    // State to manage loading status during API call
    const [loading, setLoading] = useState(true);
    // State to display error messages
    const [error, setError] = useState('');

    // useEffect hook to fetch subjects whenever semester or department changes
    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true); // Set loading to true before fetching
            setError('');     // Clear previous errors

            console.log(`[SubjectSelection] Fetching subjects for Semester: ${semester}, Department: ${department}`);
            try {
                // Make a GET request to the backend API for subjects, passing semester and department as query parameters
                const response = await axios.get(`http://localhost:3001/api/subjects?semester=${semester}&department=${department}`);
                console.log("[SubjectSelection] API response data:", response.data);
                setSubjects(response.data); // Update subjects state with fetched data
            } catch (err) {
                // Handle errors during subject fetching
                setError('Failed to fetch subjects. Please ensure backend is running and data exists for your selection.');
                console.error('Subject fetch error:', err);
                if (axios.isAxiosError(err)) {
                    console.error('Axios error details:', err.response?.data || err.message);
                }
            } finally {
                setLoading(false); // Set loading to false after fetching (success or failure)
            }
        };

        fetchSubjects(); // Call the fetch function
    }, [semester, department]); // Dependency array: re-run effect if semester or department changes

    // Render loading state
    if (loading) {
        return <p>Loading subjects for {semester}th semester, {department} department...</p>;
    }

    // Render error state
    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div>
            <h2>Available Subjects</h2>
            {subjects.length === 0 ? (
                // Display message if no subjects are found
                <p>No subjects found for Semester {semester} and Department {department}. Please check your database data or selections.</p>
            ) : (
                // Display list of subjects if available
                <ul>
                    {subjects.map(subject => (
                        <li key={subject.id}>
                            <span>{subject.name}</span> {/* Use span for text to avoid button styling conflict */}
                            <button onClick={() => onSubjectSelect(subject)}>Select Subject</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubjectSelection;