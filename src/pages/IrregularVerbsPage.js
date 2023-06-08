import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from "react";
import {setTotalPages, fetchIrregularVerbs, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage} from '../store/slices/irregularVerbsSlice';
import useAuth from '../hooks/use-auth';
import Navigation from "../components/Navigation/Navigation";
import AlpabetFilter from '../components/AlphabetFilter/AlphabetFilter';
import IrregularVerbsTable from '../components/IrregularVerbsTable.js/IrregularVerbsTable';
import ArrowScrollUp from '../components/ArrowScrollUp/ArrowScrollUp';
import WordsNavigation from '../components/WordsNavigation/WordsNavigation';
import Footer from '../components/Footer/Footer';
import SortAndActions from '../components/SortAndActions/SortAndActions';

const IrregularVerbsPage = () => {

    const {verbs, wordsPerUpload, sortType, currentPage, totalPages} = useSelector(state => state.irregularVerbs);

    const [searchedWord, setSearchedWord] = useState([]);
    const [cuttedArrayOfWords, setCuttedArrayOfWords] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState('');
    const [filteredArrayLength, setFilteredArrayLength] = useState(0);
    const [offset, setOffset] = useState(30);
    
    const dispatch = useDispatch();
    const {isAuth} = useAuth();

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
    }, [wordsPerUpload, filteredArrayLength]);


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
            if (!(verbs.length % wordsPerUpload)) {
                dispatch(setTotalPages(verbs.length/wordsPerUpload))
            } else {
                dispatch(setTotalPages(Math.ceil((verbs.length/wordsPerUpload))))
            }
        }
        // eslint-disable-next-line
    }, [verbs, wordsPerUpload, selectedLetter, searchedWord.length, filteredArrayLength, totalPages])

    useEffect(() => {
        let lastIndex = currentPage * wordsPerUpload;
        let firstIndex = lastIndex - wordsPerUpload;

        if (selectedLetter.length !== 0 || searchedWord.length > 0) {
            setCuttedArrayOfWords(filteredElements(verbs).slice(firstIndex, lastIndex));
        } else {
            setCuttedArrayOfWords(verbs.slice(firstIndex, lastIndex));
        }
        // eslint-disable-next-line
    }, [verbs, offset, selectedLetter, searchedWord.length, wordsPerUpload, currentPage]);

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

        setFilteredArrayLength(data.length)
        return data;
    }

    return isAuth ? (
        <>
            <Navigation 
                setSearched={setSearchedWord}
                setOffset={setOffset}
                numberPerUpload={wordsPerUpload}
            />
            <WordsNavigation
                showSetting={false}
            />
            <SortAndActions
                items={cuttedArrayOfWords}
                filteredArrayLength={filteredArrayLength}
                sortItems={sortItems}
                active={sortType}
                text={"Sort by:"}
                dispatchFunction={sortBy}
                activeTypeChanged={activeSortTypeChanged}
            />
            <AlpabetFilter 
                setSelectedLetter={setSelectedLetter} 
                setOffset={setOffset}
                wordsPerUpload={wordsPerUpload}
                setFilteredArrayLength={setFilteredArrayLength}
            />
            <IrregularVerbsTable
                searchedWord={searchedWord}
                cuttedArrayOfWords={cuttedArrayOfWords}
                selectedLetter={selectedLetter}
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
                items={verbs}
            />
            <ArrowScrollUp/>
        </>
    ) : null
}

export default IrregularVerbsPage;