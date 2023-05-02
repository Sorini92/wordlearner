import {useNavigate} from "react-router-dom";
import { useState } from "react";
import useAuth from '../hooks/use-auth';
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Table from "../components/Table/Table";
import SortPopup from "../components/SortPopup/SortPopup";
import Modification from "../components/Modification/Modification";
import Modal from "../components/Modal/Modal";
import {deleteWord, addWord} from '../store/slices/wordSlice';
import { useDispatch } from 'react-redux';
import { getDatabase, ref, remove } from "firebase/database";

const HomePage = () => {

    const [modalActive, setModalActive] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [selectedWord, setSelectedWord] = useState('');

    const dispatch = useDispatch();

    const sortItems = [
        { name: 'alphabet', type: 'alphabet'},
        { name: 'date', type: 'date'},        
    ];

    const handleModal = () => {
        setModalActive(!modalActive);
    }

    const onDelete = (id, selected) => {
        setSelectedId(id);
        setSelectedWord(selected);
    }

    const onDeleteWord = () => {
        const db = getDatabase();

        if (window.confirm('Are you sure?')) {
            dispatch(deleteWord(selectedId));

            const tasksRef = ref(db, `words/${selectedWord}`);

            remove(tasksRef).then(() => {
            console.log("location removed");
});
        }
    }

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
            <div className="modifying">
                <SortPopup sortItems={sortItems}/>
                <Modification/>
            </div>
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
            <div className="modifying">
                <SortPopup sortItems={sortItems}/>
                <Modification handleModal={handleModal} onDeleteWord={onDeleteWord}/>
            </div>
            <Table onDelete={onDelete}/>
            <Modal 
                active={modalActive} 
                setActive={setModalActive} 
                address={'words'}
                addWord={addWord}
            />
        </>
    )
}

export default HomePage;