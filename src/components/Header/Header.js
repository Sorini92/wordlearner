import { useState, useRef } from 'react';
import {removeUser} from '../../store/slices/userSlice';
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import extension from './WordLearnerExtension.zip';
import './header.scss';

const Header = () => {

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const selectRef = useRef();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {email} = useAuth();

    const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

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
            
        setDropdownVisible(false);
    };

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <>
        <div className='header__line'></div>
        <div className="header">
            <Link to={'/'} className="header__text">WORD LEARNER</Link>
            <div className='header__wrapper'>
                {email ? 
                <>
                    <div className='header__email'>{email}</div>

                    {isMobile ? 
                    <button 
                        className="header__logout" 
                        onClick={() => handleLogout()}
                    >
                        Log out
                    </button> 
                    :
                    <div className="dropdown">
                        <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="dropdown__label">Profile</div>

                            {isDropdownVisible && (
                                <div ref={selectRef} className="dropdown__popup">
                                    <ul>
                                        <li title='Extension with possibility of adding words'>
                                            <a href={extension} download>Download extension</a>
                                        </li>
                                        <li title='logout' onClick={() => handleLogout()}>
                                            Log out
                                        </li>
                                    </ul>
                                </div>
                            )}
                            
                        </div>
                    </div> 
                }

                </>: 
                null}
            </div>
        </div>
        </>
    )
}

export default Header;