import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from "react"; 
import {modifyWord, deleteWord, setTotalPages, fetchFavorites, sortBy, activeSortTypeChanged, setWordsPerUpload, setPage} from '../store/slices/favoritesSlice';
import useAuth from '../hooks/use-auth';
import WordsTable from '../components/WordsTable/WordsTable';
import Page from './Page';

const FavoritesPage = () => {

    const {favorites, wordsLoadingStatus,  wordsPerUpload, sortType, currentPage, totalPages} = useSelector(state => state.favorites);

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

    const tableSettings = {
        date: 'favorites-date-column',
        blur: 'favorites-isBluredWords',
        reverse: 'favorites-isReverseWords'
    }
    
    useEffect(() => {
        if (id !== null) {
            dispatch(fetchFavorites(id));
        }
        // eslint-disable-next-line
    }, [id]);

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
                deleteItem={deleteWord}
                modify={modifyWord}
                setTotalPages={setTotalPages}
                TableComponent={WordsTable}
                items={favorites}
                tableSettings={tableSettings}
            />
        </>
    ) : null
}

export default FavoritesPage;