import { useEffect, useState, Fragment } from 'react';
import './wordsQuiz.scss';
import Spinner from '../Spinner/Spinner';

const WordsQuiz = ({setVariant, setActive, items, loadingStatus}) => {

    const [oneQuestion, setOneQuestion] = useState([]);
    const [variants, setVariants] = useState([]);
    const [correct, setCorrect] = useState('');
    const [answer, setAnswer] = useState('');
    const [index, setIndex] = useState('');
    const [isTrue, setIsTrue] = useState(false);
    const [isFalse, setIsFalse] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isNextQuiestionBtnClicked, setIsNextQuiestionBtnClicked] = useState(false);

    useEffect(() => {
        nextQuestion();        
        // eslint-disable-next-line
    }, [items.length])

    const nextQuestion = () => {
        let copiedArray = [...items];
        const randomIndex = getRandomInt(copiedArray.length);
        const correctAnswer = copiedArray[randomIndex];
        const variantsOfAnswers = [];
        
        for (let i = 0; i < 3; i++) {
            if (randomIndex !== getRandomInt(copiedArray.length)) {
                variantsOfAnswers.push(copiedArray[getRandomInt(copiedArray.length)]);
            } else {
                i = i - 1;
            }          
        }

        variantsOfAnswers.push(correctAnswer);
        
        setVariants(shuffle(variantsOfAnswers));
        setCorrect(correctAnswer);
        setOneQuestion([copiedArray[randomIndex].english]);
        setAnswer('');
        setIndex('');
        setIsFalse(false);
        setIsTrue(false);
        setIsChecked(false);
        setIsNextQuiestionBtnClicked(false)
    }

    const handleNextQuestion = () => {
        if (isChecked) {
            nextQuestion()
        } else {
            setIsNextQuiestionBtnClicked(true)
        }
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    const shuffle = (arr) => {
        return arr.sort(() => Math.round(Math.random() * 100) - 50);
    }

    const handleClick = (answer, i) => {
        setIndex(i)
        setAnswer(answer)
        setIsChecked(false);
        setIsNextQuiestionBtnClicked(false)
    }

    const handleCheckAnswer = () => {
        setIsChecked(true);
        if (answer !== '') {
            if (answer.id === correct.id) {
                setIsFalse(false)
                setIsTrue(true)
            } else {
                setIsFalse(true)
                setIsTrue(false)
            }
        } else {
            setIsFalse(false)
            setIsTrue(false)
        }
    }

    const elements = oneQuestion.map((question, i) => {
        return (
            <Fragment key={i}>
                <div className="wordsquiz__question">{question}</div>
                <ul className='wordsquiz__variants'>
                    {variants.map((item, i) => {
                        let classList;

                        if (index === i) {
                            if (isChecked) {
                                if (answer.id === correct.id) {
                                    classList = 'wordsquiz__variant rightAnswer activeAnswer';
                                } else {
                                    classList = 'wordsquiz__variant wrongAnswer activeAnswer';
                                }
                            } else {
                                classList = 'wordsquiz__variant activeAnswer';
                            }
                        } else if (isChecked && item.id === correct.id && answer !== '') {
                            classList = 'wordsquiz__variant rightAnswer answerAnimate';
                        } else {
                            classList = 'wordsquiz__variant';
                        }

                        return (
                            <li 
                                onClick={() => isChecked && answer !== '' ? null : handleClick(item, i)} 
                                key={i} 
                                className={classList}
                            >
                                {item.russian}
                            </li>
                        )
                    })}
                </ul>
            </Fragment>
        )
    })

    return (
        <div className="wordsquiz">
            <div className='wordsquiz__form'>
                <div onClick={() => setActive(false)} className='wordsquiz__close'>&times;</div>

                <div className='wordsquiz__wrapper'>
                    {loadingStatus === 'loading' ? <Spinner/> : elements}
                    {isTrue && isChecked ? <div className='wordsquiz__success'>Correct answer</div> : null}
                    {isFalse && isChecked ? <div className='wordsquiz__wrong'>Incorrect answer</div> : null}
                    {isChecked && !isFalse && !isTrue ? <div className='wordsquiz__wrong'>Choose the variant</div> : null}
                    {isNextQuiestionBtnClicked && !isChecked? <div className='wordsquiz__wrong'>You have not completed this question</div> : null}
                </div>
                
                <div className='wordsquiz__btns'>
                    <button className='wordsquiz__btn' onClick={() => setVariant('')}>To main page</button>
                    <button className='wordsquiz__btn' onClick={() => handleCheckAnswer()}>Check</button>
                    <button className='wordsquiz__btn' onClick={() => handleNextQuestion()}>Next quistion</button>
                </div>
            </div>
        </div>
    )
}

export default WordsQuiz;