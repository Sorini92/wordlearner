import { useState } from 'react';
import PropTypes from 'prop-types';
import FlashCards from '../FlashCards/FlashCards';
import WordsQuiz from '../WordsQuiz/WordsQuiz';
import cards from '../../resources/cards.jpg';
import quiz from '../../resources/quiz.png';
import { CSSTransition } from "react-transition-group";
import Portal from "../Portal/Portal";
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
        <Portal>
            <CSSTransition
                in={active}
                timeout={{ enter: 300, exit: 300 }}
                unmountOnExit
                classNames={"quiz"}
            >
                <div className="quiz">
                    <div 
                        className="quiz__content" 
                        onClick={e => e.stopPropagation()}
                    >
                        {variant === '' ? mainForm : null}
                        {variant === 0 ? <WordsQuiz items={items} loadingStatus={loadingStatus} setVariant={setVariant} setActive={setActive}/> : null}
                        {variant === 1 ? <FlashCards items={items} loadingStatus={loadingStatus} setVariant={setVariant} setActive={setActive}/> : null}
                    </div>
                </div>
            </CSSTransition>
        </Portal>        
    )
}

QuizModal.propTypes = {
    setActive:  PropTypes.func.isRequired,
    active:  PropTypes.bool.isRequired,
    items:  PropTypes.array.isRequired,
    loadingStatus:  PropTypes.string.isRequired
}

export default QuizModal;