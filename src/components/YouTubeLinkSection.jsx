import React, { useState, useEffect } from 'react';// Axios for making HTTP requests


const YouTubeLinkSection = ({ subjectId }) => {
    // State to store the list of fetched YouTube links
    const [youtubeLinks, setYoutubeLinks] = useState([]);
    // State to manage loading status during API call
    const [loading, setLoading] = useState(true);
    // State to display error messages
    const [error, setError] = useState('');

    
    useEffect(() => {
        const fetchYouTubeLinks = async () => {
            setLoading(true); 
            setError('');     
            try {
                
                const response = await axios.get(`http://localhost:3001/api/youtube-links/${subjectId}`);
                setYoutubeLinks(response.data); // Update state with fetched data
            } catch (err) {
               
                setError('Failed to fetch YouTube links. Please check backend is running and data exists.');
                console.error('YouTube links fetch error:', err);
               
                if (axios.isAxiosError(err)) {
                    console.error('Axios error details:', err.response?.data || err.message);
                }
            } finally {
                setLoading(false); 
            }
        };

        fetchYouTubeLinks(); 
    }, [subjectId]); 

    /**
     * Opens the YouTube video URL in a new browser tab.
     * Includes noopener, noreferrer for security best practices.
     * @param {string} url - The YouTube video URL.
     */
    const handleWatchVideo = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Render loading state
    if (loading) {
        return <p>Loading YouTube videos...</p>;
    }
    // Render error state
    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div>
            <h3>Relevant YouTube Videos</h3>
            {youtubeLinks.length === 0 ? (
                // Display message if no YouTube links are found for the subject
                <p>No YouTube videos available for this subject yet.</p>
            ) : (
                // Display list of YouTube links if available
                <ul>
                    {youtubeLinks.map(link => (
                        <li key={link.id}>
                            <span>{link.title}</span>
                            <button onClick={() => handleWatchVideo(link.url)}>Watch Video</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default YouTubeLinkSection;
