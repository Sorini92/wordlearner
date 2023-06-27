import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './form.scss';

const Form = ({type, title, handleClick, to, text}) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className="form">

            <div className="form__type">{type}</div>
            <input
                className="form__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                className="form__input"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="password"
            />
            <div className="form__bottom">
                <button
                    className="form__btn"
                    onClick={() => handleClick(email, pass)}
                >
                    {title}
                </button>
            </div>
            <p className="form__p">
                {text} <Link className="form__link" to={`/${to}`}>{to}</Link>
            </p>
        </div>
    )
}

Form.propTypes = {
    type:  PropTypes.string.isRequired,
    title:  PropTypes.string.isRequired,
    handleClick:  PropTypes.func.isRequired,
    to:  PropTypes.string.isRequired, 
    text:  PropTypes.string.isRequired, 
}

export default Form;