import { useState, useRef, useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import './selectPopup.scss';

const SelectPopup = ({items, active, textForSelectPopup, dispatchFunction, activeTypeChanged, switchToFirstPage}) => {
    
    const [visiblePopup, setVisiblePopup] = useState(false);
    
    const selectRef = useRef();
    
    const dispatch = useDispatch();
    
    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup);
    };

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        
        if (!path.includes(selectRef.current)) {
          setVisiblePopup(false);
        }
    };

    const onSelectItem = (name) => {
        if (!!activeTypeChanged) {
            dispatch(activeTypeChanged(name))  
            dispatch(dispatchFunction(name))
            setVisiblePopup(false);
        } else {
            dispatch(dispatchFunction(name))
            switchToFirstPage()
            setVisiblePopup(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
        
        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const elements = (array) => {
         return array.map((item, index) => (
            <li
                onClick={() => onSelectItem(item.name)}
                className=''
                key={`${item.name}_${index}`}>
                {item.name}
            </li>
        ))
    }

    return (
        <div ref={selectRef} className="sort">
            <div className="sort__label">
                <svg
                className={visiblePopup ? 'rotated' : ''}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                />
                </svg>
                <b>{textForSelectPopup}</b>
                <span onClick={toggleVisiblePopup}>{active}</span>
            </div>
            {visiblePopup && (
                <div className="sort__popup">
                <ul>
                    {items && elements(items)}
                </ul>
                </div>
            )}
        </div>
    )
}

export default SelectPopup;