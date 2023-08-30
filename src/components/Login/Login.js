import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {setUser} from '../../store/slices/userSlice';
import { useState } from 'react';

const Login = () => {

    const [isError, setIsError] = useState({
        error: false,
        message: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(); 

    const handleLogin = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                
                navigate('/')
            })
            .catch((e) => {
                const errorMessage = e.message.split('/')[1].slice(0, -2).split('-').join(' ')
                const errorMessageWithUpperCase = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)

                setIsError({
                    error: true,
                    message: errorMessageWithUpperCase
                })
            })

    }

    const signInWithGoogle = () => {

        const provider = new GoogleAuthProvider();

        const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
          
        if (!isMobile) {
            signInWithPopup(auth, provider)
                .then((result) => {      
                        
                    const user = result.user;

                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.accessToken,
                    }))
                    
                    navigate('/')
                })
                .catch(() => alert('Invalid user'));
        } else {
            signInWithRedirect(auth, provider)
        }
    }
    
    return (
        <div className='firstpage'>
            <Form 
                text='or' 
                to='register' 
                type='Login'  
                title='sign in' 
                handleClick={handleLogin}
                isError={isError}
                signInWithGoogle={signInWithGoogle}
            />
        </div>
    )
}

export default Login;