import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './pagination.scss';

const Pagination = ({items, cuttedArray, filteredArrayLength, numberPerUpload, currentPage, totalPages, setPage}) => {

    const [arrOfCurrPages, setArrOfCurrPages] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        const numberOfPages = []

        for (let i = 1; i <= totalPages; i++) {
            numberOfPages.push(i)
        }

        let tempNumberOfPages = [...arrOfCurrPages]
        
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
            dispatch(setPage(arrOfCurrPages[arrOfCurrPages.length-3] + 1)) 
        }
        else if (currentPage === dotsRight) {
            dispatch(setPage(arrOfCurrPages[3] + 2))
        }
    
        else if (currentPage === dotsLeft) {
            dispatch(setPage(arrOfCurrPages[3] - 2))
        }
    
        setArrOfCurrPages(tempNumberOfPages)
        dispatch(setPage(currentPage))
        // eslint-disable-next-line
    }, [currentPage, cuttedArray, totalPages])

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
                
                {arrOfCurrPages.map(((item, i) => {
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
            {(items.length <= numberPerUpload || cuttedArray.length < numberPerUpload || cuttedArray.length === filteredArrayLength) && (currentPage === 1 && totalPages < 2) ? null : elements()}
        </div>
    )
}

export default Pagination;