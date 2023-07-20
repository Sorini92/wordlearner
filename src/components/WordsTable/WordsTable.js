import { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import pencil from '../../resources/pencil.png';
import star from '../../resources/star.png';
import fullStar from '../../resources/fullstar.png';
import './wordsTable.scss';

const WordsTable = ({
    handleModifyModal, 
    searchedWord, 
    cuttedArrayOfWords, 
    selectedLetter, 
    setSelectedWord, 
    selectedWords, 
    selectedWord, 
    setSelectedWords, 
    onAddToFavorite, 
    loadingStatus, 
    isShowDate, 
    isShowTicks, 
    isReverseWords, 
    isBlured, 
    items}) => {

    const [isChecked, setIsChecked] = useState(false);
    const [unbluredWord, setUnbluredWord] = useState('');

    const timerRef = useRef(null)

    const handleUnblur = (word) => {

        clearTimeout(timerRef.current);
        setUnbluredWord(word);

        timerRef.current = setTimeout(() => {
            setUnbluredWord('')
        }, 2000);

    }
    
    useEffect(() => () => clearTimeout(timerRef.current), [])
    
    useEffect(() => {
        if (!isShowTicks) {
            setIsChecked(false)
            setSelectedWords([]);
        }
        // eslint-disable-next-line
    }, [isShowTicks])

    useEffect(()=> {
        if (selectedWords.length === 0) {
            setIsChecked(false);
        }
    }, [selectedWords.length]);
    
    const handleClick = (word) => {
        setSelectedWord(word)
    }

    const handleSelectAllClick = (event) => {
        setIsChecked(event.target.checked);

        if (event.target.checked) {
            const newSelected = cuttedArrayOfWords.map((n) => n.id);
            setSelectedWords(newSelected);
            return;
        }
        
        setSelectedWords([]);
    };

    const handleSelect = (id) => {

        const selectedIndex = selectedWords.indexOf(id);

        let newSelected = [];
        
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedWords, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedWords.slice(1));
        } else if (selectedIndex === selectedWords.length - 1) {
            newSelected = newSelected.concat(selectedWords.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedWords.slice(0, selectedIndex),
                selectedWords.slice(selectedIndex + 1)
            );
        }
        
        setSelectedWords(newSelected);
    }

    const onFormattedDate = (date) => {
        let normalDate = new Date(date)
        
        return `${normalDate.toLocaleTimeString()} ${normalDate.toLocaleDateString()}`;
    }

    const handleStarClick = (word) => {
        onAddToFavorite(word)
    }

    

    const elements = (array) => {
        return array.map((item) => {

            const isItemBlurred = isBlured && unbluredWord !== item.id;

            return (
                <CSSTransition 
                    timeout={500}
                    key={item.id}
                    classNames={{
                        appear: 'word-appear',
                        appearActive: 'word-appear-active',
                        enter: 'word-enter',
                        enterActive: 'word-enter-active',
                        exit: 'word-exit',
                        exitActive: 'word-exit-active'
                    }}
                >
                    <tr 
                        className={selectedWord.id !== item.id ? 'word' : 'word activeWord'} 
                        onClick={() => handleClick(item)}
                    >
                        {isShowTicks ? 
                            <td className='wordsTable__ticks'>
                                <input 
                                    checked={selectedWords.includes(item.id) || isChecked} 
                                    onChange={(e) => handleSelect(item.id)} 
                                    type='checkbox'
                                />
                            </td>
                            :
                            null
                        }
                        <td className='wordsTable__word'>
                            {isReverseWords ? item.russian : item.english}
                        </td> 
                        <td className='wordsTable__translate' style={isShowDate ? {'paddingRight': 0} : null}>
                            <div className='wordsTable__translate-inner'>
                                <div
                                    onClick={() => handleUnblur(item.id)} 
                                    className={isItemBlurred ? 'blur' : ''}
                                    >
                                    {isReverseWords ? item.english : item.russian}
                                </div> 
                                {!isShowDate ? 
                                <>
                                    <div onClick={() => handleModifyModal()} className='wordsTable__translate-inner-pencil'>
                                        <img src={pencil} alt='modify pencil'/>
                                    </div> 
                                    <div 
                                        onClick={() => handleStarClick(item)} 
                                        className='wordsTable__translate-inner-star'>
                                        {item.favorite ? 
                                            <img className='' src={fullStar} alt="full star"/> : 
                                            <img src={star} alt="star"/> 
                                        }
                                    </div>
                                </> : null
                                }
                            </div>
                        </td>
                        {isShowDate ? 
                            <td className='wordsTable__date'>
                                <div className='wordsTable__translate-inner'>
                                    {isShowDate ? onFormattedDate(item.date) : null}
                                    <div onClick={() => handleModifyModal()} className='wordsTable__translate-inner-pencil'>
                                        <img src={pencil} alt='modify pencil'/>
                                    </div> 
                                    <div 
                                        onClick={() => handleStarClick(item)} 
                                        className='wordsTable__translate-inner-star'>
                                        {item.favorite ? 
                                            <img className='' src={fullStar} alt="full star"/> : 
                                            <img src={star} alt="star"/> 
                                        }
                                    </div>
                                </div>
                                
                            </td> 
                            : 
                        null}
                    </tr>
                </CSSTransition>
            )
        })
    }
    
    const table = () => {

        if (items.length === 0) {
            return (
                <div className='emptyTable'>You have not added words yet!</div>
            )
        }

        if ((cuttedArrayOfWords.length === 0 && selectedLetter.length > 0)) {
            return (
                <div className='emptyTable'>There are no words!</div>
            )
        }

        if ((cuttedArrayOfWords.length === 0 && searchedWord.length > 0)) {
            return (
                <div className='emptyTable'>No searched word!</div>
            )
        }

        return (
            <div className='wordsTable__wrapper'>
                <table className='wordsTable'>
                    <thead>
                        <tr>
                            {isShowTicks ? 
                                <th className='wordsTable__ticks'>
                                    <input type='checkbox' checked={isChecked} onChange={handleSelectAllClick}/>
                                </th> 
                                :
                                null
                            }
                            <th className='wordsTable__wordHeader'>
                                {isReverseWords ? 'Russian words' : 'English words'}
                            </th> 
                            <th className='wordsTable__translateHeader'>
                                {isReverseWords ? 'English words' : 'Russian words'}
                            </th>
                            {isShowDate ? 
                                <th className='wordsTable__dateHeader'>
                                    Date of adding
                                </th> 
                                : 
                                null
                            }
                        </tr>
                    </thead>
                    <TransitionGroup component="tbody">
                        {elements(cuttedArrayOfWords)}
                    </TransitionGroup>
                </table>
            </div>
        )
    }
    
    if (loadingStatus === "loading") {
        return <Spinner/>;
    } else if (loadingStatus === "error") {
        return <div className='error'>Something went wrong, error from server</div>
    }

    return (
        <>
            {table()}
        </>
    )
}

WordsTable.propTypes = {
    handleModifyModal: PropTypes.func.isRequired, 
    searchedWord: PropTypes.string.isRequired, 
    cuttedArrayOfWords: PropTypes.array.isRequired, 
    selectedLetter: PropTypes.string.isRequired, 
    setSelectedWord: PropTypes.func.isRequired, 
    selectedWords: PropTypes.array.isRequired, 
    selectedWord: PropTypes.object.isRequired, 
    setSelectedWords: PropTypes.func.isRequired, 
    onAddToFavorite: PropTypes.func.isRequired, 
    loadingStatus: PropTypes.string.isRequired, 
    isShowDate: PropTypes.bool, 
    isShowTicks: PropTypes.bool, 
    isReverseWords: PropTypes.bool, 
    isBlured: PropTypes.bool, 
    items: PropTypes.array.isRequired,
}

export default WordsTable;