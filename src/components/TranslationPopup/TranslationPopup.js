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
        return array.slice(0, 5).map((item, i) => <div className='result' key={i}><b>{item.english}&nbsp;</b> - {item.russian}</div>)
    }

    const positionOfPopup = () => {
        let style;

        if (window.innerWidth/2 > position.left) {
            style = {
                top: position.top, 
                left: position.left, 
                transform: 'translate(0, -100%)'
            }
        } else {
            style = {
                top: position.top, 
                right: window.innerWidth - (position.left + position.width), 
                transform: 'translate(0, -100%)'
            }
        }
        
        return style
    }

    const positionOfArrow = () => {
        let style;

        if (window.innerWidth/2 > position.left) {
            style = {
                left: 2,
                bottom: -2,
                transform: 'rotate(73deg)'
            }
        } else {
            style = {
                right: 2,
                bottom: -2,
                transform: 'rotate(105deg)'
            }
        }
        
        return style
    }

    return (
        <div 
            className={visiblePopup ? "translationPopup active" : "translationPopup"} 
            style={positionOfPopup()}
        >
            {visiblePopup && (
                translation.length !== 0 ? 
                <div className="translationPopup__content">
                    {!isTranslationComplete ? 
                    <SmallSpinner/>
                    :
                    elements(translation)
                    }
                    {translation.length > 5 ? <div>...</div> : null}
                    <button title='Add item' onClick={() => handleAddWordModal()} className="translationPopup__btn"/>
                </div> : 
                <div className='translationPopup__content'>
                    <div className="translationPopup__text">Unknown word</div>
                    <button title='Add item' onClick={() => handleAddWordModal()} className="translationPopup__btn"/>
                </div>
            )}
            <div className='translationPopup__arrow' style={positionOfArrow()}></div>
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