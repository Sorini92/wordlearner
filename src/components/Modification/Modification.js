import './modification.scss';

const Modification = ({handleModifyModal, handleAddModal, onDeleteWord, selectedWord}) => {

    const onHandleModify = () => {
        if (selectedWord !== '') {
            handleModifyModal();
        } else {
            alert('Choose the word!')
        }
    }

    return (
        <div className='modification'>
            <button 
                className='modification__btn'
                onClick={() => handleAddModal()}
            >
                Add
            </button>
            <button 
                className='modification__btn'
                onClick={() => onHandleModify()}
            >
                Modify
            </button>
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