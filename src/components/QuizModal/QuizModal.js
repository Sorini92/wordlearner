import { useState } from 'react';
import FleshCards from '../FlashCards/FlashCards';
import cards from '../../resources/cards.jpg';
import quiz from '../../resources/quiz.png';
import './quizModal.scss';

const QuizModal = () => {

    const variantsArray = [
        {img: quiz, name: 'Quiz'},
        {img: cards, name: 'Cards'},
    ]

    const [active, setActive] = useState(true);
    const [variant, setVariant] = useState(''); 

    const handleClick = (index) => {
        setVariant(index)
    }
    
    const variants = variantsArray.map((item, i) => {
        return (
            <div 
                key={i} 
                className={variant === i ? 'quiz__variant activeVariant' : 'quiz__variant'} 
                onClick={() => handleClick(i)}
            >
                <img src={item.img} alt={item.name}/>
                <div>{item.name}</div>
            </div>
        )
    })

    return (
        <>
            <div className={active ? "quiz active" : "quiz"}>
                <div 
                    className={active ? "quiz__content active" : "quiz__content"} 
                    onClick={e => e.stopPropagation()}
                >
                    <FleshCards/>
                    {/* <div className='quiz__form'>
                        <div className='quiz__title'>Choose an Option</div>

                        <div className='quiz__variants'>
                            {variants}
                        </div>
                        
                        <div className='quiz__btns'>
                            <button 
                                className='quiz__btn' 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActive(false);
                                }}    
                            >Close
                            </button>
                            <button className='quiz__btn'>Next</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </>        
    )
}

export default QuizModal;