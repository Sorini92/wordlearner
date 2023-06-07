import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from "react";
import database from "../firebase";
import {deleteDoc, collection, doc, setDoc} from "firebase/firestore"; 
import {deleteWord, deleteWords, addWord, modifyWord, setTotalPages, fetchWords, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage} from '../store/slices/wordSlice';
import useAuth from '../hooks/use-auth';
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import WordsTable from "../components/WordsTable/WordsTable";
import AddModal from "../components/AddModal/AddModal";
import ModifyModal from "../components/ModifyModal/ModifyModal";
import AlpabetFilter from '../components/AlphabetFilter/AlphabetFilter';
import Message from '../components/Message/Message';
import ArrowScrollUp from '../components/ArrowScrollUp/ArrowScrollUp';
import QuizModal from '../components/QuizModal/QuizModal';
import useFilteredArray from '../hooks/useFilteredArray';
import WordsNavigation from '../components/WordsNavigation/WordsNavigation';
import Footer from '../components/Footer/Footer';
import SortAndActions from '../components/SortAndActions/SortAndActions';

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
    const [filteredArrayLength, setFilteredArrayLength] = useState(0);

    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);
	const [offset, setOffset] = useState(30);

    const [isShowDate, setIsShowDate] = useState(false);
    const [isShowTicks, setIsShowTicks] = useState(false);
    const [isBlured, setIsBlured] = useState(false);
    const [reverseWords, setReverseWords] = useState(false);

    const dispatch = useDispatch();
    const {isAuth, id} = useAuth();
    
    const {filtered, filteredLength} = useFilteredArray(words, selectedLetter, searchedWord) 
    
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
    }, [wordsPerUpload, filteredArrayLength]);

    useEffect(() => {
        setFilteredArrayLength(filteredLength)
        // eslint-disable-next-line
    }, [filteredLength]);


    useEffect(() => {
        setSelectedWord({});
        setSelectedWords([]);
        // eslint-disable-next-line
    }, [selectedLetter, searchedWord.length]);

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
            if (!(words.length % wordsPerUpload)) {
                dispatch(setTotalPages(words.length/wordsPerUpload))
            } else {
                dispatch(setTotalPages(Math.ceil((words.length/wordsPerUpload))))
            }
        }
        // eslint-disable-next-line
    }, [words, wordsPerUpload, selectedLetter, searchedWord.length, filteredArrayLength, totalPages])

    useEffect(() => {
        let lastIndex = currentPage * wordsPerUpload;
        let firstIndex = lastIndex - wordsPerUpload;

        if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            setCuttedArrayOfWords(filtered.slice(firstIndex, lastIndex));
        } else {
            setCuttedArrayOfWords(words.slice(firstIndex, lastIndex));
        }
        // eslint-disable-next-line
    }, [words, offset, selectedLetter, searchedWord.length, wordsPerUpload, filtered, currentPage]);

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
            setQuizModalActive(!quizModalActive)
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
                setFilteredArrayLength={setFilteredArrayLength}
            />
            <WordsNavigation
                showSetting={true}
                setIsShowDate={setIsShowDate}
                setIsShowTicks={setIsShowTicks}
                setReverseWords={setReverseWords}
                setIsBlured={setIsBlured}
                isShowDate={isShowDate}
                isShowTicks={isShowTicks}
                reverseWords={reverseWords}
                isBlured={isBlured}
            />
            <SortAndActions
                handleAddModal={handleAddModal}
                onDelete={onDeleteWord}
                filteredArrayLength={filteredArrayLength}
                sortItems={sortItems}
                active={sortType}
                text={"Sort by:"}
                dispatchFunction={sortBy}
                activeTypeChanged={activeSortTypeChanged}
                handleQuizModal={handleQuizModal}
            />
            <AlpabetFilter 
                setSelectedLetter={setSelectedLetter} 
                setOffset={setOffset}
                wordsPerUpload={wordsPerUpload}
                setFilteredArrayLength={setFilteredArrayLength}
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
                loadingStatus={wordsLoadingStatus}
                isShowDate={isShowDate}
                isBlured={isBlured}
                isShowTicks={isShowTicks}
                reverseWords={reverseWords}
                items={words}
            />
            <Footer
                cuttedArray={cuttedArrayOfWords}
                filteredArrayLength={filteredArrayLength}
                numberPerUpload={wordsPerUpload}
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
                numberOfItemsPerPage={numberOfWordsPerPage}
                active={wordsPerUpload}
                text={"On the page:"}
                dispatchFunction={setWordsPerUpload}
                items={words}
            />
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