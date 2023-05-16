import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import ReverseArrows from '../ReverseArrows/ReverseArrow';
import Spinner from '../Spinner/Spinner';
import './table.scss';

const Table = ({searchedWord, cuttedArrayOfWords, selectedLetter, setSelectedWord, selectedWords, setSelectedWords}) => {
    
    const {wordsLoadingStatus, words} = useSelector(state => state.words)

    const [idForCompare, setIdForCompare] = useState('');
    const [isShowDate, setIsShowDate] = useState(false);
    const [isShowTicks, setIsShowTicks] = useState(false);
    const [reverseWords, setReverseWords] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isBlured, setIsBlured] = useState(false);
    const [unbluredWord, setUnbluredWord] = useState('');
    
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
        const formattedDate = `${normalDate.toLocaleTimeString()} ${normalDate.toLocaleDateString()}`;
        
        return formattedDate
    }

    const handleUnblur = (word) => {
        setUnbluredWord(word);

        let timer = setTimeout(() => {
            setUnbluredWord('')
        }, 2000);

        //clearTimeout(timer)        
    }
    
    const elements = (array) => {
        return array.map((item) => {
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
                            <td className='table__ticks'>
                                <input 
                                    checked={selectedWords.includes(item.id) || isChecked} 
                                    onChange={(e) => handleSelect(item.id)} 
                                    type='checkbox'
                                />
                            </td>
                            :
                            null
                        }
                        {reverseWords ? 
                            <>
                                <td className='table__word'>
                                    {item.russian}
                                </td> 
                                <td 
                                    onClick={() => handleUnblur(item.id)}
                                    className={isBlured ? `table__translate ${unbluredWord === item.id ? '' : 'blur'}` : 'table__translate'}
                                >
                                    {item.english}
                                </td>
                            </>
                            : 
                            <>
                                <td className='table__word'>
                                    {item.english}
                                </td> 
                                <td 
                                    onClick={() => handleUnblur(item.id)}
                                    className={isBlured ? `table__translate ${unbluredWord === item.id ? '' : 'blur'}` : 'table__translate'}
                                >
                                    {item.russian}
                                </td>
                            </>
                        }
                        {isShowDate ? 
                            <td className='table__date'>
                                {onFormattedDate(item.date)}
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
                {words.length === 0 || (cuttedArrayOfWords.length === 0 && searchedWord.length > 0) || (cuttedArrayOfWords.length === 0 && selectedLetter.length > 0)? 
                    <div className='emptyTable'>There are no words!</div> 
                    : 
                    <div className='table__wrapper'>
                        <div className='table__settings'>
                            {isShowTicks ? 
                                <button onClick={() => setIsShowTicks(!isShowTicks)} className='table__btn-ticks'>Ticks &#8592;</button>
                                :
                                <button onClick={() => setIsShowTicks(!isShowTicks)} className='table__btn-ticks'>Ticks &#8594;</button>
                            }
                            <div className='table__settings-middle'>
                                <ReverseArrows 
                                    setReverseWords={setReverseWords} 
                                    reverseWords={reverseWords}
                                />
                                <button onClick={() => setIsBlured(!isBlured)} className='table__btn-blur'>Blur</button>
                            </div>
                            {isShowDate ? 
                                <button onClick={() => setIsShowDate(!isShowDate)} className='table__btn-date'>&#8594; Date</button> 
                                : 
                                <button onClick={() => setIsShowDate(!isShowDate)} className='table__btn-date'>&#8592; Date</button>
                            }
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    {isShowTicks ? 
                                        <th 
                                            onChange={handleSelectAllClick}  
                                            className='table__ticks'
                                            checked={isChecked}
                                        >
                                            <input type='checkbox'/>
                                        </th> 
                                        :
                                        null
                                    }
                                    {reverseWords ? 
                                        <>
                                            <th className='table__wordHeader'>
                                                Russian words
                                            </th> 
                                            <th className='table__translateHeader'>
                                                English words
                                            </th>
                                        </>
                                        : 
                                        <>
                                            <th className='table__wordHeader'>
                                                English words
                                            </th>
                                            <th className='table__translateHeader'>
                                                Russian words
                                            </th>
                                        </>
                                    }
                                    {isShowDate ? 
                                        <th className='table__date'>
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
            {wordsLoadingStatus === "loading" ? 
            <Spinner/>
            :
            wordsLoadingStatus === "error" ? <div className='error'>Something went wrong, error from server</div> : table()
            }
        </>
    )
}

export default Table;