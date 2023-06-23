import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import './alphabetFilter.scss';

const AlpabetFilter = ({setLetter, setOffset, wordsPerUpload, onClearLetter, switchToFirstPage}) => {

    const [switcher, setSwitcher] = useState(true);
    const [active, setActive] = useState('');

    const dispatch = useDispatch();

    const englishAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const russianAlphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я'];

    const handleClearLetter = () => {
        setActive('');
        onClearLetter()
    }

    const handleSelectLetter = (letter, index) => {
        setActive(index);
        setOffset(wordsPerUpload);
        dispatch(setLetter(letter));
        switchToFirstPage();
    }

    const handleSwitchAlphabet = () => {
        setActive('');
        setSwitcher(!switcher);
    }

    const elements = (array => {
        return array.map((item, i) => {
            return (
                <Fragment key={i}>
                    <div 
                        className={i === active ? 'alphabet__letter activeLetter' : 'alphabet__letter'} 
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
            <div className='alphabet__switcher' onClick={() => handleSwitchAlphabet()}>To {switcher ? 'russian' : 'english'} alphabet</div>
            <div className='alphabet__dot'>&bull;</div>
            {switcher ?elements(englishAlphabet) : elements(russianAlphabet)}
            <div className='alphabet__all' onClick={() => handleClearLetter()}>all words</div>
        </div>
    )
}

export default AlpabetFilter;