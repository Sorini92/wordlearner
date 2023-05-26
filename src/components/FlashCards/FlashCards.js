import { useEffect, useState, Fragment, useRef } from 'react';
import rightArrow from '../../resources/rightarrow.png';
import leftArrow from '../../resources/leftarrow.png';
import './flashCards.scss';
import Spinner from '../Spinner/Spinner';

const FleshCards = ({setActive, setVariant, items, loadingStatus}) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [isReversedCard, setIsReversedCard] = useState(false);
    const [arrayOfCards, setArrayOfCards] = useState([]);
    const [indexOfCard, setIndexOfCard] = useState(0);
    const timerRef = useRef(null)

    useEffect(() => {
        let copiedArray = [...items];

        for (let i = copiedArray.length - 1; i > 0; i--) {
            let randomIndex = getRandomIndex(0, i);
            let temp = copiedArray[i];
            copiedArray[i] = copiedArray[randomIndex];
            copiedArray[randomIndex] = temp;
        }

        setArrayOfCards(copiedArray);
        // eslint-disable-next-line
    }, [items.length])

    useEffect(() => () => clearTimeout(timerRef.current), [indexOfCard])
    
    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    }

    const getRandomIndex = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleNextClick = () => {
        setIsFlipped(false);

        timerRef.current = setTimeout(() => {
            setIndexOfCard(indexOfCard + 1);
        }, 300);
    }

    const handlePrevClick = () => {
        setIsFlipped(false);

        timerRef.current = setTimeout(() => {
            setIndexOfCard(indexOfCard - 1);
        }, 300);
    }
    
    const cards =(array) => {
        if (array.length === 0) {
            return null;
        }
        return [array[indexOfCard]].map((item, i) => {
            return (
                <Fragment key={i}>
                    {!isReversedCard ? 
                        <>
                            <div className='flashcards__front'><span>{item.english}</span></div>
                            <div className='flashcards__back'><span>{item.russian}</span></div>
                        </>
                        :
                        <>
                            <div className='flashcards__front'><span>{item.russian}</span></div>
                            <div className='flashcards__back'><span>{item.english}</span></div>
                        </>
                    }
                </Fragment>
            )
        })
    }

    return (
        <div className='flashcards'>
            <div onClick={() => setActive(false)} className='flashcards__close'>&times;</div>

            <div className='flashcards__wrapper'>
                {indexOfCard === 0 ? 
                    <img src={leftArrow} alt='left arrow' className='flashcards__left'/> 
                    : 
                    <img onClick={handlePrevClick} src={leftArrow} alt='left arrow' className='flashcards__left'/>
                }

                <div className={isFlipped ? 'flashcards__cards flipped' : 'flashcards__cards'} onClick={handleCardClick}>
                    {loadingStatus === 'loading' ? <Spinner/> : cards(arrayOfCards)}
                </div>

                {indexOfCard === arrayOfCards.length ? 
                    <img src={rightArrow} alt='right arrow' className='flashcards__right'/> 
                    : 
                    <img onClick={handleNextClick} src={rightArrow} alt='right arrow' className='flashcards__right'/>
                }
            </div>

            <div className='flashcards__btns'>
                <button className='flashcards__btn' onClick={() => setVariant('')}>To main page</button>
                <button className='flashcards__btn' onClick={() => setIsReversedCard(!isReversedCard)}>Reverse cards</button>
            </div>
        </div>
    )
}

export default FleshCards;