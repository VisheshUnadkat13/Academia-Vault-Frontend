import React from 'react';
import SemesterDepartmentSelection from './SemesterDepartmentSelection';
import SubjectSelection from './SubjectSelection';
import MaterialSection from './MaterialSection';
import PreviousYearPaperSection from './PreviousYearPaperSection';
import YouTubeLinkSection from './YouTubeLinkSection';
import GateMaterialSection from './GateMaterialSection';
import LandingPage from './LandingPage';


const Home = ({
    user,
    selectedSemester,
    selectedDepartment,
    selectedSubject,
    selectedOption,
    handleSemesterDepartmentSelect,
    handleSubjectSelect,
    handleOptionSelect,
    resetToSubjectSelection,
    resetToOptionSelection,
    resetToHome
}) => {
    return (
        <main>
            <LandingPage />

            <div className="content-container">
                {!user ? (
                    <div className="card" style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <h2>Access Restricted</h2>
                        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                            Please login or sign up to access study materials, previous year papers, and other resources.
                        </p>
                        <div className="nav-buttons">
                            <a href="/login" className="btn-primary" style={{ textDecoration: 'none' }}>Login</a>
                            <a href="/signup" className="btn-primary" style={{ textDecoration: 'none', backgroundColor: 'white', color: 'var(--primary)', border: '1px solid var(--primary)' }}>Sign Up</a>
                        </div>
                    </div>
                ) : (
                    !selectedSemester || !selectedDepartment ? (
                        <SemesterDepartmentSelection
                            onSelect={handleSemesterDepartmentSelect}
                        />
                    ) : (
                        <>
                            <h2>Explore Resources</h2>
                            <h3>Selected: Semester {selectedSemester}, Department {selectedDepartment}</h3>
                            <div className="nav-buttons">
                                <button onClick={() => { handleSemesterDepartmentSelect('', ''); resetToSubjectSelection(); }}>
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
                                        <div className="card">
                                            <h4>Choose an option for {selectedSubject.name}:</h4>
                                            <div className="nav-buttons">
                                                <button onClick={() => handleOptionSelect('material')}>Material</button>
                                                <button onClick={() => handleOptionSelect('paper')}>Previous Year Paper</button>
                                                <button onClick={() => handleOptionSelect('youtube')}>YouTube Videos</button>
                                                <button onClick={() => handleOptionSelect('gate_material')}>GATE Material</button>
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
                    )
                )}
            </div>

        </main>
    );
};

export default Home;
