import { NavLink } from "react-router-dom";
import { useState } from "react";
import PropTypes from 'prop-types';
import "./navigation.scss";

const Navigation = () => {

    const [active, setActive] = useState(0);

    const links = [
        {to: '/words', text: 'Words'},
        {to: '/sentences', text: 'Sentences'},
    ]

    const handleTabClick = (index) => {
        setActive(index);
    };
    
    const tabs = links.map((item, i) => {
        return (
            <NavLink 
                key={i} 
                to={`${item.to}`} 
                className={i === active ? `navigation__tab activeTab` : `navigation__tab`} 
                onClick={() => handleTabClick(i)}>
                    {item.text}
            </NavLink>
        )
    })

    return (
        <>
            <div className="navigation__line"></div>
            <div className="navigation">
                <div className="navigation__tabs">
                    {tabs}
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