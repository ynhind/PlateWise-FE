import React, { useState } from 'react';
import { useChallenges } from './ChallengeContext';
import './challenges.css';

type ViewState = 'list' | 'create' | 'details';

export const ChallengesPage: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewState>('list');
    const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);

    const handleCreateSuccess = () => {
        // Ideally we'd navigate to the new challenge, but for simplicity let's go safely to list or find latest
        setCurrentView('list');
    };

    const handleViewDetails = (id: string) => {
        setSelectedChallengeId(id);
        setCurrentView('details');
    };

    const handleBack = () => {
        setCurrentView('list');
        setSelectedChallengeId(null);
    };

    return (
        <div className="challenges-container">
            {currentView === 'list' && (
                <ChallengeListView
                    onCreateClick={() => setCurrentView('create')}
                    onChallengeClick={handleViewDetails}
                />
            )}

            {currentView === 'create' && (
                <CreateChallengeView
                    onBack={handleBack}
                    onSuccess={handleCreateSuccess}
                />
            )}

            {currentView === 'details' && selectedChallengeId && (
                <ChallengeDetailsView
                    challengeId={selectedChallengeId}
                    onBack={handleBack}
                />
            )}
        </div>
    );
};

// --- Sub-Components ---

// 1. LIST VIEW
const ChallengeListView: React.FC<{
    onCreateClick: () => void,
    onChallengeClick: (id: string) => void
}> = ({ onCreateClick, onChallengeClick }) => {
    const { activeChallenges, communityChallenges, joinChallenge } = useChallenges();
    const [activeTab, setActiveTab] = useState<'active' | 'community'>('active');

    const handleJoin = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        joinChallenge(id);
        // Switch to active tab to show it's there
        setActiveTab('active');
    };

    return (
        <div className="animate-slide-up">
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Challenges</h1>
                <p style={{ color: '#64748b' }}>Level up your health game!</p>
            </header>

            <div className="tabs-header">
                <button
                    className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => setActiveTab('active')}
                >
                    My Active ({activeChallenges.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'community' ? 'community' : ''}`}
                    onClick={() => setActiveTab('community')}
                >
                    Community ({communityChallenges.length})
                </button>
            </div>

            <div className="challenges-grid">
                {activeTab === 'active' && activeChallenges.map(challenge => (
                    <div key={challenge.id} className="challenge-card" onClick={() => onChallengeClick(challenge.id)}>
                        <img src={challenge.coverImage} alt={challenge.title} className="challenge-cover" />
                        <div className="challenge-content">
                            <h3 className="challenge-title">{challenge.title}</h3>
                            <div className="challenge-meta">
                                {challenge.duration} Days • Started {new Date(challenge.startDate!).toLocaleDateString()}
                            </div>
                            <div style={{ marginTop: 'auto' }}>
                                <span className="capsule-badge badge-active">In Progress</span>
                            </div>
                        </div>
                    </div>
                ))}

                {activeTab === 'community' && communityChallenges.map(challenge => (
                    <div key={challenge.id} className="challenge-card">
                        <img src={challenge.coverImage} alt={challenge.title} className="challenge-cover" />
                        <div className="challenge-content">
                            <h3 className="challenge-title">{challenge.title}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
                                {challenge.description}
                            </p>
                            <div style={{ marginTop: 'auto' }}>
                                <button
                                    className="btn-primary"
                                    style={{ width: '100%' }}
                                    onClick={(e) => handleJoin(e, challenge.id)}
                                >
                                    Join Challenge
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {activeTab === 'active' && activeChallenges.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                        <p>You have no active challenges. Join one from the Community tab!</p>
                    </div>
                )}
            </div>

            <button className="fab-create" onClick={onCreateClick}>
                +
            </button>
        </div>
    );
};

// 2. CREATE VIEW
const CreateChallengeView: React.FC<{ onBack: () => void, onSuccess: () => void }> = ({ onBack, onSuccess }) => {
    const { createChallenge } = useChallenges();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: 7,
    });
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create object URL for the image
        const coverImage = file
            ? URL.createObjectURL(file)
            : 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80';

        createChallenge({
            title: formData.title,
            description: formData.description,
            duration: Number(formData.duration),
            coverImage
        });

        onSuccess();
    };

    return (
        <div className="animate-slide-up" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <button onClick={onBack} className="btn-secondary" style={{ marginBottom: '24px', borderWidth: '1px' }}>
                ← Back
            </button>

            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Create New Challenge</h2>

            <form onSubmit={handleSubmit} className="challenge-card" style={{ padding: '32px' }}>
                <div className="form-group">
                    <label className="form-label">Challenge Title</label>
                    <input
                        className="form-input"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="e.g., No Sugar Week"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-input"
                        rows={3}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        required
                        placeholder="What's the goal?"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Duration (Days)</label>
                    <input
                        type="number"
                        min="1"
                        max="365"
                        className="form-input"
                        value={formData.duration}
                        onChange={e => setFormData({ ...formData, duration: Number(e.target.value) })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-input"
                        onChange={e => setFile(e.target.files?.[0] || null)}
                    />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                    Create Challenge
                </button>
            </form>
        </div>
    );
};

// 3. DETAILS VIEW
const ChallengeDetailsView: React.FC<{ challengeId: string, onBack: () => void }> = ({ challengeId, onBack }) => {
    const { activeChallenges, getLogsForChallenge, addLog } = useChallenges();
    const challenge = activeChallenges.find(c => c.id === challengeId);
    const logs = getLogsForChallenge(challengeId);

    // Deriving timeline state
    // Assuming start date is day 1 to simplified logic.
    // In a real app we'd calculate date diffs. Here, show all days.

    if (!challenge) return <div>Challenge not found</div>;

    const days = Array.from({ length: challenge.duration }, (_, i) => i + 1);

    return (
        <div className="animate-slide-up">
            <button onClick={onBack} className="btn-secondary" style={{ marginBottom: '24px', borderWidth: '1px' }}>
                ← Back
            </button>

            <div className="challenge-card" style={{ marginBottom: '32px' }}>
                <img src={challenge.coverImage} className="challenge-cover" style={{ height: '200px' }} alt="" />
                <div className="challenge-content">
                    <h1 className="challenge-title" style={{ fontSize: '2rem' }}>{challenge.title}</h1>
                    <p style={{ color: '#64748b' }}>{challenge.description}</p>
                    <div style={{ marginTop: '16px' }}>
                        Start Date: {new Date(challenge.startDate!).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <div className="timeline-container">
                <h2 style={{ marginBottom: '24px' }}>Timeline</h2>
                {days.map(dayNum => {
                    const log = logs.find(l => l.dayNumber === dayNum);
                    const isCompleted = !!log;

                    return (
                        <TimelineDay
                            key={dayNum}
                            dayNum={dayNum}
                            isCompleted={isCompleted}
                            challengeId={challengeId}
                            existingLog={log}
                            onLogProof={(text, file) => {
                                const imgUrl = file ? URL.createObjectURL(file) : undefined;
                                addLog({
                                    challengeId,
                                    dayNumber: dayNum,
                                    date: new Date().toISOString(),
                                    proofText: text,
                                    proofImageUrl: imgUrl,
                                    verified: true
                                });
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const TimelineDay: React.FC<{
    dayNum: number,
    isCompleted: boolean,
    challengeId: string,
    existingLog?: any,
    onLogProof: (text: string, file: File | null) => void
}> = ({ dayNum, isCompleted, existingLog, onLogProof }) => {
    const [isLogging, setIsLogging] = useState(false);
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogProof(text, file);
        setIsLogging(false);
    };

    return (
        <div className="timeline-day">
            <div className="timeline-line"></div>
            <div className={`day-indicator ${isCompleted ? 'completed' : ''}`}>
                {isCompleted ? '✓' : dayNum}
            </div>

            <div className="day-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0 }}>Day {dayNum}</h4>
                    {isCompleted && <span className="capsule-badge badge-completed">Completed</span>}
                </div>

                {isCompleted ? (
                    <div>
                        <p>{existingLog.proofText}</p>
                        {existingLog.proofImageUrl && (
                            <img src={existingLog.proofImageUrl} alt="Proof" className="proof-img" />
                        )}
                    </div>
                ) : (
                    !isLogging ? (
                        <button className="btn-secondary" style={{ fontSize: '0.9rem', padding: '8px 16px' }} onClick={() => setIsLogging(true)}>
                            Log Proof
                        </button>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
                            <input
                                className="form-input"
                                placeholder="How did it go?"
                                value={text}
                                onChange={e => setText(e.target.value)}
                                required
                                style={{ marginBottom: '8px', padding: '8px' }}
                            />
                            <input
                                type="file"
                                className="form-input"
                                onChange={e => setFile(e.target.files?.[0] || null)}
                                style={{ marginBottom: '8px', padding: '8px' }}
                            />
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Submit</button>
                                <button type="button" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem', borderWidth: '1px' }} onClick={() => setIsLogging(false)}>Cancel</button>
                            </div>
                        </form>
                    )
                )}
            </div>
        </div>
    );
};
