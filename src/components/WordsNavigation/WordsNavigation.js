import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./wordsNavigation.scss";

const WordsNavigation = () => {

    const location = useLocation();
    const [active, setActive] = useState(0);

    const links = [
        {to: '/words', text: 'All words'},
        {to: '/words/favorites', text: 'Favorites'},
        {to: '/words/irregular', text: 'Irregular Verbs'},
    ]

    useEffect(() => {
        const activeTab = links.findIndex((item) => item.to === location.pathname);
        
        setActive(activeTab);
        // eslint-disable-next-line
    }, [location]);

    const handleTabClick = (index) => {
        setActive(index);
    };

    const tabs = links.map((item, i) => {
        return (
            <Link 
                key={i} 
                to={`${item.to}`} 
                className={i === active ? `wordsNavigation__tab activeWordsTab` : `wordsNavigation__tab`} 
                onClick={() => handleTabClick(i)}>
                    {item.text}
            </Link>
        )
    })

    return (
        <> 
            {location.pathname.split('/')[1] === "words" ? 
                <>
                    <div className="wordsNavigation__line"></div>
                    <div className="wordsNavigation">
                        <div className="wordsNavigation__tabs">
                            {tabs}
                        </div>
                    </div>
                </> 
                : null
            }
        </>
    )   
}

export default WordsNavigation;