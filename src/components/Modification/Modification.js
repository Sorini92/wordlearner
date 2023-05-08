import './modification.scss';

const Modification = ({handleModifyModal, handleAddModal, onDeleteWord, selected, setShowMessage, setMessage}) => {

    const onHandleModify = () => {
        if (selected !== undefined) {
            handleModifyModal();
        } else {
            setShowMessage(true);
            setMessage({
                text: "Choose the word!",
                color: 'red'
            })
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