import {useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
import database from "../firebase";
import {deleteDoc, collection, doc, setDoc} from "firebase/firestore"; 
import Navigation from "../components/Navigation/Navigation";
import AddWordModal from "../components/AddWordModal/AddWordModal";
import ModifyWordModal from "../components/ModifyWordModal/ModifyWordModal";
import AlpabetFilter from '../components/AlphabetFilter/AlphabetFilter';
import Message from '../components/Message/Message';
import ArrowScrollUp from '../components/ArrowScrollUp/ArrowScrollUp';
import QuizModal from '../components/QuizModal/QuizModal';
import WordsNavigation from '../components/WordsNavigation/WordsNavigation';
import Footer from '../components/Footer/Footer';
import SortAndActions from '../components/SortAndActions/SortAndActions';
import useFilteredArray from '../hooks/useFilteredArray';
import useLocalStorage from '../hooks/useLocalStorage';

const Page = ({TableComponent, sortItems, sortType, sortByFunction, activeSortTypeChanged, setNumberPerUpload, numberPerUpload, currentPage, totalPages, setPage, numberOfItemsPerPage, address, wordsLoadingStatus, deleteItem, deleteItems, add, modify, setTotalPages, items, tableSettings, letter, setLetter}) => {
    
    const [addModalActive, setAddModalActive] = useState(false);
    const [modifyModalActive, setModifyModalActive] = useState(false);
    const [quizModalActive, setQuizModalActive] = useState(false);

    const [selectedWord, setSelectedWord] = useState({});
    const [selectedWords, setSelectedWords] = useState([]);
    const [searchedWord, setSearchedWord] = useState([]);
    const [cuttedArrayOfWords, setCuttedArrayOfWords] = useState([]);
    const [filteredArrayLength, setFilteredArrayLength] = useState(0);

    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);
	const [offset, setOffset] = useState(30);

    const {filtered, filteredLength} = useFilteredArray(items, letter, searchedWord)
    
    const [isShowDate, setIsShowDate] = useLocalStorage(tableSettings?.date, false);
    const [isShowTicks, setIsShowTicks] = useLocalStorage(tableSettings?.ticks, false); 
    const [isBlured, setIsBlured] = useLocalStorage(tableSettings?.blur, false); 
    const [reverseWords, setReverseWords] = useLocalStorage(tableSettings?.reverse, false);  
    
    const dispatch = useDispatch();

    useEffect(() => {
        setFilteredArrayLength(filteredLength)
        // eslint-disable-next-line
    }, [filteredLength]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                setAddModalActive(false);
                setModifyModalActive(false)
            }
        };
    
        document.addEventListener('keydown', handleKeyPress);
    
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        setSelectedWord({});
        setSelectedWords([]);
        // eslint-disable-next-line
    }, [letter, searchedWord.length]);

    useEffect(() => {
        setOffset(numberPerUpload * currentPage)
        // eslint-disable-next-line
    }, [currentPage]);

    useEffect(() => {
        if (letter.length !== 0 || searchedWord.length > 0) {
            if (!(filteredArrayLength % numberPerUpload)) {
                dispatch(setTotalPages(filteredArrayLength/numberPerUpload))
            } else {
                dispatch(setTotalPages(Math.ceil((filteredArrayLength/numberPerUpload))))
            }
        } else {
            if (!(items.length % numberPerUpload)) {
                dispatch(setTotalPages(items.length/numberPerUpload))
            } else {
                dispatch(setTotalPages(Math.ceil((items.length/numberPerUpload))))
            }
        }
        // eslint-disable-next-line
    }, [items, numberPerUpload, letter, searchedWord.length, filteredArrayLength, totalPages])

    useEffect(() => {
        let lastIndex = currentPage * numberPerUpload;
        let firstIndex = lastIndex - numberPerUpload;

        if (letter.length !== 0 || searchedWord.length > 0) {
            setCuttedArrayOfWords(filtered.slice(firstIndex, lastIndex));
        } else {
            setCuttedArrayOfWords(items.slice(firstIndex, lastIndex));
        }
        // eslint-disable-next-line
    }, [items, offset, letter, searchedWord.length, numberPerUpload, filtered, currentPage]);

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
        if (items.length > 20) {
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
        const favoriteColRef = collection(database, address.firstUrl, address.secondUrl, 'favoriteWords')
        const wordsColRef = collection(database, address.firstUrl, address.secondUrl, 'words')
        
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
            if (address.thirdUrl !== 'favoriteWords') {
                deleteDoc(doc(favoriteColRef, obj.id));
            
                setShowMessage(true);
                setMessage({
                    text: "Deleted from favorite!",
                    color: 'green'
                })
            } else {
                if (window.confirm('Are you sure?')) {
                    dispatch(deleteItem(obj.id));
                
                    deleteDoc(doc(favoriteColRef, obj.id));
                    setDoc(doc(wordsColRef, obj.id), obj);        
            
                    setShowMessage(true);
                    setMessage({
                        text: "Deleted from favorite!",
                        color: 'green'
                    })
                }
            }
            
        }

        setDoc(doc(wordsColRef, obj.id), obj);
        dispatch(modify(obj));
    }
    
    const onDeleteWord = () => {
        const favoriteColRef = collection(database, address.firstUrl, address.secondUrl, 'favoriteWords')
        const wordsColRef = collection(database, address.firstUrl, address.secondUrl, 'words')
        
        if (selectedWord.id !== undefined || selectedWords.length > 0) {
            if (selectedWords.length === 0) {
                if (window.confirm('Are you sure?')) {
                    dispatch(deleteItem(selectedWord.id));
        
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
                    dispatch(deleteItems(selectedWords));

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

    const onClearLetter = () => {
        dispatch(setLetter(''));
        setFilteredArrayLength(0);
        setOffset(numberPerUpload);
        dispatch(setPage(1))
    }

    const switchToFirstPage = () => {
        dispatch(setPage(1))
    }
    
    return (
        <>
            <Navigation 
                setSearched={setSearchedWord}
                setOffset={setOffset}
                numberPerUpload={numberPerUpload}
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
                address={address}
            />
            <SortAndActions
                items={cuttedArrayOfWords}
                handleAddModal={handleAddModal}
                onDelete={onDeleteWord}
                filteredArrayLength={filteredArrayLength}
                sortItems={sortItems}
                active={sortType}
                textForSelectPopup={"Sort by:"}
                dispatchFunction={sortByFunction}
                activeTypeChanged={activeSortTypeChanged}
                handleQuizModal={handleQuizModal}
                address={address}
            />
            <AlpabetFilter 
                setLetter={setLetter} 
                setOffset={setOffset}
                wordsPerUpload={numberPerUpload}               
                onClearLetter={onClearLetter}
                switchToFirstPage={switchToFirstPage}
            />
            <TableComponent 
                searchedWord={searchedWord}
                cuttedArrayOfWords={cuttedArrayOfWords}
                selectedLetter={letter}
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
                items={items}
            />
            <Footer
                cuttedArray={cuttedArrayOfWords}
                filteredArrayLength={filteredArrayLength}
                numberPerUpload={numberPerUpload}
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
                numberOfItemsPerPage={numberOfItemsPerPage}
                active={numberPerUpload}
                textForSelectPopup={"On the page:"}
                textForCounters={"words"}
                dispatchFunction={setNumberPerUpload}
                switchToFirstPage={switchToFirstPage}
                items={items}
            />
            <AddWordModal 
                width={290}
                height={230}
                maxLength={30}
                active={addModalActive} 
                setActive={setAddModalActive} 
                address={address}
                func={add}
                items={items}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
            />
            <ModifyWordModal
                width={290}
                height={230}
                maxLength={30}
                active={modifyModalActive} 
                setActive={setModifyModalActive} 
                address={address}
                func={modify}
                items={items}
                selected={selectedWord}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
            />
            <QuizModal 
                active={quizModalActive}
                setActive={setQuizModalActive}
                items={items}
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

export default Page;