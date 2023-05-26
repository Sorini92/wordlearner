import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from "react-router-dom";
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

const FavoritesPage = () => {

    const {favorites, wordsLoadingStatus,  wordsPerUpload, sortType, currentPage, totalPages} = useSelector(state => state.favorites);

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
    const navigate = useNavigate();
    const location = useLocation();
    const {isAuth} = useAuth();

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
        secondUrl: 'user1',
        thirdUrl: 'favoriteWords'
    }

    useEffect(() => {
        dispatch(fetchFavorites());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(setPage(1))
        // eslint-disable-next-line
    }, [wordsPerUpload, favorites, filteredArreyLength]);

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
            if (!(favorites.length % wordsPerUpload)) {
                setOffset(wordsPerUpload);
                dispatch(setTotalPages(favorites.length/wordsPerUpload))
            } else {
                setOffset(wordsPerUpload);
                dispatch(setTotalPages(Math.ceil((favorites.length/wordsPerUpload))))
            }
        }
        // eslint-disable-next-line
    }, [favorites, wordsPerUpload, selectedLetter, searchedWord.length, filteredArreyLength, totalPages])

    useEffect(() => {
        let lastIndex = currentPage * wordsPerUpload;
        let firstIndex = lastIndex - wordsPerUpload;

        if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            setCuttedArrayOfWords(filteredElements(favorites).slice(firstIndex, lastIndex));
        } else {
            setCuttedArrayOfWords(favorites.slice(firstIndex, lastIndex));
        }

        // eslint-disable-next-line
    }, [currentPage, wordsPerUpload, offset]);

    useEffect(() => {
        if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            setCuttedArrayOfWords(filteredElements(favorites).slice(0, offset));
        } else {
            setFilteredArreyLength(0)
            setCuttedArrayOfWords(favorites.slice(0, offset));
        }
        // eslint-disable-next-line
    }, [favorites, offset, selectedLetter, searchedWord.length, wordsPerUpload]);
    
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

    const addNewWords = () => {
		if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            dispatch(setPage(currentPage + 1))
            setOffset(offset + wordsPerUpload);
		    setCuttedArrayOfWords([...cuttedArrayOfWords, ...filteredElements(favorites).slice(offset, offset + wordsPerUpload)]);
        } else {
            dispatch(setPage(currentPage + 1))
            setOffset(offset + wordsPerUpload);
		    setCuttedArrayOfWords([...cuttedArrayOfWords, ...favorites.slice(offset, offset + wordsPerUpload)]);
        }
	}

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
    

    /* useEffect(() => {
        if(!isAuth) {
            navigate('/login')
        }
    })

    return isAuth ? (
        <>
            <Header/>
            <Navigation 
                setSearched={setSearchedWord}
                setOffset={setOffset}
                numberPerUpload={wordsPerUpload}
            />
            <div className="modifying">
                <Modification 
                    handleModifyModal={handleModifyModal}
                    handleAddModal={handleAddModal} 
                    onDeleteWord={onDeleteWord}
                    selectedItem={selectedWord.id}
                    selectedItems={selectedWords}
                    setShowMessage={setShowMessage}
                    setMessage={setMessage}
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
                searchedWord={searchedWord}
                cuttedArrayOfWords={cuttedArrayOfWords}
                selectedLetter={selectedLetter}
                setSelectedWord={setSelectedWord}
                selectedWords={selectedWords}
                setSelectedWords={setSelectedWords}
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
    ) : (
        <>
            {navigate('/login')}
        </>
    ) */
    return (
        <>
            <Header/>
            <Navigation 
                setSearched={setSearchedWord}
                setOffset={setOffset}
                numberPerUpload={wordsPerUpload}
            />
            <div className="modifyingFavoritesWords">
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
                items={favorites}
            />
            <div className='footer'>
                <div className='footer__numberOfWords'>
                    {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Total words: {favorites.length}</div> : null}
                    {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Current words: {filteredArreyLength === 0 ? favorites.length : filteredArreyLength}</div> : null}
                </div>
                <Pagination 
                    addNew={addNewWords} 
                    items={favorites}
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
    )
}

export default FavoritesPage;