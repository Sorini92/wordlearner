import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import scope from '../../resources/scope.svg';
import "./navigation.scss";

const Navigation = ({setSearched, setOffset, numberPerUpload, setFilteredArrayLength, letter, items}) => {

    const [text, setText] = useState('');
    const [active, setActive] = useState(0);

    const location = useLocation();

    const links = [
        {to: '/words', text: 'Words'},
        {to: '/sentences', text: 'Sentences'},
    ]

    useEffect(() => {
        const activeTab = links.findIndex((item) => item.to === `/${location.pathname.split('/')[1]}`);

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

        if (setFilteredArrayLength !== undefined) {
            setFilteredArrayLength(0)
        }
    }

    const handleTabClick = (index) => {
        setActive(index);
    };

    const tabs = links.map((item, i) => {
        return (
            <Link 
                key={i} 
                to={`${item.to}`} 
                className={i === active ? `navigation__tab activeTab` : `navigation__tab`} 
                onClick={() => handleTabClick(i)}>
                    {item.text}
            </Link>
        )
    })

    const IsLetterExist = letter ? letter.length === 0 && items.length !== 0 : items.length !== 0

    return (
        <>
            <div className="navigation__line"></div>
            <div className="navigation">
                <div className="navigation__tabs">
                    {tabs}
                </div>

                <div className="navigation__wrapper">
                    {IsLetterExist ? 
                    <>
                         <input 
                            value={text}
                            className="navigation__search"
                            placeholder="Search"
                            onChange={(e) => handleSearch(e.target.value.replace(/[^a-z а-я]/g, ''))}
                        />
                        <img src={scope} className="navigation__search-scope" alt="scope"/>
                        {text.length > 0 ? 
                        <div
                            className="navigation__searchclear"
                            onClick={() => clearSearch('')}
                        >
                            &times;
                        </div> : null}
                    </> : null
                    }
                </div>
            </div>
        </>
    )
}

Navigation.propTypes = {
    setSearched:  PropTypes.func.isRequired,
    setOffset:  PropTypes.func.isRequired,
    numberPerUpload:  PropTypes.number.isRequired,
    setFilteredArrayLength:  PropTypes.func
}

export default Navigation;