import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
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
    const [selectedWord, setSelectedWord] = useState({});
    const [searchedWord, setSearchedWord] = useState([]);

    const dispatch = useDispatch();
    const {isAuth} = useAuth();
    const navigate = useNavigate();

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

    const onDelete = (word) => {
        setSelectedWord(word)
    }

    const onDeleteWord = () => {
        const db = getDatabase();

        if (window.confirm('Are you sure?')) {
            dispatch(deleteWord(selectedWord.id));

            //const wordRef = ref(db, `${email.split('@')[0]}/words/${selectedId}`);
            const wordRef = ref(db, `words/${selectedWord.english}`);

            remove(wordRef)
                .then(() => {
                    console.log("location removed");
                });
        }
    }

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
    ) : (
        <>
            {navigate('/login')}
        </>
    ) */

    return (
        <>
            <Header/>
            <Navigation setSearchedWord={setSearchedWord}/>
            <div className="modifying">
                <SortPopup sortItems={sortItems}/>
                <Modification 
                    handleModifyModal={handleModifyModal}
                    handleAddModal={handleAddModal} 
                    onDeleteWord={onDeleteWord}
                    id={selectedWord.id}
                />
            </div>
            <Table 
                onDelete={onDelete} 
                searchedWord={searchedWord}
                />
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
                word={selectedWord}
            />
        </>
    )
}

export default HomePage;