import { useEffect, useState } from 'react';
import './message.scss';

const Message = ({showMessage, message, setShowMessage, color}) => {

    useEffect(() => {
        let timer;
        if (showMessage) {
            timer = setTimeout(() => {
                setShowMessage(false)
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showMessage]);

    return (
        <div className={showMessage ? "message active" : "message"}>
            <div style={{"color": `${color}`}}  className={showMessage ? "message__content active" : "message__content"}>
                {message}
            </div>
        </div>
    )
        
}

export default Message;