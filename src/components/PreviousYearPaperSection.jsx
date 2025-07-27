


import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const PreviousYearPaperSection = ({ subjectId }) => {
    // State to store the list of fetched previous year papers
    const [papers, setPapers] = useState([]);
    // State to manage loading status during API call
    const [loading, setLoading] = useState(true);
    // State to display error messages
    const [error, setError] = useState('');

    // useEffect hook to fetch papers when the subjectId changes
    useEffect(() => {
        const fetchPapers = async () => {
            setLoading(true); // Set loading to true before fetching
            setError('');     // Clear previous errors

            try {
                // Make a GET request to the backend API for previous year papers, using subjectId
                const response = await axios.get(`http://localhost:3001/api/papers/${subjectId}`);
                setPapers(response.data); // Update papers state with fetched data
            } catch (err) {
                // Handle errors during paper fetching
                setError('Failed to fetch previous year papers. Please check backend configuration and file paths.');
                console.error('Paper fetch error:', err);
            } finally {
                setLoading(false); // Set loading to false after fetching (success or failure)
            }
        };

        fetchPapers(); // Call the fetch function
    }, [subjectId]); // Dependency array: re-run effect if subjectId changes

    /**
     * Handles the 'View PDF' action. Opens the PDF in a new browser tab.
     * @param {number} paperId - The ID of the paper to view.
     */
    const handleViewPdf = (paperId) => {
        // Construct the URL to the backend endpoint that serves the PDF
        window.open(`http://localhost:3001/api/papers/view/${paperId}`, '_blank');
    };

    /**
     * Handles the 'Download PDF' action. Triggers a file download.
     * @param {number} paperId - The ID of the paper to download.
     */
    const handleDownloadPdf = (paperId) => {
        // Construct the URL to the backend endpoint that triggers file download
        window.location.href = `http://localhost:3001/api/papers/download/${paperId}`;
    };

    if (loading) {
        return <p>Loading previous year papers...</p>;
    }
    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div>
            <h3>Previous Year Question Papers</h3>
            {papers.length === 0 ? (
                // Display message if no papers are found for the subject
                <p>No previous year papers available for this subject yet.</p>
            ) : (
                // Display list of papers if available
                <ul>
                    {papers.map(paper => (
                        <li key={paper.id}>
                            <span>{paper.title}</span>
                            <div>
                                <button onClick={() => handleViewPdf(paper.id)}>View PDF</button>
                                <button onClick={() => handleDownloadPdf(paper.id)}>Download PDF</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PreviousYearPaperSection;
