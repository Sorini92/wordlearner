import './modification.scss';

const Modification = ({handleAddModal, onDelete}) => {

    return (
        <div className='modification'>
            <button className='modification__btn' onClick={() => handleAddModal()}>Add</button>
            <button className='modification__btn' onClick={() => onDelete()}>Delete</button>
        </div>
    )
}

export default Modification;