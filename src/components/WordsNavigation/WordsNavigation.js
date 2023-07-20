import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import TableSetting from '../TableSetting/TableSetting';
import "./wordsNavigation.scss";

const WordsNavigation = ({showSetting, setIsShowDate, setIsShowTicks, setIsReverseWords, setIsBlured, isShowDate, isShowTicks, isReverseWords, isBlured, address}) => {

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
            <div className="wordsNavigation__line"></div>
            <div className="wordsNavigation">
                <div className="wordsNavigation__tabs">
                    {tabs}
                    <span className="tabsIndicator"/>
                </div>
                {showSetting ? 
                <TableSetting
                    address={address}
                    setIsShowDate={setIsShowDate}
                    setIsShowTicks={setIsShowTicks}
                    setIsReverseWords={setIsReverseWords}
                    setIsBlured={setIsBlured}
                    isShowDate={isShowDate}
                    isShowTicks={isShowTicks}
                    isReverseWords={isReverseWords}
                    isBlured={isBlured}
                /> : null
                }
            </div>
        </>
    )   
}

WordsNavigation.propTypes = {
    showSetting:  PropTypes.bool.isRequired, 
    address:  PropTypes.object.isRequired,
    setIsShowDate:  PropTypes.func,
    setIsShowTicks:  PropTypes.func,
    setIsReverseWords:  PropTypes.func,
    setIsBlured:  PropTypes.func, 
    isReverseWords:  PropTypes.bool, 
    isShowDate:  PropTypes.bool,
    isShowTicks:  PropTypes.bool, 
    isBlured:  PropTypes.bool, 
}

export default WordsNavigation;