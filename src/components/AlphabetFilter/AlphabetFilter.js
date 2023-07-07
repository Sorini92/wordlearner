import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import all from '../../resources/all.png';
import ru from '../../resources/ru.png';
import en from '../../resources/en.png';
import arrow from '../../resources/arrow.png';
import './alphabetFilter.scss';

const AlpabetFilter = ({searchedWord, setLetter, letter, setOffset, wordsPerUpload, onClearLetter, switchToFirstPage, items}) => {

    const [switcher, setSwitcher] = useState(true);

    const dispatch = useDispatch();

    const englishAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const russianAlphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я'];

    const handleSelectLetter = (item) => {
        setOffset(wordsPerUpload);
        dispatch(setLetter(item));
        switchToFirstPage();
    }

    const handleSwitchAlphabet = () => {
        setSwitcher(!switcher);
    }
    
    const elements = (array => {
        return array.map((item, i) => {
            return (
                <Fragment key={i}>
                    <div 
                        className={item === letter ? 'alphabet__letter activeLetter' : 'alphabet__letter'} 
                        onClick={() => handleSelectLetter(item, i)}
                    >
                        {item}
                    </div>
                    <div className='alphabet__dot'>&bull;</div>
                </Fragment>
            )
        })
    })
    
    return (
        <div className='alphabet'>
            {searchedWord.length === 0 && items.length !== 0 ? 
            <div className='alphabet__wrapper'>
                <div className='alphabet__switcher' onClick={() => handleSwitchAlphabet()}>
                    {switcher ? 
                    <>
                        <img src={en} alt="english alphabet icon"/>
                        <img src={arrow} alt="arrow"/>
                        <img src={ru} alt="russian alphabet icon"/>
                    </>  :
                    <>
                        <img src={ru} alt="russian alphabet icon"/>
                        <img src={arrow} alt="arrow"/>
                        <img src={en} alt="english alphabet icon"/>
                    </> 
                    }
                </div>
                <div className='alphabet__dot'>&bull;</div>
                {switcher ? elements(englishAlphabet) : elements(russianAlphabet)}
                <div className='alphabet__all' onClick={() => onClearLetter()}>
                    <img src={all} alt="all words"/>
                </div>
            </div> : null
            }
        </div>
    )
}

AlpabetFilter.propTypes = {
    setLetter:  PropTypes.func.isRequired,
    setOffset:  PropTypes.func.isRequired,
    wordsPerUpload:  PropTypes.number.isRequired,
    onClearLetter:  PropTypes.func.isRequired,
    switchToFirstPage:  PropTypes.func.isRequired, 
}

export default AlpabetFilter;