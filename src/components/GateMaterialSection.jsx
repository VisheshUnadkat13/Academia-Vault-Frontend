import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GateMaterialSection = ({ subjectId }) => {
    // State to store the list of fetched GATE materials
    const [gateMaterials, setGateMaterials] = useState([]);
    // State to manage loading status during API call
    const [loading, setLoading] = useState(true);
    // State to display error messages
    const [error, setError] = useState('');

    // useEffect hook to fetch GATE materials when the subjectId changes
    useEffect(() => {
        const fetchGateMaterials = async () => {
            setLoading(true); // Set loading to true before fetching
            setError('');     // Clear previous errors

            try {
                // Make a GET request to the backend API for GATE materials, using subjectId
                const response = await axios.get(`http://localhost:3001/api/gate-materials/${subjectId}`);
                setGateMaterials(response.data); // Update GATE materials state with fetched data
            } catch (err) {
                // Handle errors during GATE material fetching
                setError('Failed to fetch GATE materials. Please check backend configuration and file URLs.');
                console.error('GATE material fetch error:', err);
                if (axios.isAxiosError(err)) {
                    console.error('Axios error details:', err.response?.data || err.message);
                }
            } finally {
                setLoading(false); // Set loading to false after fetching (success or failure)
            }
        };

        fetchGateMaterials(); // Call the fetch function
    }, [subjectId]); // Dependency array: re-run effect if subjectId changes

    /**
     * Handles the 'View PDF' action. Opens the PDF in a new browser tab.
     * This relies on the backend redirecting to the actual external URL.
     * @param {number} gateMaterialId - The ID of the GATE material to view.
     */
    const handleViewPdf = (gateMaterialId) => {
        window.open(`http://localhost:3001/api/gate-materials/view/${gateMaterialId}`, '_blank');
    };

    /**
     * Handles the 'Download PDF' action. Triggers a file download.
     * This relies on the backend redirecting to the actual external URL.
     * Note: External hosts may not force download. User might have to save from opened PDF.
     * @param {number} gateMaterialId - The ID of the GATE material to download.
     */
    const handleDownloadPdf = (gateMaterialId) => {
        window.location.href = `http://localhost:3001/api/gate-materials/download/${gateMaterialId}`;
    };

    if (loading) {
        return <p>Loading GATE materials...</p>;
    }
    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div>
            <h3>GATE Material</h3>
            {gateMaterials.length === 0 ? (
                // Display message if no GATE materials are found for the subject
                <p>No GATE materials available for this subject yet.</p>
            ) : (
                // Display list of GATE materials if available
                <ul>
                    {gateMaterials.map(material => (
                        <li key={material.id}>
                            <span>{material.title}</span>
                            <div>
                                <button onClick={() => handleViewPdf(material.id)}>View PDF</button>
                                <button onClick={() => handleDownloadPdf(material.id)}>Download PDF</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GateMaterialSection;
