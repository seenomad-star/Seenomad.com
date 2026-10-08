import React, { useState } from 'react';
import {
    Brain,
    Trophy,
    Sparkles,
    CheckCircle2,
    XCircle,
    ArrowRight,
    RotateCcw,
    Award,
    Compass
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'Which famous Balinese water temple sits on the shores of Lake Beratan in the highlands of Bedugul?',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
        options: [
            'Pura Ulun Danu Beratan',
            'Pura Tanah Lot',
            'Pura Luhur Uluwatu',
            'Pura Besakih'
        ],
        correctIndex: 0,
        explanation: 'Pura Ulun Danu Beratan is the iconic 17th-century Shivaite water temple on Lake Beratan in Bali.'
    },
    {
        id: 2,
        question: 'Under the Schengen 90/180-day rule, how many days can a visa-exempt traveler stay across the Schengen Area within any rolling 180-day window?',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop&q=80',
        options: [
            '60 days maximum',
            '90 days maximum',
            '120 days maximum',
            '180 days maximum'
        ],
        correctIndex: 1,
        explanation: 'Travelers may stay up to 90 days in any rolling 180-day period across all Schengen member states combined.'
    },
    {
        id: 3,
        question: 'Which Portuguese river flows past the colorful Ribeira district and under the Dom Luís I Bridge in Porto?',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80',
        options: [
            'Tagus River (Rio Tejo)',
            'Douro River (Rio Douro)',
            'Guadiana River',
            'Minho River'
        ],
        correctIndex: 1,
        explanation: 'The Douro River flows through northern Portugal directly to its mouth at Porto and Vila Nova de Gaia.'
    },
    {
        id: 4,
        question: 'Which Italian mountain range is home to the dramatic Seceda ridgeline and Tre Cime di Lavaredo?',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
        options: [
            'The Apennines',
            'The Dolomites',
            'Gran Paradiso',
            'Pyrenees'
        ],
        correctIndex: 1,
        explanation: 'The Dolomites in Northern Italy are a UNESCO World Heritage site famed for sheer limestone spires.'
    }
];

const TravelQuizHub = () => {
    const { addToast } = useToastStore();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const currentQ = QUIZ_QUESTIONS[currentIdx];

    const handleSelectOption = (idx) => {
        if (selectedOption !== null) return;
        setSelectedOption(idx);
        if (idx === currentQ.correctIndex) {
            setScore((s) => s + 1);
            addToast('+150 XP! Correct answer!', 'success');
        }
    };

    const handleNext = () => {
        if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
            setCurrentIdx((i) => i + 1);
            setSelectedOption(null);
        } else {
            setIsFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentIdx(0);
        setSelectedOption(null);
        setScore(0);
        setIsFinished(false);
    };

    return (
        <div className="cm-photography-view">
            <div className="cm-photo-hero-header">
                <div className="cm-photo-title-group">
                    <div className="cm-photo-pink-icon amber-tone">
                        <Brain size={24} strokeWidth={2.2} />
                    </div>
                    <div>
                        <h1>Global Travel & Geography Quiz</h1>
                        <p>Test your destination IQ, visa rules, and cultural landmarks to earn Nomad XP</p>
                    </div>
                </div>
                <div className="cm-quiz-score-pill">
                    <Trophy size={15} />
                    <span>Score: {score * 150} XP ({score}/{QUIZ_QUESTIONS.length})</span>
                </div>
            </div>

            {isFinished ? (
                <div className="cm-quiz-card finished">
                    <Award size={48} className="cm-quiz-medal" />
                    <h2>Quiz Completed! You scored {score} out of {QUIZ_QUESTIONS.length}</h2>
                    <p>You earned <strong>+{score * 150} Nomad XP</strong> towards your next Explorer Passport tier.</p>
                    <button type="button" className="cm-upload-shot-btn" onClick={handleRestart}>
                        <RotateCcw size={16} />
                        <span>Play Another Round</span>
                    </button>
                </div>
            ) : (
                <div className="cm-quiz-card">
                    <div className="cm-quiz-visual">
                        <img src={currentQ.image} alt="Landmark quiz prompt" />
                        <span className="cm-quiz-step-badge">
                            Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
                        </span>
                    </div>

                    <div className="cm-quiz-body">
                        <h3>{currentQ.question}</h3>

                        <div className="cm-quiz-options">
                            {currentQ.options.map((opt, idx) => {
                                const isChosen = selectedOption === idx;
                                const isCorrect = idx === currentQ.correctIndex;
                                let stateClass = '';
                                if (selectedOption !== null) {
                                    if (isCorrect) stateClass = 'correct';
                                    else if (isChosen) stateClass = 'wrong';
                                }

                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`cm-quiz-option-btn ${stateClass}`}
                                        onClick={() => handleSelectOption(idx)}
                                    >
                                        <span>{opt}</span>
                                        {selectedOption !== null && isCorrect && <CheckCircle2 size={18} />}
                                        {selectedOption !== null && isChosen && !isCorrect && <XCircle size={18} />}
                                    </button>
                                );
                            })}
                        </div>

                        {selectedOption !== null && (
                            <div className="cm-quiz-feedback">
                                <p>{currentQ.explanation}</p>
                                <button type="button" className="cm-upload-shot-btn" onClick={handleNext}>
                                    <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'See Final Score'}</span>
                                    <ArrowRight size={15} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TravelQuizHub;
