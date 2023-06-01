import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from "react";
import database from "../firebase";
import {deleteDoc, collection, doc, setDoc} from "firebase/firestore"; 
import {modifyWord, deleteWord, setTotalPages, fetchFavorites, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage} from '../store/slices/favoritesSlice';
import useAuth from '../hooks/use-auth';
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import SelectPopup from "../components/SelectPopup/SelectPopup";
import ModifyModal from "../components/ModifyModal/ModifyModal";
import Pagination from '../components/Pagination/Pagination';
import AlpabetFilter from '../components/AlphabetFilter/AlphabetFilter';
import Message from '../components/Message/Message';
import ArrowScrollUp from '../components/ArrowScrollUp/ArrowScrollUp';
import QuizModal from '../components/QuizModal/QuizModal';
import WordsTable from '../components/WordsTable/WordsTable';
import useFilteredArray from '../hooks/useFilteredArray';

const FavoritesPage = () => {

    const {favorites, wordsLoadingStatus,  wordsPerUpload, sortType, currentPage, totalPages} = useSelector(state => state.favorites);

    const [modifyModalActive, setModifyModalActive] = useState(false);
    const [quizModalActive, setQuizModalActive] = useState(false);
    const [selectedWord, setSelectedWord] = useState({});
    const [selectedWords, setSelectedWords] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState('');
    const [searchedWord, setSearchedWord] = useState([]);
    const [cuttedArrayOfWords, setCuttedArrayOfWords] = useState([]);
    const [filteredArrayLength, setFilteredArrayLength] = useState(0);
	const [offset, setOffset] = useState(30);
    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);

    const dispatch = useDispatch();
    const {isAuth, id} = useAuth();
    
    const {filtered, filteredLength} = useFilteredArray(favorites, selectedLetter, searchedWord) 

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
        thirdUrl: 'favoriteWords'
    }
    
    useEffect(() => {
        if (id !== null) {
            dispatch(fetchFavorites(id));
        }
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        dispatch(setPage(1))
        // eslint-disable-next-line
    }, [wordsPerUpload, filteredArrayLength]);

    useEffect(() => {
        setFilteredArrayLength(filteredLength)
        // eslint-disable-next-line
    }, [filteredLength]);

    useEffect(() => {
        setSelectedWord({});
        setSelectedWords([]);
        // eslint-disable-next-line
    }, [selectedLetter]);

    useEffect(() => {
        setOffset(wordsPerUpload * currentPage)
        // eslint-disable-next-line
    }, [currentPage]);

    useEffect(() => {
        if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            if (!(filteredArrayLength % wordsPerUpload)) {
                dispatch(setTotalPages(filteredArrayLength/wordsPerUpload))
            } else {
                dispatch(setTotalPages(Math.ceil((filteredArrayLength/wordsPerUpload))))
            }
        } else {
            if (!(favorites.length % wordsPerUpload)) {
                dispatch(setTotalPages(favorites.length/wordsPerUpload))
            } else {
                dispatch(setTotalPages(Math.ceil((favorites.length/wordsPerUpload))))
            }
        }
        // eslint-disable-next-line
    }, [favorites, wordsPerUpload, selectedLetter, searchedWord.length, filteredArrayLength, totalPages])

    useEffect(() => {
        let lastIndex = currentPage * wordsPerUpload;
        let firstIndex = lastIndex - wordsPerUpload;

        if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            setCuttedArrayOfWords(filtered.slice(firstIndex, lastIndex));
        } else {
            setCuttedArrayOfWords(favorites.slice(firstIndex, lastIndex));
        }
        // eslint-disable-next-line
    }, [favorites, offset, selectedLetter, searchedWord.length, wordsPerUpload, filtered, currentPage]);

    const handleQuizModal = () => {
        if (favorites.length > 20) {
            setQuizModalActive(true)
        } else {
            setShowMessage(true)
            setMessage({
                text: "Must be at least 20 words!",
                color: 'red'
            })
        }
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

    const onAddToFavorite = (word) => {
        const favoriteColRef = collection(database, linkToWords.firstUrl, linkToWords.secondUrl, 'favoriteWords')
        const wordsColRef = collection(database, linkToWords.firstUrl, linkToWords.secondUrl, 'words')
        
        const obj = {
            ...word,
            favorite : !word.favorite,
        }

        if (window.confirm('Are you sure?')) {
            dispatch(deleteWord(obj.id));
        
            deleteDoc(doc(favoriteColRef, obj.id));
            setDoc(doc(wordsColRef, obj.id), obj);        
    
            setShowMessage(true);
            setMessage({
                text: "Deleted from favorite!",
                color: 'green'
            })
        }
    }

    return isAuth ? (
        <>
            <Header/>
            <Navigation 
                setSearched={setSearchedWord}
                setOffset={setOffset}
                numberPerUpload={wordsPerUpload}
            />
            <div className="modifyingFavoritesWords">
                {filteredArrayLength === 0 ? 
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
                setFilteredArrayLength={setFilteredArrayLength}
                setSelectedLetter={setSelectedLetter} 
                setOffset={setOffset}
                wordsPerUpload={wordsPerUpload}
            />
            <WordsTable 
                searchedWord={searchedWord}
                cuttedArrayOfWords={cuttedArrayOfWords}
                selectedLetter={selectedLetter}
                selectedWord={selectedWord}
                setSelectedWord={setSelectedWord}
                selectedWords={selectedWords}
                setSelectedWords={setSelectedWords}
                onAddToFavorite={onAddToFavorite}
                handleModifyModal={handleModifyModal}
                handleQuizModal={handleQuizModal}
                loadingStatus={wordsLoadingStatus}
                items={favorites}
            />
            <div className='footer'>
                <div className='footer__numberOfWords'>
                    {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Total words: {favorites.length}</div> : null}
                    {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Current words: {filteredArrayLength === 0 ? favorites.length : filteredArrayLength}</div> : null}
                </div>
                <Pagination 
                    items={favorites}
                    cuttedArray={cuttedArrayOfWords}
                    filteredArrayLength={filteredArrayLength}
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
            <ModifyModal
                width={290}
                height={230}
                active={modifyModalActive} 
                setActive={setModifyModalActive} 
                address={linkToWords}
                func={modifyWord}
                data={favorites}
                selected={selectedWord}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
            />
            <QuizModal 
                active={quizModalActive}
                setActive={setQuizModalActive}
                items={favorites}
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

export default FavoritesPage;