import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import ReverseArrows from '../ReverseArrows/ReverseArrow';
import Spinner from '../Spinner/Spinner';
import './table.scss';

const Table = ({onDelete, searchedWord, cuttedArrayOfWords, selectedLetter}) => {
    
    const {wordsLoadingStatus, words} = useSelector(state => state.words)

    const [idForCompare, setIdForCompare] = useState('');
    const [isShowDate, setIsShowDate] = useState(false);
    const [isShowTicks, setIsShowTicks] = useState(false);
    const [reverseWords, setReverseWords] = useState(false);
    const [selectedWords, setSelectedWords] = useState([]);

    const isSelected = (word) => selectedWords.indexOf(word.id) !== -1;

    const handleClick = (word) => {
        setIdForCompare(word.id);
        /* onDelete(word); */
        console.log(word)
        const selectedIndex = selectedWords.indexOf(word.id);
        
        let newSelected = [];
        
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedWords, word.id);
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

    //console.log(selectedWords)

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = cuttedArrayOfWords;
            setSelectedWords(newSelected);
            return;
        }
        setSelectedWords([]);
    };
    
    const onFormattedDate = (date) => {
        let normalDate = new Date(date)
        const formattedDate = `${normalDate.toLocaleTimeString()} ${normalDate.toLocaleDateString()}`;
        return formattedDate
    }

    const handleShowDate = () => {
        setIsShowDate(!isShowDate);
    }

    const handleShowTicks = () => {
        setIsShowTicks(!isShowTicks);
    }
    console.log(selectedWords);
    const elements = (array) => {
        return array.map((item) => {
            const isItemSelected = isSelected(item);
            console.log(isItemSelected)
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
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        role="checkbox"
                        className={idForCompare !== item.id ? 'word' : 'word activeWord'} 
                        onClick={() => handleClick(item)}
                    >
                        {isShowTicks ? 
                            <td className='table__ticks'>
                                <input defaultChecked={isItemSelected} type='checkbox'/>
                            </td>
                            :
                            null
                        }
                        <td className='table__word'>
                            {reverseWords ? item.russian : item.english}
                        </td>
                        <td className='table__translate'>
                            {reverseWords ? item.english : item.russian}
                        </td>
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
                                <button onClick={() => handleShowTicks()} className='table__btn-ticks'>Ticks &#8592;</button>
                                :
                                <button onClick={() => handleShowTicks()} className='table__btn-ticks'>Ticks &#8594;</button>
                            }
                            <ReverseArrows 
                                setReverseWords={setReverseWords} 
                                reverseWords={reverseWords}
                            />
                            {isShowDate ? 
                                <button onClick={() => handleShowDate()} className='table__btn-date'>&#8594; Date</button> 
                                : 
                                <button onClick={() => handleShowDate()} className='table__btn-date'>&#8592; Date</button>
                            }
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    {isShowTicks ? 
                                        <th onChange={handleSelectAllClick}  className='table__ticks'>
                                            <input type='checkbox'/>
                                        </th> 
                                        :
                                        null
                                    }
                                    <th className='table__translate'>
                                        {reverseWords ? 'Russian words' : 'English words'}
                                    </th>
                                    <th className='table__translate'>
                                        {reverseWords ? 'English words' : 'Russian words'}
                                    </th>
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