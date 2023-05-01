import {useNavigate} from "react-router-dom";
import useAuth from '../hooks/use-auth';
import { useEffect } from "react";
import Header from "../components/Header/Header";
import Navigation from "../components/navigation/Navigation";
import Table from "../components/Table/Table";

const HomePage = () => {

    const {isAuth} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuth) {
            navigate('/login')
        }
    })

    return isAuth ? (
        <>
            <Header/>
            <Navigation/>
            <Table/>
        </>
    ) : (
        <>
            {navigate('/login')}
        </>
    )
}

export default HomePage;