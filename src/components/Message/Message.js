import { useEffect, useState } from 'react';
import './message.scss';

const Message = ({showMessage, message, setShowMessage, color}) => {

    useEffect(() => {
        if (showMessage) {
            setTimeout(() => {
                setShowMessage(false)
            }, 1000);
        }
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