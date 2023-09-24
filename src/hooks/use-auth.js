import { useSelector, useDispatch } from "react-redux";
import {useEffect} from "react";
import { getAuth, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import {setUser, removeUser} from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const {email, id} = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        
        const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            
            if (user) {
                if (isMobile) {
                    getRedirectResult(auth)
                        .then((result) => {
                            
                            if (result) {
                                const user = result.user;

                                dispatch(setUser({
                                    email: user.email,
                                    id: user.uid,
                                    token: user.accessToken,
                                }))
                                
                                navigate('/')
                            }
                            
                        })
                } 
                
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
        // eslint-disable-next-line
    }, []);
    
    return {
        isAuth: !!email,
        id: id,
        email: email,
    }
}

export default useAuth;