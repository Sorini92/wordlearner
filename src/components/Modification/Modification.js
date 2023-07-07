import PropTypes from 'prop-types';
import add from "../../resources/add.svg";
import remove from "../../resources/delete.svg";
import './modification.scss';

const Modification = ({handleAddModal, onDelete}) => {
    return (
        <div className='modification'>
            <img onClick={() => handleAddModal()} className='modification__icon' src={add} alt="add"/>
            {onDelete ? <img onClick={() => onDelete()} className='modification__icon' src={remove} alt="delete"/> : null}
        </div>
    )
}

Modification.propTypes = {
    handleAddModal:  PropTypes.func,
    onDelete:  PropTypes.func
}

export default Modification;