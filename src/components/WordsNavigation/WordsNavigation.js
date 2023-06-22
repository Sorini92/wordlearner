import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TableSetting from '../TableSetting/TableSetting';
import "./wordsNavigation.scss";

const WordsNavigation = ({showSetting, setIsShowDate, setIsShowTicks, setReverseWords, setIsBlured, isShowDate, isShowTicks, reverseWords, isBlured, address}) => {

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
                to={`${item.to}?page=1`} 
                className={i === active ? `wordsNavigation__tab activeTab` : `wordsNavigation__tab`} 
                onClick={() => handleTabClick(i)}>
                    {item.text}
            </Link>
        )
    })

    return (
        <>
            <div className="wordsNavigation__line"></div>
            <div className="wordsNavigation">
                <div className="wordsNavigation__tabs">
                    {tabs}
                </div>
                {showSetting ? 
                <TableSetting
                    address={address}
                    setIsShowDate={setIsShowDate}
                    setIsShowTicks={setIsShowTicks}
                    setReverseWords={setReverseWords}
                    setIsBlured={setIsBlured}
                    isShowDate={isShowDate}
                    isShowTicks={isShowTicks}
                    reverseWords={reverseWords}
                    isBlured={isBlured}
                /> : null
                }
            </div>
        </>
    )
}

export default WordsNavigation;