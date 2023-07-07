import { useState } from 'react';
import PropTypes from 'prop-types';
import FlashCards from '../FlashCards/FlashCards';
import WordsQuiz from '../WordsQuiz/WordsQuiz';
import cards from '../../resources/cards.jpg';
import quiz from '../../resources/quiz.png';
import './quizModal.scss';

const QuizModal = ({setActive, active, items, loadingStatus}) => {

    const variantsArray = [
        {img: quiz, name: 'Quiz'},
        {img: cards, name: 'Cards'},
    ]

    const [selection, setSelection] = useState('');
    const [variant, setVariant] = useState('');

    const handleClick = (index) => {
        setSelection(index)
    }

    const handleNext = () => {
        setVariant(selection)
    }
    
    const variants = variantsArray.map((item, i) => {
        return (
            <div 
                key={i} 
                className={selection === i ? 'quiz__variant activeVariant' : 'quiz__variant'} 
                onClick={() => handleClick(i)}
            >
                <img src={item.img} alt={item.name}/>
                <div>{item.name}</div>
            </div>
        )
    })

    const mainForm = <div className='quiz__form'>
                        <div className='quiz__title'>Choose an Option</div>

                        <div className='quiz__variants'>
                            {variants}
                        </div>
                        
                        <div className='quiz__btns'>
                            <button 
                                className='quiz__closebtn' 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActive(false);
                                }}    
                            >Close
                            </button>
                            <button className='quiz__btn' onClick={() => handleNext()}>Next</button>
                        </div>
                    </div>

    return (
        <>
            <div className={active ? "quiz active" : "quiz"}>
                <div 
                    className={active ? "quiz__content active" : "quiz__content"} 
                    onClick={e => e.stopPropagation()}
                >
                    {variant === '' ? mainForm : null}
                    {variant === 0 ? <WordsQuiz items={items} loadingStatus={loadingStatus} setVariant={setVariant} setActive={setActive}/> : null}
                    {variant === 1 ? <FlashCards items={items} loadingStatus={loadingStatus} setVariant={setVariant} setActive={setActive}/> : null}
                </div>
            </div>
        </>        
    )
}

QuizModal.propTypes = {
    setActive:  PropTypes.func.isRequired,
    active:  PropTypes.bool.isRequired,
    items:  PropTypes.array.isRequired,
    loadingStatus:  PropTypes.string.isRequired
}

export default QuizModal;