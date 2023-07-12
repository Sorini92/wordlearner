import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from "react"; 
import useAuth from '../hooks/use-auth';
import { Helmet } from "react-helmet";
import {modifyWord, deleteWord, setTotalPages, fetchFavorites, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage, setLetter, setIsBlured, setIsShowDate, setIsReverseWords} from '../store/slices/favoritesSlice';
import WordsTable from '../components/WordsTable/WordsTable';
import Page from './Page';

const FavoritesPage = () => {

    const {favorites, wordsLoadingStatus,  wordsPerUpload, sortType, currentPage, totalPages, letter, isBlured, isShowDate, isReverseWords} = useSelector(state => state.favorites);

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
        thirdUrl: 'favoriteWords'
    }
    
    useEffect(() => {
        if (id !== null) {
            dispatch(fetchFavorites(id));
        }
        // eslint-disable-next-line
    }, [id]);

    return isAuth ? (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="favorite words page"
                />
                <title>Favorite words</title>
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
                modify={modifyWord}
                setTotalPages={setTotalPages}
                TableComponent={WordsTable}
                items={favorites}
                letter={letter}
                setLetter={setLetter}
                isBlured={isBlured}
                isShowDate={isShowDate}
                isReverseWords={isReverseWords} 
                setIsBlured={setIsBlured}
                setIsShowDate={setIsShowDate}
                setIsReverseWords={setIsReverseWords}
            />
        </>
    ) : null
}

export default FavoritesPage;