import { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import ReverseArrows from '../ReverseArrows/ReverseArrow';
import Spinner from '../Spinner/Spinner';
import pencil from '../../resources/pencil.png';
import './wordsTable.scss';

const WordsTable = ({handleModifyModal, handleQuizModal, searchedWord, cuttedArrayOfWords, selectedLetter, setSelectedWord, selectedWords, setSelectedWords, onAddToFavorite, loadingStatus, items}) => {
    
    const [idForCompare, setIdForCompare] = useState('');
    const [isShowDate, setIsShowDate] = useState(false);
    const [isShowTicks, setIsShowTicks] = useState(false);
    const [reverseWords, setReverseWords] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isBlured, setIsBlured] = useState(false);
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
    
    const handleClick = (word) => {
        setSelectedWord(word)
        setIdForCompare(word.id);
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

    const handleShowTicksClick = () => {
        if (isShowTicks) {
            setIsChecked(false)
            setSelectedWords([]);
        }

        setIsShowTicks(!isShowTicks)
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
                        className={idForCompare !== item.id ? 'word' : 'word activeWord'} 
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
                            {reverseWords ? item.russian : item.english}
                        </td> 
                        <td 
                            className='wordsTable__translate'
                        >
                            <div className='wordsTable__translate-inner'>
                                <div
                                    onClick={() => handleUnblur(item.id)} 
                                    className={isItemBlurred ? 'blur' : ''}
                                    >
                                    {reverseWords ? item.english : item.russian}
                                </div> 
                                <div onClick={() => handleModifyModal()} className='wordsTable__translate-inner-pencil'>
                                    {/* {idForCompare !== item.id ? null : <img src={pencil} alt='modify pencil'/>} */}
                                    <img src={pencil} alt='modify pencil'/>
                                </div> 
                                <div 
                                    onClick={() => handleStarClick(item)} 
                                    className='wordsTable__translate-inner-star'>
                                    {item.favorite ? <>&#9733;</> : <>&#9734;</>}
                                </div> 
                            </div>
                        </td>
                        {isShowDate ? 
                            <td className='wordsTable__date'>
                                {isShowDate ? onFormattedDate(item.date) : null}
                            </td> 
                            : 
                        null}
                    </tr>
                </CSSTransition>
            )
        })
    }

    const table = () => {
        return (
            <>
                {items.length === 0 || (cuttedArrayOfWords.length === 0 && searchedWord.length > 0) || (cuttedArrayOfWords.length === 0 && selectedLetter.length > 0)? 
                    <div className='emptyTable'>There are no words!</div> 
                    : 
                    <div className='wordsTable__wrapper'>
                        <div className='wordsTable__settings'>

                            <button onClick={() => handleShowTicksClick()} className='wordsTable__btn-ticks'>
                                Ticks {isShowTicks ?<>&#8592;</> : <>&#8594;</>}
                            </button>
                            
                            <div className='wordsTable__settings-middle'>
                                <button 
                                    className='wordsTable__btn-blur' 
                                    onClick={() => handleQuizModal()}
                                >
                                    Games
                                </button>

                                <ReverseArrows 
                                    setReverseWords={setReverseWords} 
                                    reverseWords={reverseWords}
                                />
                                
                                <button 
                                    onClick={() => setIsBlured(!isBlured)} 
                                    className='wordsTable__btn-blur'
                                >
                                    Blur right
                                </button>
                            </div>
                            
                            <button onClick={() => setIsShowDate(!isShowDate)} className='wordsTable__btn-date'>
                                {isShowDate ? <>&#8594;</> : <>&#8592;</>} Date
                            </button> 
                        </div>
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
                                        {reverseWords ? 'Russian words' : 'English words'}
                                    </th> 
                                    <th className='wordsTable__translateHeader'>
                                        {reverseWords ? 'English words' : 'Russian words'}
                                    </th>
                                    {isShowDate ? 
                                        <th className='wordsTable__date'>
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
                }
            </>
        )
    }

    return (
        <>
            {loadingStatus === "loading" ? 
            <Spinner/>
            :
            loadingStatus === "error" ? <div className='error'>Something went wrong, error from server</div> : table()
            }
        </>
    )
}

export default WordsTable;