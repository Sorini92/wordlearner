import {useNavigate} from "react-router-dom";
import useAuth from '../hooks/use-auth';
import { useEffect } from "react";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Table from "../components/Table/Table";
import SortPopup from "../components/SortPopup/SortPopup";

const HomePage = () => {

    const sortItems = [
        { name: 'Date', type: 'date'},
        { name: 'Alphabet', type: 'alphabet'},
    ];

    const {isAuth} = useAuth();

    const navigate = useNavigate();

    /* useEffect(() => {
        if(!isAuth) {
            navigate('/login')
        }
    })

    return isAuth ? (
        <>
            <Header/>
            <Navigation/>
            <SortPopup sortItems={sortItems}/>
            <Table/>
        </>
    ) : (
        <>
            {navigate('/login')}
        </>
    ) */

    return (
        <>
            <Header/>
            <Navigation/>
            <SortPopup sortItems={sortItems}/>
            <Table/>
        </>
    )
}

export default HomePage;