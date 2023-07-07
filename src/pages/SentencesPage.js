import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSentences, sortBy, activeSortTypeChanged, addSentence, modifySentence, setTotalPages, setSentencesPerUpload, setPage, deleteSentence} from '../store/slices/sentencesSlice';
import {fetchWords, addWord} from '../store/slices/wordSlice';
import database from "../firebase";
import {deleteDoc, collection, doc} from "firebase/firestore"; 
import useAuth from '../hooks/use-auth';
import Navigation from "../components/Navigation/Navigation";
import SentencesTable from "../components/SentencesTable/SentencesTable";
import SortAndActions from '../components/SortAndActions/SortAndActions';
import Message from '../components/Message/Message';
import AddSentenceModal from '../components/AddSentenceModal/AddSentenceModal';
import AddWordModal from '../components/AddWordModal/AddWordModal';
import ModifySentenceModal from '../components/ModifySentenceModal/ModifySentenceModal';
import ArrowScrollUp from '../components/ArrowScrollUp/ArrowScrollUp';
import Footer from '../components/Footer/Footer';

const SentencesPage = () => {

    const {sentencesLoadingStatus, sentences, sentencesPerUpload, sortType, currentPage, totalPages} = useSelector(state => state.sentences);
    const {words} = useSelector(state => state.words);

    const [addWordModalActive, setAddWordModalActive] = useState(false);
    const [addModalActive, setAddModalActive] = useState(false);
    const [modifyModalActive, setModifyModalActive] = useState(false);

    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);
	const [offset, setOffset] = useState(30);

    const [cuttedArrayOfSentences, setCuttedArrayOfSentences] = useState([]);
    const [filteredArrayLength, setFilteredArrayLength] = useState(0);
    const [selectedSentence, setSelectedSentence] = useState({});
    const [searchedSentences, setSearchedSentences] = useState('');
    const [selectedWord, setSelectedWord] = useState('');

    const dispatch = useDispatch();
    const {isAuth, id} = useAuth();
    
    const sortItems = [
        { name: 'from new'},
        { name: 'from old'},         
    ];
    
    const numberOfSentencesPerPage = [
        { name: 10},
        { name: 20},
        { name: 30},      
    ];

    const linkToSentences = {
        firstUrl: 'users',
        secondUrl: id,
        thirdUrl: 'sentences'
    }

    const linkToWords = {
        firstUrl: 'users',
        secondUrl: id,
        thirdUrl: 'words'
    }

    useEffect(() => {
        if (id !== null) {
            dispatch(fetchSentences(id));
            dispatch(fetchWords(id));
        }
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        if (!!activeSortTypeChanged) {
            dispatch(sortBy(sortType))
        } 
        // eslint-disable-next-line
    }, [sortType, sentences])

    useEffect(() => {
        if (addModalActive || modifyModalActive || addWordModalActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // eslint-disable-next-line
    }, [addModalActive, modifyModalActive, addWordModalActive]);

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
        setSelectedSentence({});
        // eslint-disable-next-line
    }, [searchedSentences.length]);

    useEffect(() => {
        setOffset(sentencesPerUpload * currentPage)
        // eslint-disable-next-line
    }, [currentPage]);
    
    useEffect(() => {
        if (searchedSentences.length > 0) {
            if (!(filteredArrayLength % sentencesPerUpload)) {
                dispatch(setTotalPages(filteredArrayLength/sentencesPerUpload))
            } else {
                dispatch(setTotalPages(Math.ceil((filteredArrayLength/sentencesPerUpload))))
            }
        } else {
            if (!(sentences.length % sentencesPerUpload)) {
                dispatch(setTotalPages(sentences.length/sentencesPerUpload))
            } else {
                dispatch(setTotalPages(Math.ceil((sentences.length/sentencesPerUpload))))
            }
        }
        // eslint-disable-next-line
    }, [sentences, sentencesPerUpload, searchedSentences.length, filteredArrayLength, totalPages])

    useEffect(() => {
        let lastIndex = currentPage * sentencesPerUpload;
        let firstIndex = lastIndex - sentencesPerUpload;

        if (searchedSentences.length > 0) {
            setCuttedArrayOfSentences(filteredArray(sentences).slice(firstIndex, lastIndex));
        } else {
            setCuttedArrayOfSentences(sentences.slice(firstIndex, lastIndex));
        }
        // eslint-disable-next-line
    }, [sentences, offset, searchedSentences.length, sentencesPerUpload, currentPage]);
    
    const filteredArray = (array) => {

        let data = [];
        
        if (searchedSentences.length > 0) {
            const searchWords = searchedSentences.split(' ');
            const englishPattern = /^[A-Za-z\s!.,?-]+$/;

            if (englishPattern.test(searchedSentences)) {
                data = array.filter(item => searchWords.every(word => item.english.some(element => element.includes(word))));
            } else {
                data = array.filter(item => searchWords.every(word => item.russian.some(element => element.includes(word))));
            }
        }
        
        setFilteredArrayLength(data.length)

        return data;
    }
    
    const onDeleteSentence = (id) => {
        const sentencesColRef = collection(database, linkToSentences.firstUrl, linkToSentences.secondUrl, linkToSentences.thirdUrl)
        
        if (window.confirm('Are you sure?')) {

            dispatch(deleteSentence(id));
            
            deleteDoc(doc(sentencesColRef, id));                

            setSelectedSentence({})

            setShowMessage(true)
            setMessage({
                text: "The word was successfully deleted!",
                color: 'green'
            })
        }
    }

    const handleAddModal = () => {
        setAddModalActive(!addModalActive);
    }

    const handleModifyModal = () => {
        if (selectedSentence !== undefined) {
            setModifyModalActive(!modifyModalActive);
        } else {
            setShowMessage(true);
            setMessage({
                text: "Choose the word!",
                color: 'red'
            })
        }
    }

    const handleAddWordModal = () => {
        setAddWordModalActive(!addWordModalActive);
    }

    const switchToFirstPage = () => {
        dispatch(setPage(1))
    }
    
    return isAuth ? (
        <>
            <Navigation 
                items={sentences}
                setSearched={setSearchedSentences}
                setOffset={setOffset}
                numberPerUpload={sentencesPerUpload}
            />
            <SortAndActions
                items={cuttedArrayOfSentences}
                handleAddModal={handleAddModal}
                filteredArrayLength={filteredArrayLength}
                sortItems={sortItems}
                active={sortType}
                textForSelectPopup={"Sort by:"}
                dispatchFunction={sortBy}
                activeTypeChanged={activeSortTypeChanged}
                address={linkToSentences}
            />
            <SentencesTable 
                words={words}
                items={sentences}
                loadingStatus={sentencesLoadingStatus}
                setSelectedSentence={setSelectedSentence}
                selectedSentence={selectedSentence}
                cuttedArrayOfSentences={cuttedArrayOfSentences}
                searchedSentences={searchedSentences}
                handleModifyModal={handleModifyModal}
                onDeleteSentence={onDeleteSentence}
                handleAddWordModal={handleAddWordModal}
                selectedWord={selectedWord}
                setSelectedWord={setSelectedWord}
            />
            <Footer
                cuttedArray={cuttedArrayOfSentences}
                filteredArrayLength={filteredArrayLength}
                numberPerUpload={sentencesPerUpload}
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
                numberOfItemsPerPage={numberOfSentencesPerPage}
                active={sentencesPerUpload}
                textForSelectPopup={"On the page:"}
                textForCounters={"sentences"}
                dispatchFunction={setSentencesPerUpload}
                switchToFirstPage={switchToFirstPage}
                loadingStatus={sentencesLoadingStatus}
                items={sentences}
            />
            <AddSentenceModal 
                width={600}
                height={310}
                maxLength={190}
                active={addModalActive} 
                setActive={setAddModalActive} 
                address={linkToSentences}
                func={addSentence}
                items={sentences}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
            />
            <AddWordModal 
                width={290}
                height={230}
                maxLength={30}
                active={addWordModalActive} 
                setActive={setAddWordModalActive} 
                address={linkToWords}
                func={addWord}
                items={words}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
                selectedWord={selectedWord}
            />
            <ModifySentenceModal
                width={600}
                height={310}
                maxLength={190}
                active={modifyModalActive} 
                setActive={setModifyModalActive} 
                address={linkToSentences}
                func={modifySentence}
                items={sentences}
                selected={selectedSentence}
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
    ) : null
}

export default SentencesPage;