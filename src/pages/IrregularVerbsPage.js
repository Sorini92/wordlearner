import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from "react";
import useAuth from '../hooks/use-auth';
import { Helmet } from "react-helmet";
import {setTotalPages, fetchIrregularVerbs, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage, setLetter, setIsBlured} from '../store/slices/irregularVerbsSlice';
import IrregularVerbsTable from '../components/IrregularVerbsTable.js/IrregularVerbsTable';
import Spinner from '../components/Spinner/Spinner';
import Page from './Page';

const IrregularVerbsPage = () => {

    const {wordsLoadingStatus, verbs, wordsPerUpload, sortType, currentPage, totalPages, letter, isBlured} = useSelector(state => state.irregularVerbs);
    
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
    
    useEffect(() => {
        dispatch(fetchIrregularVerbs());
        // eslint-disable-next-line
    }, []);

    if (wordsLoadingStatus === "loading") {
        return <Spinner/>;
    }

    return isAuth ? (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="irregular verbs page"
                />
                <title>Irregular verbs</title>
            </Helmet>
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
                isBlured={isBlured}
                setIsBlured={setIsBlured}
            />
        </>
    ) : null
}

export default IrregularVerbsPage;