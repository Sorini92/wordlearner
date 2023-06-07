import SelectPopup from "../SelectPopup/SelectPopup";
import Modification from "../Modification/Modification";
import './sortAndActions.scss';

const SortAndActions = ({handleAddModal, onDelete, filteredArrayLength, sortItems, active, text, dispatchFunction, activeTypeChanged, handleQuizModal}) => {
    return (
        <div className={handleAddModal && onDelete ? "modifying" : "modifying alone"}>
            {handleAddModal && onDelete ? 
                <Modification 
                    handleAddModal={handleAddModal} 
                    onDelete={onDelete}
                /> : 
                <div className="modification"/>
            }

            {handleQuizModal ? 
                <button className='modifying__quizbtn' onClick={() => handleQuizModal()}>
                    Games
                </button> : 
                null
            }

            {filteredArrayLength === 0 ? 
                <SelectPopup 
                    items={sortItems} 
                    active={active}
                    text={text}
                    dispatchFunction={dispatchFunction}
                    activeTypeChanged={activeTypeChanged}
                /> : 
                null
            }
        </div>
    )
}

export default SortAndActions;