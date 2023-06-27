import PropTypes from 'prop-types';
import './modification.scss';

const Modification = ({handleAddModal, onDelete}) => {
    return (
        <div className='modification'>
            <button className='modification__btn' onClick={() => handleAddModal()}>Add</button>
            {onDelete ? <button className='modification__btn' onClick={() => onDelete()}>Delete</button> : null}
        </div>
    )
}

Modification.propTypes = {
    handleAddModal:  PropTypes.func,
    onDelete:  PropTypes.func
}

export default Modification;