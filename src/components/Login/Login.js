import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {setUser} from '../../store/slices/userSlice';

const Login = () => {

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
            .catch(() => alert('Invalid user'))

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
                signInWithGoogle={signInWithGoogle}
            />
        </div>
    )
}

export default Login;