import React, { useEffect, useState } from 'react'
import { generateQuestions } from '../API-Services/triviaAPI';
import { QuestionCard } from '../ReusableComponents/QAGenerator';

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


    const currentQuestion = trivia.results && trivia.results[currentQuestionIndex];

    const handleSelectedAnswer = (choice) => {
        if(decodeHtmlEntities(currentQuestion.correct_answer) === decodeHtmlEntities(choice)){
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
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
        return () =>{
            getQuestions();
        }
        
    },[])

    
    return (
        <div>
            {currentQuestion ? (
                <QuestionCard question={currentQuestion} handleSelectedAnswer={handleSelectedAnswer}/>             
            ):<p>{errorMessage}</p>}
        </div>
    )
}

export default TriviaPage
