import {removeUser} from '../../store/slices/userSlice';
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import './header.scss';

const Header = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {email} = useAuth();

    const handleLogout = () => {
        const auth = getAuth();
    
        signOut(auth)
            .then(() => {
                dispatch(removeUser());
                navigate('/login')
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
        <div className='header__line'></div>
        <div className="header">
            <Link to={'/'} className="header__text">WORD LEARNER</Link>
            <div className='header__wrapper'>
                <div className='header__email'>{email}</div>
                <button 
                    className="header__logout" 
                    onClick={() => handleLogout()}
                >
                    Log out
                </button>
            </div>
        </div>
        </>
    )
}

export default Header;