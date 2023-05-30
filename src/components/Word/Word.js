import { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import pencil from '../../resources/pencil.png';

const Word = ({handleModifyModal, setUnbluredWord, isShowDate, onAddToFavorite, setSelectedWords, setSelectedWord, setIdForCompare, reverseWords, selectedWords, item, isItemBlurred, idForCompare, isShowTicks, isChecked}) => {

    const onFormattedDate = (date) => {
        let normalDate = new Date(date)
        
        return `${normalDate.toLocaleTimeString()} ${normalDate.toLocaleDateString()}`;
    }

    const handleClick = (word) => {
        setSelectedWord(word)
        setIdForCompare(word.id);
        console.log(word);
    }

    const handleStarClick = (word) => {
        onAddToFavorite(word)
    }

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

    const timerRef = useRef(null)

    const handleUnblur = (word) => {

        clearTimeout(timerRef.current);
        setUnbluredWord(word);

        timerRef.current = setTimeout(() => {
            setUnbluredWord('')
        }, 2000);

    }
    
    useEffect(() => () => clearTimeout(timerRef.current), [])
    
    return (
        //{
            /* <CSSTransition 
            timeout={500}
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
                <td className='wordsTable__translate'>
                    <div className='wordsTable__translate-inner'>
                        <div
                            onClick={() => handleUnblur(item.id)} 
                            className={isItemBlurred ? 'blur' : ''}
                            >
                            {reverseWords ? item.english : item.russian}
                        </div> 
                        <div onClick={() => handleModifyModal()} className='wordsTable__translate-inner-pencil'>
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
        </CSSTransition> */
    //}
        <>
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
                <td className='wordsTable__translate'>
                    <div className='wordsTable__translate-inner'>
                        <div
                            onClick={() => handleUnblur(item.id)} 
                            className={isItemBlurred ? 'blur' : ''}
                            >
                            {reverseWords ? item.english : item.russian}
                        </div> 
                        <div onClick={() => handleModifyModal()} className='wordsTable__translate-inner-pencil'>
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
        </>
    )
}

export default Word;