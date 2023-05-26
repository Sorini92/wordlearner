import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import scope from '../../resources/scope.svg';
import "./navigation.scss";

const Navigation = ({setSearched, setOffset, numberPerUpload}) => {

    const location = useLocation();
    const [text, setText] = useState('');
    const [active, setActive] = useState(0);

    const links = [
        {to: '/words', text: 'Words'},
        {to: '/favorites', text: 'Favorites'},
        {to: '/sentences', text: 'Sentences'},
        {to: '/irregular', text: 'Irregular Verbs'},
    ]

    useEffect(() => {
        const activeTab = links.findIndex((item) => item.to === location.pathname);
        
        setActive(activeTab);
        // eslint-disable-next-line
    }, [location]);

    const handleSearch = (value) => {
        setText(value)
        setSearched(value)
    }

    const clearSearch = () => {
        setText('')
        setSearched('')
        setOffset(numberPerUpload)
    }

    const handleTabClick = (index) => {
        setActive(index);
      };

    const tabs = links.map((item, i) => {
        return (
            <Link 
                key={i} 
                to={item.to} 
                className={i === active ? `navigation__tab activeTab` : `navigation__tab`} 
                onClick={() => handleTabClick(i)}>
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
                        value={text}
                        className="navigation__search"
                        placeholder="Search"
                        onChange={(e) => handleSearch(e.target.value.replace(/[^a-z, а-я]/g, ''))}
                    />
                    <img src={scope} className="navigation__search-scope" alt="scope"/>
                    {text.length > 0 ? 
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