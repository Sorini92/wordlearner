import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword, signInWithRedirect,  getRedirectResult, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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

    const signInWithGoogle = () => {

        const auth = getAuth(); 

        const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)
            .then((result) => {               
                const user = result.user;

                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))

                navigate('/')
                // ...
            }).catch(() => alert('Invalid user'));
    }

    return (
        <div className='firstpage'>
            <Form 
                text='or' 
                to='register' 
                type='Login'  
                title='sign in' 
                handleClick={handleLogin}
                signInWithGoogle={signInWithGoogle}
            />
        </div>
    )
}

export default Login;