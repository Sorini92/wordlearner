import Form from '../Form/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {setUser} from '../../store/slices/userSlice';

const SignUp = () => {

    const [isError, setIsError] = useState({
        error: false,
        message: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleRegister = (email, password) => {
        const auth = getAuth();
        
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                
                navigate('/')
            })
            .catch(e => {
                const errorMessage = e.message.split('/')[1].slice(0, -2).split('-').join(' ')
                const errorMessageWithUpperCase = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)

                setIsError({
                    error: true,
                    message: errorMessageWithUpperCase
                })
            })
    }

    return (
        <div className='firstpage'>
            <Form 
                text={'Already have an account?'} 
                to={'login'} type='Register' 
                title="register" 
                isError={isError}
                handleClick={handleRegister}/>
        </div>
    )
}

export default SignUp;