import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import { database } from "../firebase";
import { deleteDoc, collection, doc } from "firebase/firestore"; 
import {deleteWord, addWord, modifyWord, fetchWords} from '../store/slices/wordSlice';
import useAuth from '../hooks/use-auth';
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Table from "../components/Table/Table";
import SortPopup from "../components/SortPopup/SortPopup";
import Modification from "../components/Modification/Modification";
import AddModal from "../components/AddModal/AddModal";
import ModifyModal from "../components/ModifyModal/ModifyModal";
import ReverseArrows from '../components/ReverseArrows/ReverseArrow';
import Pagination from '../components/Pagination/Pagination';
import AlpabetFilter from '../components/AlphabetFilter/AlphabetFilter';

const HomePage = () => {

    const {words} = useSelector(state => state.words);

    const [addModalActive, setAddModalActive] = useState(false);
    const [modifyModalActive, setModifyModalActive] = useState(false);
    const [selectedWord, setSelectedWord] = useState({});
    const [selectedLetter, setSelectedLetter] = useState('');
    const [searchedWord, setSearchedWord] = useState([]);
    const [reverseWords, setReverseWords] = useState(false);
    const [cuttedArrayOfWords, setCuttedArrayOfWords] = useState([]);
	const [offset, setOffset] = useState(34);

    const dispatch = useDispatch();
    const {isAuth} = useAuth();
    const navigate = useNavigate();

    const sortItems = [
        { name: 'english', type: 'english'},
        { name: 'russian', type: 'russian'},
        { name: 'date', type: 'date'},        
    ];

    const linkToWords = {
        firstUrl: 'users',
        secondUrl: 'user1',
        thirdUrl: 'words'
    }

    useEffect(() => {
        dispatch(fetchWords());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setCuttedArrayOfWords(words.slice(0, offset));
    }, [words, offset]);

    const addNewWords = () => {
		setOffset(offset + 34);
		setCuttedArrayOfWords([...cuttedArrayOfWords, ...words.slice(offset, offset + 34)]);
	}

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

        if (selectedWord.id !== undefined) {
            if (window.confirm('Are you sure?')) {
                dispatch(deleteWord(selectedWord.id));
    
                const colRef = collection(database, linkToWords.firstUrl, linkToWords.secondUrl, linkToWords.thirdUrl)
                deleteDoc(doc(colRef, selectedWord.id));
    
                setSelectedWord({})
            }
        } else {
            alert('Choose the word!')
        }
    }
    /* console.log(words.length)
    console.log(cuttedArrayOfWords.length) */
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
                <ReverseArrows 
                    setReverseWords={setReverseWords} 
                    reverseWords={reverseWords}
                />
                <Modification 
                    handleModifyModal={handleModifyModal}
                    handleAddModal={handleAddModal} 
                    onDeleteWord={onDeleteWord}
                    selected={selectedWord.id}
                />
            </div>
            <AlpabetFilter setSelectedLetter={setSelectedLetter}/>
            <Table 
                onDelete={onDelete} 
                searchedWord={searchedWord}
                reverseWords={reverseWords}
                words={words}
                cuttedArrayOfWords={cuttedArrayOfWords}
                selectedLetter={selectedLetter}
            />
            <Pagination 
                addNewWords={addNewWords} 
                words={words}
                cuttedArrayOfWords={cuttedArrayOfWords}
                searchedWord={searchedWord} 
                selectedLetter={selectedLetter}   
            />
            <AddModal 
                active={addModalActive} 
                setActive={setAddModalActive} 
                address={linkToWords}
                func={addWord}
                data={words}
            />
            <ModifyModal
                active={modifyModalActive} 
                setActive={setModifyModalActive} 
                address={linkToWords}
                func={modifyWord}
                data={words}
                selected={selectedWord}
            />
        </>
    )
}

export default HomePage;