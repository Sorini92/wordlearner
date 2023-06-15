import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSentences, sortBy, activeSortTypeChanged, addSentence, modifySentence, setTotalPages, setSentencesPerUpload, setPage, deleteSentence} from '../store/slices/sentencesSlice';
import database from "../firebase";
import {deleteDoc, collection, doc, setDoc} from "firebase/firestore"; 
import useAuth from '../hooks/use-auth';
import Navigation from "../components/Navigation/Navigation";
import SentencesTable from "../components/SentencesTable/SentencesTable";
import SortAndActions from '../components/SortAndActions/SortAndActions';
import Message from '../components/Message/Message';
import AddSentenceModal from '../components/AddSentenceModal/AddSentenceModal';
import ModifySentenceModal from '../components/ModifySentenceModal/ModifySentenceModal';
import ArrowScrollUp from '../components/ArrowScrollUp/ArrowScrollUp';
import Footer from '../components/Footer/Footer';

const SentencesPage = () => {

    const {sentencesLoadingStatus, sentences, sentencesPerUpload, sortType, currentPage, totalPages} = useSelector(state => state.sentences);

    const [addModalActive, setAddModalActive] = useState(false);
    const [modifyModalActive, setModifyModalActive] = useState(false);

    const [message, setMessage] = useState({});
    const [showMessage, setShowMessage] = useState(false);
	const [offset, setOffset] = useState(30);

    const [cuttedArrayOfSentences, setCuttedArrayOfSentences] = useState([]);
    const [filteredArrayLength, setFilteredArrayLength] = useState(0);
    const [selectedSentence, setSelectedSentence] = useState({});
    const [searchedSentences, setSearchedSentences] = useState([]);

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

    useEffect(() => {
        if (id !== null) {
            dispatch(fetchSentences(id));
        }
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        dispatch(setPage(1))
        // eslint-disable-next-line
    }, [sentencesPerUpload, filteredArrayLength]);

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

            if (!!searchedSentences.match(/[^а-я]/g)) {
                data = array.filter(item => searchWords.every(word => item.english.some(element => element.includes(word))));
            } else {
                data = array.filter(item => searchWords.every(word => item.russian.some(element => element.includes(word))));
            }
        }

        setFilteredArrayLength(data.length)

        return data;
    }
    
    const onDeleteSentence = () => {
        const sentencesColRef = collection(database, linkToSentences.firstUrl, linkToSentences.secondUrl, linkToSentences.thirdUrl)
        
        if (selectedSentence.id !== undefined) {
            if (window.confirm('Are you sure?')) {

                dispatch(deleteSentence(selectedSentence.id));
                
                deleteDoc(doc(sentencesColRef, selectedSentence.id));                

                setSelectedSentence({})

                setShowMessage(true)
                setMessage({
                    text: "The word was successfully deleted!",
                    color: 'green'
                })
            }
        } else {
            setShowMessage(true)
            setMessage({
                text: "Choose the sentence!",
                color: 'red'
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

    return isAuth ? (
        <>
            <Navigation 
                setSearched={setSearchedSentences}
                setOffset={setOffset}
                numberPerUpload={sentencesPerUpload}
            />
            <SortAndActions
                items={cuttedArrayOfSentences}
                handleAddModal={handleAddModal}
                onDelete={onDeleteSentence}
                filteredArrayLength={filteredArrayLength}
                sortItems={sortItems}
                active={sortType}
                textForSelectPopup={"Sort by:"}
                dispatchFunction={sortBy}
                activeTypeChanged={activeSortTypeChanged}
                address={linkToSentences}
            />
            <SentencesTable 
                items={cuttedArrayOfSentences}
                loadingStatus={sentencesLoadingStatus}
                setSelectedSentence={setSelectedSentence}
                selectedSentence={selectedSentence}
                cuttedArrayOfSentences={cuttedArrayOfSentences}
                searchedSentences={searchedSentences}
                handleModifyModal={handleModifyModal}
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