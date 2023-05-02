import './modification.scss';

const Modification = ({handleModal, onDeleteWord}) => {

    return (
        <div className='modification'>
            <button 
                className='modification__btn'
                onClick={() => handleModal()}
            >
                Add
            </button>
            <button className='modification__btn'>Modify</button>
            <button 
                className='modification__btn'
                onClick={() => onDeleteWord()}
            >
                Delete
            </button>
        </div>
    )
}

export default Modification;