import Form from '../Form/Form';
import {useEffect} from "react";
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {setUser} from '../../store/slices/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (email, password) => {
        const auth = getAuth();  

        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                navigate('/')
            })
            .catch(() => alert('Invalid user'))
    }

    return (
        <div className='firstpage'>
            <Form text={'or'} to={'register'} type='Login' title="sign in" handleClick={handleLogin}/>
        </div>
    )
}

export default Login;