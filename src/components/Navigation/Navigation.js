import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navigation.scss";

const Navigation = () => {

    const location = useLocation();
    const [active, setActive] = useState(0);

    const links = [
        {to: '/words', text: 'Words'},
        {to: '/sentences', text: 'Sentences'},
    ]

    useEffect(() => {
        const activeTab = links.findIndex((item) => item.to === `/${location.pathname.split('/')[1]}`);
        
        setActive(activeTab);
        // eslint-disable-next-line
    }, [location]);

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

export default Navigation;