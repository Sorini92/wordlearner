import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from "react";
import { Helmet } from "react-helmet";
import {deleteWord, deleteWords, addWord, modifyWord, setTotalPages, fetchWords, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage, setLetter, setIsBlured, setIsShowDate, setIsReverseWords, setIsShowTicks} from '../store/slices/wordSlice';
import useAuth from '../hooks/use-auth';
import WordsTable from "../components/WordsTable/WordsTable";
import Spinner from '../components/Spinner/Spinner';
import Page from './Page';


const WordsPage = () => {

    const {wordsLoadingStatus, words, wordsPerUpload, sortType, currentPage, totalPages, letter, isBlured, isShowDate, isReverseWords, isShowTicks} = useSelector(state => state.words);

    const dispatch = useDispatch();
    const {isAuth, id} = useAuth();

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

    if (wordsLoadingStatus === "loading") {
        return <Spinner/>;
    }

    return  isAuth ? (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="words page"
                />
                <title>Words</title>
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
                deleteItem={deleteWord}
                deleteItems={deleteWords}
                add={addWord}
                modify={modifyWord}
                setTotalPages={setTotalPages}
                TableComponent={WordsTable}
                items={words}
                letter={letter}
                setLetter={setLetter}
                isBlured={isBlured}
                isShowDate={isShowDate}
                isReverseWords={isReverseWords} 
                isShowTicks={isShowTicks}
                setIsBlured={setIsBlured}
                setIsShowDate={setIsShowDate}
                setIsReverseWords={setIsReverseWords}
                setIsShowTicks={setIsShowTicks}
            />
        </>
    ) : null
}

export default WordsPage;