import { useSelector, useDispatch } from "react-redux";
import {useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {setUser, removeUser} from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const {email, id} = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (user) => {

        if (user) {
            dispatch(
                setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                })
            );
        } else {
            dispatch(removeUser());
            navigate("/login")
        }
        });

        return () => unsubscribe();
    }, []);
    
    return {
        isAuth: !!email,
        id: id,
        email: email
    }
}

export default useAuth;