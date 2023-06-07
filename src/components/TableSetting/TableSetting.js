import { useState, useRef, useEffect, Fragment } from 'react';
import './tableSetting.scss';
import settingImg from '../../resources/setting.png';

const TableSetting = ({setIsShowDate, setIsShowTicks, setReverseWords, setIsBlured, isShowDate, isShowTicks, reverseWords, isBlured}) => {
    
    const [visiblePopup, setVisiblePopup] = useState(false);
    
    const selectRef = useRef();

    const items = [
        {name: 'Show date', switcher: isShowDate, setFunc: setIsShowDate},
        {name: 'Multiple selection', switcher: isShowTicks, setFunc: setIsShowTicks},
        {name: 'Reverse words', switcher: reverseWords, setFunc: setReverseWords},
        {name: 'Blur right side', switcher: isBlured, setFunc: setIsBlured},
    ]
        
    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup);
    };

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        
        if (!path.includes(selectRef.current)) {
          setVisiblePopup(false);
        }
    };

    const onSelectItem = (name) => {

    };

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    const elements = (array) => {
        
        return array.map((item, index) => (
            <Fragment key={`${item.name}_${index}`}>
                {item.switcher !== undefined ? 
                <div 
                    className='tableSetting__items' 
                    onClick={() => onSelectItem(item.name)} 
                >
                    <div className='tableSetting__name'>
                        {item.name}
                    </div>
                    <div className="switcher" onClick={() => item.setFunc(!item.switcher)}>
                        <div className={item.switcher ? "switcher__true" : "switcher__false"}/>
                    </div>
                </div> :
                null
                }
            </Fragment>
        ))
    }

    return (
        <div ref={selectRef} className="tableSetting">
            <div className="tableSetting__label">
                <img src={settingImg} alt='setting img' onClick={toggleVisiblePopup}/>
            </div>
            {visiblePopup && (
                <div className="tableSetting__popup">
                    <div className='tableSetting__wrapper'>
                        {items && elements(items)}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TableSetting;