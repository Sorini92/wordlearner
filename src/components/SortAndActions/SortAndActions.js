import SelectPopup from "../SelectPopup/SelectPopup";
import Modification from "../Modification/Modification";
import './sortAndActions.scss';

const SortAndActions = ({address, items, handleAddModal, onDelete, filteredArrayLength, sortItems, active, text, dispatchFunction, activeTypeChanged, handleQuizModal}) => {
    return (
        <div className={address.thirdUrl === 'words' ? "modifying" : "modifying alone"}>
            {address.thirdUrl === 'words' || address.thirdUrl === 'sentences'? 
                <Modification 
                    handleAddModal={handleAddModal} 
                    onDelete={onDelete}
                /> : 
                null
            }

            {handleQuizModal && (address.thirdUrl === 'words' || address.thirdUrl === 'favoriteWords') ? 
                <button className='modifying__quizbtn' onClick={() => handleQuizModal()}>
                    Games
                </button> : 
                null
            }

            {filteredArrayLength === 0 && items.length !== 0 ? 
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