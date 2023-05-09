import { useState, useEffect } from 'react';
import './arrowScrollUp.scss';

const ArrowScrollUp = () => {

    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 500) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handlerScrollUp = () => {
      if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
      }
    }
    //&#9650;
    return (
        <div className={ showScroll ? 'scrollup' : 'show'} onClick={handlerScrollUp}></div>
    );
}

export default ArrowScrollUp;