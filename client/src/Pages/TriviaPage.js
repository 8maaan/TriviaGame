import React, { useEffect, useState } from 'react'
import { generateQuestions } from '../API-Services/triviaAPI';
import { QACard } from '../ReusableComponents/QACard';

const decodeHtmlEntities = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
};

const TriviaPage = () => {
    // QUESTIONS AND ANSWERS (QA)
    const [trivia, setTrivia] = useState({});

    // FOR QA NAVIGATION (WIP)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    // PLAYER SCORE
    const [score, setScore] = useState(0);


    const currentQuestion = trivia.results && trivia.results[currentQuestionIndex];

    const handleSelectedAnswer = (choice) => {
        if(decodeHtmlEntities(currentQuestion.correct_answer) === decodeHtmlEntities(choice)){
            setScore((prevScore) => prevScore + 1);
        }

        // setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeout(() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 1000);
    }

    useEffect(() => {
        const getQuestions = async () => {
            const result = await generateQuestions();
            if(result.success){
                setTrivia(result.success);
                console.log(result.success.results);
            }else{
                console.log(result.error);
                setErrorMessage(result.error);
            }
        }
        
        // THIS IS INTENDED
        return () =>{
            getQuestions();
        }    
    },[])

    
    return (
        <div>
            {trivia.results ? (
                currentQuestion ? (
                    <QACard question={currentQuestion} handleSelectedAnswer={handleSelectedAnswer} />
                ) : (
                    <p>{currentQuestionIndex === 5 ? `Good job! Your final score is ${score} / ${currentQuestionIndex}` : <></>}</p>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default TriviaPage
