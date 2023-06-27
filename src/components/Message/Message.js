import { useEffect } from 'react';
import PropTypes from 'prop-types';
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
        // eslint-disable-next-line
    }, [showMessage]);

    return (
        <div className={showMessage ? "message active" : "message"}>
            <div style={{"color": `${color}`}}  className={showMessage ? "message__content active" : "message__content"}>
                {message}
            </div>
        </div>
    )       
}

Message.propTypes = {
    showMessage:  PropTypes.bool.isRequired,
    message:  PropTypes.string,
    setShowMessage:  PropTypes.func.isRequired,
    color:  PropTypes.string,
}

export default Message;