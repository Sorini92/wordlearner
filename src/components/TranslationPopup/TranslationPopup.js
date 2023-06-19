import { useEffect, useRef, useState } from 'react';
import './translationPopup.scss';

const TranslationPopup = ({setVisiblePopup, visiblePopup}) => {
    
    const selectRef = useRef();

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        
        if (!path.includes(selectRef.current)) {
          setVisiblePopup(false);
        }
    };

    const onSelectItem = (name) => {

    };

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div ref={selectRef} className="translationPopup">
            {visiblePopup && (
                <div className="translationPopup__popup">
                    <div className="translationPopup__content">sadsad</div>
                </div>
            )}
        </div>
    )
}

export default TranslationPopup;