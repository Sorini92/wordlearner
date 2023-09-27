import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from "react-transition-group";
import Portal from "../Portal/Portal";
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
        <Portal>
            <CSSTransition
                in={showMessage}
                timeout={{ enter: 2100, exit: 300 }}
                unmountOnExit
                classNames={"message"}
            >
                <div className="message">
                    <div style={{"color": `${color}`}}  className="message__content">
                        {message}
                    </div>
                </div>
            </CSSTransition>
        </Portal>
    )       
}

Message.propTypes = {
    showMessage:  PropTypes.bool.isRequired,
    message:  PropTypes.string,
    setShowMessage:  PropTypes.func.isRequired,
    color:  PropTypes.string,
}

export default Message;