import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPage, setTotalPages } from '../../store/slices/wordSlice';
import './pagination.scss';

const Pagination = ({addNewWords, words, cuttedArrayOfWords, filteredArreyLength, wordsPerUpload}) => {

    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

    const dispatch = useDispatch();
    const {currentPage, totalPages} = useSelector((state) => state.words);

    useEffect(() => {
        dispatch(setTotalPages(Math.round(words.length/wordsPerUpload)))
    }, [words])

    useEffect(() => {
        const numberOfPages = []
        for (let i = 1; i <= totalPages; i++) {
            numberOfPages.push(i)
        }

        let tempNumberOfPages = [...arrOfCurrButtons]
        
        let dotsInitial = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'
    
        if (numberOfPages.length < 8) {
          tempNumberOfPages = numberOfPages
        }
    
        else if (currentPage >= 1 && currentPage <= 4) {
          tempNumberOfPages = [1, 2, 3, 4, 5, dotsInitial, numberOfPages.length]
        }
    
        else if (currentPage === 4) {
          const sliced = numberOfPages.slice(0, 5)
          tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
        }
    
        else if (currentPage > 4 && currentPage < numberOfPages.length - 2) {            
          const sliced1 = numberOfPages.slice(currentPage - 2, currentPage)                 
          const sliced2 = numberOfPages.slice(currentPage, currentPage + 1)                 
          tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length])
        }
        
        else if (currentPage > numberOfPages.length - 5) {              
          const sliced = numberOfPages.slice(numberOfPages.length - 5)      
          tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
        }
        
        else if (currentPage === dotsInitial) {
            dispatch(setPage(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1)) 
        }
        else if (currentPage === dotsRight) {
            dispatch(setPage(arrOfCurrButtons[3] + 2))
        }
    
        else if (currentPage === dotsLeft) {
            dispatch(setPage(arrOfCurrButtons[3] - 2))
        }
    
        setArrOfCurrButtons(tempNumberOfPages)
        dispatch(setPage(currentPage))
    }, [currentPage, cuttedArrayOfWords])

    const handlePageClick = (pageNumber) => {
        dispatch(setPage(pageNumber));
    };

    const prevBtns = () => {
        if (currentPage === 1) {
            return (
                <>
                    <button disabled className="pagination__prev disabled" onClick={() => dispatch(setPage(1))}>&laquo;</button>
                    <button disabled className="pagination__prev disabled" onClick={() => dispatch(setPage(currentPage - 1))}>&#8249;</button>
                </>
            )
        } else {
            return (
                <>
                    <button className="pagination__prev" onClick={() => dispatch(setPage(1))}>&laquo;</button>
                    <button className="pagination__prev" onClick={() => dispatch(setPage(currentPage - 1))}>&#8249;</button>
                </>
            )
        }
    }

    const nextBtns = () => {
        if (currentPage === totalPages) {
            return (
                <>
                    <button disabled className="pagination__next disabled" onClick={() => dispatch(setPage(currentPage + 1))}>&#8250;</button>
                    <button disabled className="pagination__next disabled" onClick={() =>  dispatch(setPage(totalPages))}>&raquo;</button>
                </>
            )
        } else {
            return (
                <>
                    <button className="pagination__next" onClick={() => dispatch(setPage(currentPage + 1))}>&#8250;</button>
                    <button className="pagination__next" onClick={() => dispatch(setPage(totalPages))}>&raquo;</button>
                </>
            )
        }
    }

    const elements = () => {
        return (
            <div className="pagination__pages">
                {prevBtns()}
               {arrOfCurrButtons.map(((item, i) => {
                    return (
                        <div
                            key={i}
                            className={`${item === currentPage ? 'pagination__activepage' : 'pagination__page'}`}
                            onClick={() => handlePageClick(item)}
                        >
                            {item}
                        </div>
                    )
                }))}
                {nextBtns()}
            </div>
        )
    }
    
    return (
        <div className='pagination'>
            {(words.length === cuttedArrayOfWords.length) || words.length < wordsPerUpload || cuttedArrayOfWords.length < wordsPerUpload || cuttedArrayOfWords.length === filteredArreyLength ? null : <button className='pagination__btn' onClick={() => addNewWords()}>More</button>}
            {words.length < wordsPerUpload || cuttedArrayOfWords.length < wordsPerUpload || cuttedArrayOfWords.length === filteredArreyLength ? null : elements()}
        </div>
    )
}

export default Pagination;