import { useEffect } from 'react';
import './translationPopup.scss';

const TranslationPopup = ({position, setVisiblePopup, visiblePopup, selectedWord}) => {
    
    const handleOutsideClick = (event) => {
        if (event.target.tagName !== "SPAN") {
            setVisiblePopup(false);
        }
    };
    
    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div 
            className={visiblePopup ? "translationPopup active" : "translationPopup"} 
            style={{top: position.top, left: position.left + position.width/2, transform: 'translate(-50%, -100%)'}}
        >
            {visiblePopup && (
                selectedWord ? 
                <div className="translationPopup__content">{selectedWord}</div> : 
                <div className='translationPopup__content'>
                    <div className="translationPopup__text">Unknown word</div>
                    <button className="translationPopup__btn">add</button>
                </div>
            )}
            <div className='translationPopup__arrow'></div>
        </div>
    )
}

export default TranslationPopup;