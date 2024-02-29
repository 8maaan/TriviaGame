import { Button } from '@mui/material';
import React from 'react';
import '../CSS-ReusableComponents/QAGenerator.css'

export const QuestionCard = ({ question, handleSelectedAnswer }) => {
    const decodeHtmlEntities = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent;
    };

    const getAnswer = (answer) =>{
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

    return (
        <div className='card-main'>
            <div className="card-container">
                <div className="card-questions-container">
                    <h6 style={{textAlign:'left', fontSize:'1.5rem', margin:'auto 0'}}>Category</h6>
                    <p className='card-category'>{decodeHtmlEntities(question.category)}</p>
                    <p className='card-question'>{decodeHtmlEntities(question.question)}</p>
                </div>

                <div className='card-choices-container'>
                    {shuffleAnswers(question.correct_answer, question.incorrect_answers).map((answer, index) => (
                        <div key={index} className="card-choices">
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => { getAnswer(answer) }}
                                classes={{ containedPrimary: 'card-choices-buttons' }}
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

