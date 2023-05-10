import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import database from "../firebase";
import { deleteDoc, collection, doc } from "firebase/firestore"; 
import {deleteWord, addWord, modifyWord, fetchWords, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage} from '../store/slices/wordSlice';
import useAuth from '../hooks/use-auth';
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Table from "../components/Table/Table";
import SelectPopup from "../components/SelectPopup/SelectPopup";
import Modification from "../components/Modification/Modification";
import AddModal from "../components/AddModal/AddModal";
import ModifyModal from "../components/ModifyModal/ModifyModal";
import ReverseArrows from '../components/ReverseArrows/ReverseArrow';
import Pagination from '../components/Pagination/Pagination';
import AlpabetFilter from '../components/AlphabetFilter/AlphabetFilter';
import Message from '../components/Message/Message';
import ArrowScrollUp from '../components/ArrowScrollUp/ArrowScrollUp';

const HomePage = () => {

    const {words, wordsPerUpload, sortType, currentPage} = useSelector(state => state.words);

    const [addModalActive, setAddModalActive] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState({});
    const [modifyModalActive, setModifyModalActive] = useState(false);
    const [selectedWord, setSelectedWord] = useState({});
    const [selectedLetter, setSelectedLetter] = useState('');
    const [searchedWord, setSearchedWord] = useState([]);
    const [reverseWords, setReverseWords] = useState(false);
    const [cuttedArrayOfWords, setCuttedArrayOfWords] = useState([]);
    const [filteredArreyLength, setFilteredArreyLength] = useState(0);
	const [offset, setOffset] = useState(30);

    const dispatch = useDispatch();
    const {isAuth} = useAuth();
    const navigate = useNavigate();

    const sortItems = [
        { name: 'english'},
        { name: 'russian'},
        { name: 'date'},        
    ];

    const numberOfWordsPerPage = [
        { name: 30},
        { name: 60},
        { name: 90},        
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
        dispatch(setPage(1))
    }, [wordsPerUpload]);

    /* useEffect(() => {
        if(cuttedArrayOfWords.length !== wordsPerUpload) {
            dispatch(setPage(cuttedArrayOfWords.length/wordsPerUpload))
        }
    }, [cuttedArrayOfWords.length]);
    console.log(cuttedArrayOfWords.length); */
    useEffect(() => {
        let lastIndex = currentPage*wordsPerUpload;
        let firstIndex = lastIndex - wordsPerUpload;
        setOffset(wordsPerUpload);
        setCuttedArrayOfWords(words.slice(firstIndex, lastIndex));
    }, [words, wordsPerUpload, currentPage]);

    /* useEffect(() => {
        if (currentPage === 1) {
            setOffset(wordsPerUpload);
            setCuttedArrayOfWords(words.slice(0, wordsPerUpload));
        } else {
            let lastIndex = currentPage*wordsPerUpload;
            let firstIndex = lastIndex - wordsPerUpload;
            setOffset(wordsPerUpload);
            setCuttedArrayOfWords(words.slice(firstIndex, lastIndex));
        }
        
    }, [currentPage]); */
    /* console.log(cuttedArrayOfWords, 'cuttedArrayOfWords');
    console.log(wordsPerUpload, "wordsPerUpload");
    console.log(offset, 'offset'); */
    /* useEffect(() => {
        setCuttedArrayOfWords(words.slice(0, offset));
    }, [words, offset]); */

    const filteredElements = (array) => {
        let data = [];
        if (searchedWord.length > 0) {
            if (!!searchedWord.match(/[^а-я]/g)) {
                data = array.filter(item => item.english.toLowerCase().includes(searchedWord))
            } else {
                data = array.filter(item => item.russian.toLowerCase().includes(searchedWord))
            }
        } else {
            if (selectedLetter.length !== 0) {
                if (!!selectedLetter.match(/[^а-я]/g)) {
                    data = array.filter(item => item.english.toLowerCase().slice(0, 1) === selectedLetter)
                    
                } else {
                    data = array.filter(item => item.russian.toLowerCase().slice(0, 1) === selectedLetter)
                }
            } 
        }
        setFilteredArreyLength(data.length)
        return data;
    }
    //console.log(words)
    useEffect(() => {
        if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            setCuttedArrayOfWords(filteredElements(words).slice(0, offset));
        } else {
            setFilteredArreyLength(0)
            setCuttedArrayOfWords(words.slice(0, offset));
        }
        // eslint-disable-next-line
    }, [words, offset, selectedLetter, searchedWord.length, wordsPerUpload]);
    
    const addNewWords = () => {
		if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            setOffset(offset + wordsPerUpload);
		    setCuttedArrayOfWords([...cuttedArrayOfWords, ...filteredElements(words).slice(offset, offset + wordsPerUpload)]);
        } else {
            setOffset(offset + wordsPerUpload);
		    setCuttedArrayOfWords([...cuttedArrayOfWords, ...words.slice(offset, offset + wordsPerUpload)]);
        }
        
	}
    /* const addNewWords = () => {
		setOffset(offset + 34);
		setCuttedArrayOfWords([...cuttedArrayOfWords, ...words.slice(offset, offset + 34)]);
	} */

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

            setShowMessage(true)
            setMessage({
                text: "The word was successfully deleted!",
                color: 'green'
            })
        } else {
            setShowMessage(true)
            setMessage({
                text: "Choose the word!",
                color: 'red'
            })
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
            <Navigation 
                setSearchedWord={setSearchedWord}
                setOffset={setOffset}
                wordsPerUpload={wordsPerUpload}
            />
            <div className="modifying">
                <SelectPopup 
                    items={sortItems} 
                    active={sortType}
                    text={"Sort by:"}
                    dispatchFunction={sortBy}
                    activeTypeChanged={activeSortTypeChanged}
                />
                <ReverseArrows 
                    setReverseWords={setReverseWords} 
                    reverseWords={reverseWords}
                />
                <Modification 
                    handleModifyModal={handleModifyModal}
                    handleAddModal={handleAddModal} 
                    onDeleteWord={onDeleteWord}
                    selected={selectedWord.id}
                    setShowMessage={setShowMessage}
                    setMessage={setMessage}
                />
            </div>
            <AlpabetFilter 
                setSelectedLetter={setSelectedLetter} 
                setOffset={setOffset}
                wordsPerUpload={wordsPerUpload}
            />
            <Table 
                onDelete={onDelete} 
                searchedWord={searchedWord}
                reverseWords={reverseWords}
                cuttedArrayOfWords={cuttedArrayOfWords}
                selectedLetter={selectedLetter}
            />
            <div className='footer'>
            {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Total words: {words.length}</div> : null}
                <Pagination 
                    addNewWords={addNewWords} 
                    words={words}
                    cuttedArrayOfWords={cuttedArrayOfWords}
                    filteredArreyLength={filteredArreyLength}
                    wordsPerUpload={wordsPerUpload}
                />
                {cuttedArrayOfWords.length !== 0 ? 
                <SelectPopup 
                    items={numberOfWordsPerPage} 
                    active={wordsPerUpload}
                    text={"Words per page:"}
                    dispatchFunction={setWordsPerUpload}
                /> : null}
            </div>
            <AddModal 
                active={addModalActive} 
                setActive={setAddModalActive} 
                address={linkToWords}
                func={addWord}
                data={words}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
            />
            <ModifyModal
                active={modifyModalActive} 
                setActive={setModifyModalActive} 
                address={linkToWords}
                func={modifyWord}
                data={words}
                selected={selectedWord}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
            />
            <Message 
                message={message.text} 
                showMessage={showMessage} 
                setShowMessage={setShowMessage}
                color={message.color}
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
            <Navigation 
                setSearchedWord={setSearchedWord}
                setOffset={setOffset}
                wordsPerUpload={wordsPerUpload}
            />
            <div className="modifying">
                <Modification 
                    handleModifyModal={handleModifyModal}
                    handleAddModal={handleAddModal} 
                    onDeleteWord={onDeleteWord}
                    selected={selectedWord.id}
                    setShowMessage={setShowMessage}
                    setMessage={setMessage}
                />
                <ReverseArrows 
                    setReverseWords={setReverseWords} 
                    reverseWords={reverseWords}
                />
                {filteredArreyLength === 0 ? 
                <SelectPopup 
                    items={sortItems} 
                    active={sortType}
                    text={"Sort by:"}
                    dispatchFunction={sortBy}
                    activeTypeChanged={activeSortTypeChanged}
                /> : 
                null}
            </div>
            <AlpabetFilter 
                setSelectedLetter={setSelectedLetter} 
                setOffset={setOffset}
                wordsPerUpload={wordsPerUpload}
            />
            <Table 
                onDelete={onDelete} 
                searchedWord={searchedWord}
                reverseWords={reverseWords}
                cuttedArrayOfWords={cuttedArrayOfWords}
                selectedLetter={selectedLetter}
            />
            <div className='footer'>
                <div className='footer__numberOfWords'>
                    {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Total words: {words.length}</div> : null}
                    {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Current words: {filteredArreyLength === 0 ? words.length : filteredArreyLength}</div> : null}
                </div>
                <Pagination 
                    addNewWords={addNewWords} 
                    words={words}
                    cuttedArrayOfWords={cuttedArrayOfWords}
                    filteredArreyLength={filteredArreyLength}
                    wordsPerUpload={wordsPerUpload}
                />
                {cuttedArrayOfWords.length !== 0 ? 
                <SelectPopup 
                    items={numberOfWordsPerPage} 
                    active={wordsPerUpload}
                    text={"On the page:"}
                    dispatchFunction={setWordsPerUpload}
                /> : null}
            </div>
            <AddModal 
                active={addModalActive} 
                setActive={setAddModalActive} 
                address={linkToWords}
                func={addWord}
                data={words}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
            />
            <ModifyModal
                active={modifyModalActive} 
                setActive={setModifyModalActive} 
                address={linkToWords}
                func={modifyWord}
                data={words}
                selected={selectedWord}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
            />
            <Message 
                message={message.text} 
                showMessage={showMessage} 
                setShowMessage={setShowMessage}
                color={message.color}
            />
            <ArrowScrollUp/>
        </>
    )
}

export default HomePage;