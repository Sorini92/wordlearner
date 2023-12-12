import { useState } from "react";

import scope from '../../resources/scope.svg';
import './searchInput.scss'

const SearchInput = ({setSearched, setOffset, numberPerUpload, setFilteredArrayLength, letter, items}) => {
    const [text, setText] = useState('');

    const handleSearch = (value) => {
        setText(value)
        setSearched(value.toLowerCase())
    }
    
    const clearSearch = () => {
        setText('')
        setSearched('')
        setOffset(numberPerUpload)

        if (setFilteredArrayLength !== undefined) {
            setFilteredArrayLength(0)
        }
    }

    const IsLetterExist = letter ? letter.length === 0 && items.length !== 0 : items.length !== 0
    
    return (
        <div className="searching">
            {IsLetterExist ? 
                <div className="searching__search">
                    <input 
                        value={text}
                        className="searching__input"
                        name="search"
                        placeholder="Search"
                        onChange={(e) => handleSearch(e.target.value.replace(/[^a-z а-я A-Z А-Я]/g, ''))}
                    />
                    <img src={scope} className="searching__input-scope" alt="scope"/>
                    {text.length > 0 ? 
                    <div
                        title="Clear"
                        className="searching__input-searchclear"
                        onClick={() => clearSearch('')}
                    >
                        &times;
                    </div> : null}
                </div> : null
            }
        </div>
    )
}

export default SearchInput;