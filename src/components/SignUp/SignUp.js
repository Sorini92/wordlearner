import Form from '../Form/Form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {setUser} from '../../store/slices/userSlice';

const SignUp = () => {
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
            .catch(console.error)
    }

    return (
        <div className='firstpage'>
            <Form text={'Already have an account?'} to={'login'} type='Register' title="register" handleClick={handleRegister}/>
        </div>
    )
}

export default SignUp;