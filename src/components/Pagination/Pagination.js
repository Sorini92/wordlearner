import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setPage, setTotalPages } from '../../store/slices/wordSlice';
import './pagination.scss';

const Pagination = ({addNewWords, words, cuttedArrayOfWords, searchedWord, selectedLetter}) => {

    const dispatch = useDispatch();
    const {currentPage, totalPages} = useSelector((state) => state.words);

    console.log(words.length)
    useEffect(() => {
        dispatch(setTotalPages(Math.round(words.length/34)))
    }, [words])

    const handlePageClick = (pageNumber) => {
        dispatch(setPage(pageNumber));
    };

    const renderPageNumbers = () => {
        
    };

    const elements = () => {
        return (
            <div className="pagination__pages">
                <div className="pagination__page">&laquo;</div>
                <div className="pagination__page">&#8249;</div>
                {renderPageNumbers()}
                <div className="pagination__page">&#8250;</div>
                <div className="pagination__page">&raquo;</div>
            </div>
        )
    }
    
    return (
        <div className='pagination'>
            {(words.length === cuttedArrayOfWords.length) || words.length < 36 || searchedWord.length > 0 || selectedLetter.length > 0 ? null : <button className='pagination__btn' onClick={() => addNewWords()}>More</button>}
            {words.length < 36 || searchedWord.length > 0 || selectedLetter.length > 0 ? null : elements()}
        </div>
    )
}

export default Pagination;