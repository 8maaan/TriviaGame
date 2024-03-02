import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../CSS-ReusableComponents/QAGenerator.css'

export const QACard = ({ question, handleSelectedAnswer }) => {
    
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [clickedAnswer, setClickedAnswer] = useState(null);

    const decodeHtmlEntities = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent;
    };

    const getAnswer = (answer, index) =>{
        setClickedAnswer(index);
        handleSelectedAnswer(answer)  
    }

    const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
        const allAnswers = [correctAnswer, ...incorrectAnswers];
        for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
        }
        return allAnswers;
    };
    
    useEffect(() => {
        // Shuffle answers only when the component mounts or when the question prop changes
        const shuffled = shuffleAnswers(question.correct_answer, question.incorrect_answers);
        setShuffledAnswers(shuffled);
    
        // Reset clickedAnswer when the question prop changes
        setClickedAnswer(null);
    }, [question.correct_answer, question.incorrect_answers, question]);


    return (
        <div className='card-main'>
            <div className="card-container">
                <div className="card-questions-container">
                    <h6 style={{textAlign:'left', fontSize:'1.5rem', margin:'auto 0'}}>Category</h6>
                    <p className='card-category'>{decodeHtmlEntities(question.category)}</p>
                    <p className='card-question'>{decodeHtmlEntities(question.question)}</p>
                </div>

                <div className='card-choices-container'>
                    {shuffledAnswers.map((answer, index) => (
                        <div key={index} className="card-choices">
                            <Button
                                variant="contained"
                                fullWidth
                                color={clickedAnswer === index ? (answer === question.correct_answer ? "success" : "error") : "primary"}
                                onClick={() => { getAnswer(answer, index) }}
                                classes={{ contained: 'card-choices-buttons' }}
                            >
                                {decodeHtmlEntities(answer)}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

