import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const MaterialSection = ({ subjectId }) => {
    // State to store the list of fetched materials
    const [materials, setMaterials] = useState([]);
    // State to manage loading status during API call
    const [loading, setLoading] = useState(true);
    // State to display error messages
    const [error, setError] = useState('');

    // useEffect hook to fetch materials when the subjectId changes
    useEffect(() => {
        const fetchMaterials = async () => {
            setLoading(true); // Set loading to true before fetching
            setError('');     // Clear previous errors

            try {
                // Make a GET request to the backend API for materials, using subjectId
                const response = await api.get(`/api/materials/${subjectId}`);
                setMaterials(response.data); // Update materials state with fetched data
            } catch (err) {
                // Handle errors during material fetching
                setError('Failed to fetch materials. Please check backend configuration and file paths.');
                console.error('Material fetch error:', err);
            } finally {
                setLoading(false); // Set loading to false after fetching (success or failure)
            }
        };

        fetchMaterials(); // Call the fetch function
    }, [subjectId]); // Dependency array: re-run effect if subjectId changes

    /**
     * Handles the 'View PDF' action. Opens the PDF in a new browser tab.
     * @param {number} materialId - The ID of the material to view.
     */
    const handleViewPdf = (materialId) => {
        // Construct the URL to the backend endpoint that serves the PDF
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
        window.open(`${baseUrl}/api/materials/view/${materialId}`, '_blank');
    };

    /**
     * Handles the 'Download PDF' action. Triggers a file download.
     * @param {number} materialId - The ID of the material to download.
     */
    const handleDownloadPdf = (materialId) => {
        // Construct the URL to the backend endpoint that triggers file download
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
        window.location.href = `${baseUrl}/api/materials/download/${materialId}`;
    };


    if (loading) {
        return <p>Loading study materials...</p>;
    }
    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div>
            <h3>Study Materials</h3>
            {materials.length === 0 ? (
                // Display message if no materials are found for the subject
                <p>No study materials available for this subject yet.</p>
            ) : (
                // Display list of materials if available
                <ul>
                    {materials.map(material => (
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

export default MaterialSection;