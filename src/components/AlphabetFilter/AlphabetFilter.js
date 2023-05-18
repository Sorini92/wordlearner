import { Fragment, useState } from 'react';
import './alphabetFilter.scss';

const AlpabetFilter = ({setSelectedLetter, setOffset, wordsPerUpload}) => {

    const [switcher, setSwitcher] = useState(true);
    const [active, setActive] = useState('');

    const englishAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const russianAlphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я'];

    const handleClearLetter = () => {
        setActive('');
        setSelectedLetter('');
        setOffset(wordsPerUpload);
    }

    const handleSelectLetter = (letter, index) => {
        setActive(index);
        setOffset(wordsPerUpload);
        setSelectedLetter(letter);
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