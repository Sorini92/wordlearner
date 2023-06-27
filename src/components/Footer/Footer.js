import Pagination from '../Pagination/Pagination';
import SelectPopup from "../SelectPopup/SelectPopup";
import PropTypes from 'prop-types';
import './footer.scss';

const Footer = ({textForCounters, cuttedArray, filteredArrayLength, loadingStatus, numberPerUpload, currentPage, totalPages, setPage, numberOfItemsPerPage, active, textForSelectPopup, dispatchFunction, items, switchToFirstPage}) => {
    return (
        <div className='footer'>
            <div className='footer__numberOfWords'>
                {cuttedArray.length !== 0 ? <div className='footer__numberOfWords'>Total {textForCounters}: {items.length}</div> : null}
                {cuttedArray.length !== 0 ? <div className='footer__numberOfWords'>Current {textForCounters}: {filteredArrayLength === 0 ? items.length : filteredArrayLength}</div> : null}
            </div>
            <Pagination 
                items={items}
                cuttedArray={cuttedArray}
                filteredArrayLength={filteredArrayLength}
                numberPerUpload={numberPerUpload}
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
                loadingStatus={loadingStatus}
            />
            {cuttedArray.length !== 0 ? 
            <SelectPopup 
                switchToFirstPage={switchToFirstPage}
                items={numberOfItemsPerPage} 
                active={active}
                textForSelectPopup={textForSelectPopup}
                dispatchFunction={dispatchFunction}
            /> : null}
        </div>
    )
}

Footer.propTypes = {
    textForCounters:  PropTypes.string.isRequired,
    cuttedArray:  PropTypes.array.isRequired,
    filteredArrayLength:  PropTypes.number.isRequired,
    loadingStatus:  PropTypes.string.isRequired,
    numberPerUpload:  PropTypes.number.isRequired, 
    switchToFirstPage:  PropTypes.func.isRequired, 
    currentPage:  PropTypes.number.isRequired,
    totalPages:  PropTypes.number.isRequired, 
    setPage:  PropTypes.func.isRequired, 
    numberOfItemsPerPage:  PropTypes.array.isRequired,
    active:  PropTypes.any.isRequired,
    textForSelectPopup:  PropTypes.string.isRequired, 
    dispatchFunction:  PropTypes.func.isRequired, 
    items:  PropTypes.array.isRequired
}

export default Footer;