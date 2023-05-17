import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {setTotalPages, fetchIrregularVerbs, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage} from '../store/slices/irregularVerbsSlice';
import useAuth from '../hooks/use-auth';
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import SelectPopup from "../components/SelectPopup/SelectPopup";
import AlpabetFilter from '../components/AlphabetFilter/AlphabetFilter';
import IrregularVerbsTable from '../components/IrregularVerbsTable.js/IrregularVerbsTable';
import Pagination from '../components/Pagination/Pagination';

const IrregularVerbsPage = () => {

    const {words, wordsPerUpload, sortType, currentPage, totalPages} = useSelector(state => state.irregularVerbs);

    const [searchedWord, setSearchedWord] = useState([]);
    const [cuttedArrayOfWords, setCuttedArrayOfWords] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState('');
    const [filteredArreyLength, setFilteredArreyLength] = useState(0);
    const [offset, setOffset] = useState(30);
    
    const dispatch = useDispatch();
    const {isAuth} = useAuth();
    const navigate = useNavigate();

    const sortItems = [        
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
    
    useEffect(() => {
        dispatch(fetchIrregularVerbs());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(setPage(1))
        // eslint-disable-next-line
    }, [wordsPerUpload, words, filteredArreyLength]);

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

    const filteredElements = (array) => {
        let data = [];

        if (searchedWord.length > 0) {
            if (!!searchedWord.match(/[^а-я]/g)) {
                data = array.filter(item => item.baseForm.toLowerCase().includes(searchedWord))
            } else {
                data = array.filter(item => item.translation.toLowerCase().includes(searchedWord))
            }
        } else {
            if (selectedLetter.length !== 0) {
                if (!!selectedLetter.match(/[^а-я]/g)) {
                    data = array.filter(item => item.baseForm.toLowerCase().slice(0, 1) === selectedLetter)
                } else {
                    data = array.filter(item => item.translation.toLowerCase().slice(0, 1) === selectedLetter)
                }
            } 
        }

        setFilteredArreyLength(data.length)
        return data;
    }

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
            setCuttedArrayOfWords(filteredElements(words).slice(0, offset));
        } else {
            setFilteredArreyLength(0)
            setCuttedArrayOfWords(words.slice(0, offset));
        }
        // eslint-disable-next-line
    }, [words, offset, selectedLetter, searchedWord.length, wordsPerUpload]);

    const addNewWords = () => {
		if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            dispatch(setPage(currentPage + 1))
            setOffset(offset + wordsPerUpload);
		    setCuttedArrayOfWords([...cuttedArrayOfWords, ...filteredElements(words).slice(offset, offset + wordsPerUpload)]);
        } else {
            dispatch(setPage(currentPage + 1))
            setOffset(offset + wordsPerUpload);
		    setCuttedArrayOfWords([...cuttedArrayOfWords, ...words.slice(offset, offset + wordsPerUpload)]);
        }
	}

    return (
        <>
            <Header/>
            <Navigation 
                setSearched={setSearchedWord}
                setOffset={setOffset}
                numberPerUpload={wordsPerUpload}
            />
            <div className="modifyingIrregularVerbs">
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
            <IrregularVerbsTable
                searchedWord={searchedWord}
                cuttedArrayOfWords={cuttedArrayOfWords}
                selectedLetter={selectedLetter}
            />
            <div className='footer'>
                <div className='footer__numberOfWords'>
                    {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Total verbs: {words.length}</div> : null}
                    {cuttedArrayOfWords.length !== 0 ? <div className='footer__numberOfWords'>Current verbs: {filteredArreyLength === 0 ? words.length : filteredArreyLength}</div> : null}
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
        </>
    )
}

export default IrregularVerbsPage;