import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {getDatabase, ref, remove} from "firebase/database";
import {deleteWord, addWord, modifyWord} from '../store/slices/wordSlice';
import useAuth from '../hooks/use-auth';
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Table from "../components/Table/Table";
import SortPopup from "../components/SortPopup/SortPopup";
import Modification from "../components/Modification/Modification";
import AddModal from "../components/AddModal/AddModal";
import ModifyModal from "../components/ModifyModal/ModifyModal";

const HomePage = () => {

    const [addModalActive, setAddModalActive] = useState(false);
    const [modifyModalActive, setModifyModalActive] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    const dispatch = useDispatch();

    const sortItems = [
        { name: 'english', type: 'english'},
        { name: 'russian', type: 'russian'},
        { name: 'date', type: 'date'},        
    ];

    const handleAddModal = () => {
        setAddModalActive(!addModalActive);
    }

    const handleModifyModal = () => {
        setModifyModalActive(!modifyModalActive);
    }

    const onDelete = (id) => {
        setSelectedId(id);
    }

    const onDeleteWord = () => {
        const db = getDatabase();

        if (window.confirm('Are you sure?')) {
            dispatch(deleteWord(selectedId));

            const tasksRef = ref(db, `words/${selectedId}`);

            remove(tasksRef)
                .then(() => {
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
                <Modification 
                    handleModifyModal={handleModifyModal}
                    handleAddModal={handleAddModal} 
                    onDeleteWord={onDeleteWord}
                    id={selectedId}
                />
            </div>
            <Table onDelete={onDelete}/>
            <AddModal 
                active={addModalActive} 
                setActive={setAddModalActive} 
                address={'words'}
                func={addWord}
            />
            <ModifyModal
                active={modifyModalActive} 
                setActive={setModifyModalActive} 
                address={'words'}
                func={modifyWord}
                id={selectedId}
            />
        </>
    )
}

export default HomePage;