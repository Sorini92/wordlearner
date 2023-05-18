import rightArrow from '../../resources/rightarrow.png';
import leftArrow from '../../resources/leftarrow.png';
import './flashCards.scss';


const FleshCards = () => {
    return (
        <div className='flashcards'>
            <div className='flashcards__close'>&times;</div>

            <div className='flashcards__wrapper'>
                <img src={leftArrow} alt='left arrow' className='flashcards__left'/>

                <div className='flashcards__cards'>
                    <div className='flashcards__front'><span>pen</span></div>
                    <div className='flashcards__back'><span>ручка</span></div>
                </div>

                <img src={rightArrow} alt='right arrow' className='flashcards__right'/>
            </div>

            <div className='flashcards__btns'>
                <button className='flashcards__btn'>To main page</button>
                <button className='flashcards__btn'>Reverse cards</button>
            </div>
        </div>
    )
}

export default FleshCards;