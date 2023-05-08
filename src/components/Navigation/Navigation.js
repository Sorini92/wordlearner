import { Link } from "react-router-dom";
import { useState } from "react";
import scope from '../../resources/scope.svg';
import "./navigation.scss";

const Navigation = ({setSearchedWord, setOffset, wordsPerUpload}) => {

    const [word, setWord] = useState('');
    const [active, setActive] = useState(0);
    
    const links = [
        {to: '/words', text: 'Words'},
        {to: '/sentences', text: 'Sentences'},
    ]

    const handleClick = (index) => {
        setActive(index);
    };  

    const handleSearch = (value) => {
        setWord(value)
        setSearchedWord(value)
    }

    const clearSearch = () => {
        setWord('')
        setSearchedWord('')
        setOffset(wordsPerUpload)
    }

    const tabs = links.map((item, i) => {
        return (
            <Link 
                key={i} 
                to={item.to} 
                className={i === active ? `navigation__tab activeTab` : `navigation__tab`} 
                onClick={() => handleClick(i)}>
                    {item.text}
            </Link>
        )
    })

    return (
        <>
            <div className="navigation__line"></div>
            <div className="navigation">
                <div className="navigation__tabs">
                    {tabs}
                </div>
                <div className="navigation__wrapper">
                    <input 
                        value={word}
                        className="navigation__search"
                        placeholder="Search"
                        onChange={(e) => handleSearch(e.target.value.replace(/[^a-z, а-я]/g, ''))}
                    />
                    <img src={scope} className="navigation__search-scope" alt="scope"/>
                    {word.length > 0 ? 
                    <div
                        className="navigation__searchclear"
                        onClick={() => clearSearch('')}
                    >
                        &times;
                    </div> : 
                    null}
                </div>
            </div>
        </>
    )
}

export default Navigation;