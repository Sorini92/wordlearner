import { useEffect, useState, Fragment } from 'react';
import './wordsQuiz.scss';
import { useSelector } from 'react-redux';

const WordsQuiz = ({setVariant, setActive}) => {

    const {words, wordsLoadingStatus} = useSelector(state => state.words);

    const [oneQuestion, setOneQuestion] = useState([]);
    const [variants, setVariants] = useState([]);
    const [correct, setCorrect] = useState('');
    const [answer, setAnswer] = useState('');
    const [index, setIndex] = useState('');

    useEffect(() => {
        let copiedArray = [...words];
        const randomIndex = getRandomInt(copiedArray.length);
        const variantsOfAnswers = [];
        
        for (let i = 0; i < 3; i++) {
            if (randomIndex !== getRandomInt(copiedArray.length)) {
                variantsOfAnswers.push(copiedArray[getRandomInt(copiedArray.length)].russian);
                console.log(i)
            }           
        }
        console.log(copiedArray[randomIndex].russian)
        variantsOfAnswers.push(correct)
        setVariants(variantsOfAnswers)
        setCorrect(copiedArray[randomIndex].russian)
        setOneQuestion([copiedArray[randomIndex].english])
        // eslint-disable-next-line
    }, [words.length])

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };
    
    const elements = oneQuestion.map((question, i) => {
        return (
            <Fragment key={i}>
                <div className="wordsquiz__question">{question}</div>
                <ul className='wordsquiz__variants'>
                    {variants.map((item, i) => {
                        return (
                            <li key={i} className='wordsquiz__variant'>{item}</li>
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
                    {elements}
                </div>

                <div className='wordsquiz__btns'>
                    <button className='wordsquiz__btn' onClick={() => setVariant('')}>To main page</button>
                    <button className='wordsquiz__btn'>Next quistion</button>
                </div>
            </div>
        </div>
    )
}

export default WordsQuiz;