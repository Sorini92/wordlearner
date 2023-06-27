import { useEffect } from 'react';
import PropTypes from 'prop-types';
import SmallSpinner from '../SmallSpinner/SmallSpinner';
import './translationPopup.scss';

const TranslationPopup = ({translation, position, setVisiblePopup, visiblePopup, isTranslationComplete, handleAddWordModal}) => {
    
    const handleOutsideClick = (event) => {
        if (event.target.tagName !== "SPAN") {
            setVisiblePopup(false);
        }
    };
    
    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
        
        return () => document.body.removeEventListener('click', handleOutsideClick);
        // eslint-disable-next-line
    }, []);

    const elements = (array) => {
        return array.map((item, i) => <div className='result' key={i}><b>{item.english}&nbsp;</b> - {item.russian}</div>)
    }
    
    return (
        <div 
            className={visiblePopup ? "translationPopup active" : "translationPopup"} 
            style={{top: position.top, left: position.left + position.width/2, transform: 'translate(-50%, -100%)'}}
        >
            {visiblePopup && (
                translation.length !== 0 ? 
                <div className="translationPopup__content">
                    {!isTranslationComplete ? 
                    <SmallSpinner/>
                    :
                    elements(translation)
                    }
                    <button onClick={() => handleAddWordModal()} className="translationPopup__btn"/>
                </div> : 
                <div className='translationPopup__content'>
                    <div className="translationPopup__text">Unknown word</div>
                    <button onClick={() => handleAddWordModal()} className="translationPopup__btn"/>
                </div>
            )}
            <div className='translationPopup__arrow'></div>
        </div>
    )
}

TranslationPopup.propTypes = {
    translation:  PropTypes.array.isRequired,
    position:  PropTypes.object.isRequired,
    setVisiblePopup:  PropTypes.func.isRequired,
    visiblePopup:  PropTypes.bool.isRequired,
    isTranslationComplete:  PropTypes.bool.isRequired, 
    handleAddWordModal:  PropTypes.func.isRequired, 
}

export default TranslationPopup;