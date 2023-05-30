import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from "react";
import database from "../firebase";
import {deleteDoc, collection, doc, setDoc} from "firebase/firestore"; 
import {deleteWord, deleteWords, addWord, modifyWord, setTotalPages, fetchWords, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage} from '../store/slices/wordSlice';
import useAuth from '../hooks/use-auth';
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import WordsTable from "../components/WordsTable/WordsTable";
import SelectPopup from "../components/SelectPopup/SelectPopup";
import Modification from "../components/Modification/Modification";
import AddModal from "../components/AddModal/AddModal";
import ModifyModal from "../components/ModifyModal/ModifyModal";
import Pagination from '../components/Pagination/Pagination';
import AlpabetFilter from '../components/AlphabetFilter/AlphabetFilter';
import Message from '../components/Message/Message';
import ArrowScrollUp from '../components/ArrowScrollUp/ArrowScrollUp';
import QuizModal from '../components/QuizModal/QuizModal';

const WordsPage = () => {

    const {wordsLoadingStatus, words, wordsPerUpload, sortType, currentPage, totalPages} = useSelector(state => state.words);

    const [addModalActive, setAddModalActive] = useState(false);
    const [modifyModalActive, setModifyModalActive] = useState(false);
    const [quizModalActive, setQuizModalActive] = useState(false);
    const [selectedWord, setSelectedWord] = useState({});
    const [selectedWords, setSelectedWords] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState('');
    const [searchedWord, setSearchedWord] = useState([]);
    const [cuttedArrayOfWords, setCuttedArrayOfWords] = useState([]);
    const [filteredArreyLength, setFilteredArreyLength] = useState(0);
	const [offset, setOffset] = useState(30);
    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);

    const dispatch = useDispatch();
    const {isAuth, id} = useAuth();

    const sortItems = [
        { name: 'from new'},
        { name: 'from old'},         
        { name: 'a to z'},
        { name: 'z to a'},
        { name: 'а to я'},
        { name: 'я to а'},
    ];

    const numberOfWordsPerPage = [
        { name: 30},
        { name: 60},
        { name: 90},        
    ];

    const linkToWords = {
        firstUrl: 'users',
        secondUrl: id,
        thirdUrl: 'words'
    }

    useEffect(() => {
        if (id !== null) {
            dispatch(fetchWords(id));
        }
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        dispatch(setPage(1))
        // eslint-disable-next-line
    }, [wordsPerUpload, filteredArreyLength]);

    useEffect(() => {
        setSelectedWord({});
        setSelectedWords([]);
        // eslint-disable-next-line
    }, [selectedLetter]);

    useEffect(() => {
        if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            if (!(filteredArreyLength % wordsPerUpload)) {
                setOffset(wordsPerUpload);
                dispatch(setTotalPages(filteredArreyLength/wordsPerUpload))
            } else {
                setOffset(wordsPerUpload);
                dispatch(setTotalPages(Math.ceil((filteredArreyLength/wordsPerUpload))))
            }
        } else {
            if (!(words.length % wordsPerUpload)) {
                setOffset(wordsPerUpload);
                dispatch(setTotalPages(words.length/wordsPerUpload))
            } else {
                setOffset(wordsPerUpload);
                dispatch(setTotalPages(Math.ceil((words.length/wordsPerUpload))))
            }
        }
        // eslint-disable-next-line
    }, [words, wordsPerUpload, selectedLetter, searchedWord.length, filteredArreyLength, totalPages])

    useEffect(() => {
        let lastIndex = currentPage * wordsPerUpload;
        let firstIndex = lastIndex - wordsPerUpload;

        if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            setCuttedArrayOfWords(filteredElements(words).slice(firstIndex, lastIndex));
        } else {
            setCuttedArrayOfWords(words.slice(firstIndex, lastIndex));
        }
        // eslint-disable-next-line
    }, [currentPage, wordsPerUpload, offset]);

    useEffect(() => {
        if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            if (currentPage > 1) {
                setCuttedArrayOfWords(filteredElements(words).slice(offset * (currentPage - 1), offset * currentPage));
            } else {
                setCuttedArrayOfWords(filteredElements(words).slice(0, offset));
            }
            
        } else {
            if (currentPage > 1) {
                setCuttedArrayOfWords(words.slice(offset * (currentPage - 1), offset * currentPage));
            } else {
                setFilteredArreyLength(0)
                setCuttedArrayOfWords(words.slice(0, offset));
            }
        }
        // eslint-disable-next-line
    }, [words, offset, selectedLetter, searchedWord.length, wordsPerUpload]);
    
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
    console.log(offset, 'offset');
    console.log(cuttedArrayOfWords, 'cutted');
    console.log(currentPage, 'page');

    const addNewWords = () => {
		if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            //dispatch(setPage(currentPage + 1))
            setOffset(offset + wordsPerUpload);
		    setCuttedArrayOfWords([...cuttedArrayOfWords, ...filteredElements(words).slice(offset, offset + wordsPerUpload)]);
        } else {
            //dispatch(setPage(currentPage + 1))
            setOffset(offset + wordsPerUpload);
		    setCuttedArrayOfWords([...cuttedArrayOfWords, ...words.slice(offset, offset + wordsPerUpload)]);
        }
	}

    const handleAddModal = () => {
        setAddModalActive(!addModalActive);
    }

    const handleModifyModal = () => {
        if (selectedWord !== undefined || selectedWords.length !== 0) {
            setModifyModalActive(!modifyModalActive);
        } else {
            setShowMessage(true);
            setMessage({
                text: "Choose the word!",
                color: 'red'
            })
        }
    }

    const handleQuizModal = () => {
        if (words.length > 20) {
            setQuizModalActive(true)
        } else {
            setShowMessage(true)
            setMessage({
                text: "Must be at least 20 words!",
                color: 'red'
            })
        }
    }

    const onAddToFavorite = (word) => {
        const favoriteColRef = collection(database, linkToWords.firstUrl, linkToWords.secondUrl, 'favoriteWords')
        const wordsColRef = collection(database, linkToWords.firstUrl, linkToWords.secondUrl, linkToWords.thirdUrl)
        
        const obj = {
            ...word,
            favorite : !word.favorite,
        }
        
        if (obj.favorite) {
            setDoc(doc(favoriteColRef, obj.id), obj);
            setShowMessage(true);
            setMessage({
                text: "Added to favorite!",
                color: 'green'
            })
        } else {
            deleteDoc(doc(favoriteColRef, obj.id));
            setShowMessage(true);
            setMessage({
                text: "Deleted from favorite!",
                color: 'green'
            })
        }
        
        dispatch(modifyWord(obj));
        setDoc(doc(wordsColRef, obj.id), obj);
    }
    
    const onDeleteWord = () => {
        const favoriteColRef = collection(database, linkToWords.firstUrl, linkToWords.secondUrl, 'favoriteWords')
        const wordsColRef = collection(database, linkToWords.firstUrl, linkToWords.secondUrl, linkToWords.thirdUrl)
        
        if (selectedWord.id !== undefined || selectedWords.length > 0) {
            if (selectedWords.length === 0) {
                if (window.confirm('Are you sure?')) {
                    dispatch(deleteWord(selectedWord.id));
        
                    if (selectedWord.favorite) {
                        deleteDoc(doc(favoriteColRef, selectedWord.id));
                        deleteDoc(doc(wordsColRef, selectedWord.id));
                    } else {
                        deleteDoc(doc(wordsColRef, selectedWord.id));
                    }                    
    
                    setSelectedWord({})

                    setShowMessage(true)
                    setMessage({
                        text: "The word was successfully deleted!",
                        color: 'green'
                    })
                }
            } else {
                if (window.confirm('Are you sure?')) {
                    dispatch(deleteWords(selectedWords));

                    if (selectedWord.favorite) {
                        selectedWords.forEach(item => deleteDoc(doc(favoriteColRef, item)))
                        selectedWords.forEach(item => deleteDoc(doc(wordsColRef, item)))
                    } else {
                        selectedWords.forEach(item => deleteDoc(doc(wordsColRef, item)))
                    }
        
                    setSelectedWords([]);
                    
                    setShowMessage(true)
                    setMessage({
                        text: "The word was successfully deleted!",
                        color: 'green'
                    })
                }
            }

        } else {
            setShowMessage(true)
            setMessage({
                text: "Choose the word!",
                color: 'red'
            })
        }
    }

    return  isAuth ? (
        <>
            <Header/>
            <Navigation 
                setSearched={setSearchedWord}
                setOffset={setOffset}
                numberPerUpload={wordsPerUpload}
            />
            <div className="modifying">
                <Modification 
                    handleAddModal={handleAddModal} 
                    onDelete={onDeleteWord}
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
            <WordsTable 
                searchedWord={searchedWord}
                cuttedArrayOfWords={cuttedArrayOfWords}
                selectedLetter={selectedLetter}
                setSelectedWord={setSelectedWord}
                selectedWords={selectedWords}
                setSelectedWords={setSelectedWords}
                onAddToFavorite={onAddToFavorite}
                handleModifyModal={handleModifyModal}
                handleQuizModal={handleQuizModal}
                loadingStatus={wordsLoadingStatus}
                items={words}
            />
            <div className='footer'>
                <div className='footer__numberOfWords'>
                    {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Total words: {words.length}</div> : null}
                    {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Current words: {filteredArreyLength === 0 ? words.length : filteredArreyLength}</div> : null}
                </div>
                <Pagination 
                    addNew={addNewWords} 
                    items={words}
                    cuttedArray={cuttedArrayOfWords}
                    filteredArreyLength={filteredArreyLength}
                    numberPerUpload={wordsPerUpload}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setPage={setPage}
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
                width={290}
                height={230}
                active={addModalActive} 
                setActive={setAddModalActive} 
                address={linkToWords}
                func={addWord}
                data={words}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
            />
            <ModifyModal
                width={290}
                height={230}
                active={modifyModalActive} 
                setActive={setModifyModalActive} 
                address={linkToWords}
                func={modifyWord}
                data={words}
                selected={selectedWord}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
            />
            <QuizModal 
                active={quizModalActive}
                setActive={setQuizModalActive}
                items={words}
                loadingStatus={wordsLoadingStatus}
            />
            <Message 
                message={message.text} 
                showMessage={showMessage} 
                setShowMessage={setShowMessage}
                color={message.color}
            />
            <ArrowScrollUp/>
        </>
    ) : null
}

export default WordsPage;