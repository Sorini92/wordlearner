import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setPage, setTotalPages } from '../../store/slices/wordSlice';
import './pagination.scss';

const Pagination = ({addNewWords, words, cuttedArrayOfWords, filteredArreyLength, wordsPerUpload}) => {

    const dispatch = useDispatch();
    const {currentPage, totalPages} = useSelector((state) => state.words);

    console.log(words.length)

    useEffect(() => {
        dispatch(setTotalPages(Math.round(words.length/wordsPerUpload)))
    }, [words])

    const handlePageClick = (pageNumber) => {
        dispatch(setPage(pageNumber));
    };

    const handleNextClick = (pageNumber) => {
        dispatch(setPage(pageNumber + 1));
    };

    const handlePrevClick = (pageNumber) => {
        dispatch(setPage(pageNumber - 1));
    };

    const handleFirstClick = () => {
        dispatch(setPage(1));
    };

    const handleLastClick = () => {
        dispatch(setPage(totalPages));
    };

    const renderPageNumbers = () => {
        let pageNumbers = [];
      
        if (totalPages <= 7) {
          for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
              <div
                key={i}
                className={`${i === currentPage ? 'pagination__activepage' : 'pagination__page'}`}
                onClick={() => handlePageClick(i)}
              >
                {i}
              </div>
            );
          }
        } 

        return pageNumbers;
      };
    
    const prevBtns = () => {
        if (currentPage === 1) {
            return (
                <>
                    <button disabled className="pagination__prev disabled" onClick={() => handleFirstClick()}>&laquo;</button>
                    <button disabled className="pagination__prev disabled" onClick={() => handlePrevClick(currentPage)}>&#8249;</button>
                </>
            )
        } else {
            return (
                <>
                    <button className="pagination__prev" onClick={() => handleFirstClick()}>&laquo;</button>
                    <button className="pagination__prev" onClick={() => handlePrevClick(currentPage)}>&#8249;</button>
                </>
            )
        }
    }

    const nextBtns = () => {
        if (currentPage === totalPages) {
            return (
                <>
                    <button disabled className="pagination__next disabled" onClick={() => handleNextClick(currentPage)}>&#8250;</button>
                    <button disabled className="pagination__next disabled" onClick={() => handleLastClick()}>&raquo;</button>
                </>
            )
        } else {
            return (
                <>
                    <button className="pagination__next" onClick={() => handleNextClick(currentPage)}>&#8250;</button>
                    <button className="pagination__next" onClick={() => handleLastClick()}>&raquo;</button>
                </>
            )
        }
    }

    const elements = () => {
        return (
            <div className="pagination__pages">
                {prevBtns()}
                {renderPageNumbers()}
                {nextBtns()}
            </div>
        )
    }
    
    return (
        <div className='pagination'>
            {/* {(words.length === cuttedArrayOfWords.length) || words.length < 34 || searchedWord.length > 0 || selectedLetter.length > 0 ? null : <button className='pagination__btn' onClick={() => addNewWords()}>More</button>} */}
            {/* {words.length < 34 || searchedWord.length > 0 || selectedLetter.length > 0 ? null : elements()} */}
            {(words.length === cuttedArrayOfWords.length) || words.length < wordsPerUpload || cuttedArrayOfWords.length < wordsPerUpload || cuttedArrayOfWords.length === filteredArreyLength ? null : <button className='pagination__btn' onClick={() => addNewWords()}>More</button>}
            {words.length < wordsPerUpload || cuttedArrayOfWords.length < wordsPerUpload || cuttedArrayOfWords.length === filteredArreyLength ? null : elements()}
        </div>
    )
}

export default Pagination;