import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from "react";
import {setTotalPages, fetchIrregularVerbs, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage, setLetter} from '../store/slices/irregularVerbsSlice';
import useAuth from '../hooks/use-auth';
import IrregularVerbsTable from '../components/IrregularVerbsTable.js/IrregularVerbsTable';
import Page from './Page';

const IrregularVerbsPage = () => {

    const {wordsLoadingStatus, verbs, wordsPerUpload, sortType, currentPage, totalPages, letter} = useSelector(state => state.irregularVerbs);
    
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

    const linkToWords = {
        thirdUrl: 'irregularVerb'
    }

    const tableSettings = {
        blur: 'verbs-isBluredWords',
    }
    
    useEffect(() => {
        dispatch(fetchIrregularVerbs());
        // eslint-disable-next-line
    }, []);

    return isAuth ? (
        <>
            <Page
                sortItems={sortItems}
                sortType={sortType}
                sortByFunction={sortBy}
                activeSortTypeChanged={activeSortTypeChanged}
                setNumberPerUpload={setWordsPerUpload}
                numberPerUpload={wordsPerUpload}
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
                numberOfItemsPerPage={numberOfWordsPerPage}
                address={linkToWords}
                wordsLoadingStatus={wordsLoadingStatus}
                setTotalPages={setTotalPages}
                TableComponent={IrregularVerbsTable}
                items={verbs}
                letter={letter}
                setLetter={setLetter}
                tableSettings={tableSettings}
            />
        </>
    ) : null
}

export default IrregularVerbsPage;