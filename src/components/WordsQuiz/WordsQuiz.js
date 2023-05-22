import { useEffect, useState, Fragment } from 'react';
import './wordsQuiz.scss';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';

const WordsQuiz = ({setVariant, setActive}) => {

    const {words, wordsLoadingStatus} = useSelector(state => state.words);

    const [oneQuestion, setOneQuestion] = useState([]);
    const [variants, setVariants] = useState([]);
    const [correct, setCorrect] = useState('');
    const [answer, setAnswer] = useState('');
    const [index, setIndex] = useState('');

    useEffect(() => {
        showQuiz();        
        // eslint-disable-next-line
    }, [words.length])

    const showQuiz = () => {
        let copiedArray = [...words];
        const randomIndex = getRandomInt(copiedArray.length);
        const correctAnswer = copiedArray[randomIndex].russian;
        const variantsOfAnswers = [];
        
        for (let i = 0; i < 3; i++) {
            if (randomIndex !== getRandomInt(copiedArray.length)) {
                variantsOfAnswers.push(copiedArray[getRandomInt(copiedArray.length)].russian);
            } else {
                i = i - 1;
            }          
        }

        variantsOfAnswers.push(correctAnswer);
        
        setVariants(variantsOfAnswers);
        setCorrect(correctAnswer);
        setOneQuestion([copiedArray[randomIndex].english]);
        setAnswer('');
        setIndex('');
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    const handleClick = (answer, i) => {
        setIndex(i)
        setAnswer(answer)
    }

    const elements = oneQuestion.map((question, i) => {
        return (
            <Fragment key={i}>
                <div className="wordsquiz__question">{question}</div>
                <ul className='wordsquiz__variants'>
                    {variants.map((item, i) => {
                        return (
                            <li 
                                onClick={() => handleClick(item, i)} 
                                key={i} 
                                className={index === i ? 'wordsquiz__variant activeAnswer' : 'wordsquiz__variant'}
                            >
                                {item}
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
                    {wordsLoadingStatus === 'loading' ? <Spinner/> : elements}
                </div>

                <div className='wordsquiz__btns'>
                    <button className='wordsquiz__btn' onClick={() => setVariant('')}>To main page</button>
                    <button className='wordsquiz__btn' onClick={() => showQuiz()}>Next quistion</button>
                </div>
            </div>
        </div>
    )
}

export default WordsQuiz;