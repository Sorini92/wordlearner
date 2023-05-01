import {removeUser} from '../../store/slices/userSlice';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from '../../hooks/use-auth';
import './header.scss';

const Header = () => {
    
    const dispatch = useDispatch();

    const {email} = useAuth();

    return (
        <>
        <div className='header__line'></div>
        <div className="header">
            <Link to={'/'} className="header__text">WORD LEARNER</Link>
            <div className='header__wrapper'>
                <div className='header__email'>{email}</div>
                <button 
                    className="header__logout" 
                    onClick={() => dispatch(removeUser())}
                >
                    Log out
                </button>
            </div>
        </div>
        </>
    )
}

export default Header;