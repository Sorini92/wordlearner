import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../Spinner/Spinner';
import './table.scss';

const Table = ({onDelete, searchedWord, reverseWords, cuttedArrayOfWords, selectedLetter}) => {

    const [idForCompare, setIdForCompare] = useState('');
    const [isShowDate, setIsShowDate] = useState(false);

    const {wordsLoadingStatus, words} = useSelector(state => state.words)

    const handleClick = (word) => {
        setIdForCompare(word.id);
        onDelete(word); 
        setIsShowDate(!isShowDate)
    }
    
    const FormationgDate = (date) => {
        let normalDate = new Date(date)
        const formattedDate = `${normalDate.toLocaleTimeString()} ${normalDate.toLocaleDateString()}`;
        return formattedDate
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
                    <tr className={idForCompare !== item.id ? 'word' : 'word activeWord'} onClick={() => handleClick(item)}>
                        <td className='table__word'>
                            {reverseWords ? item.russian : item.english}
                        </td>
                        <td className='table__translate'>
                            {reverseWords ? item.english : item.russian}
                        </td>
                        {isShowDate ? 
                        <td className='table__date'>
                           {FormationgDate(item.date)}
                        </td> 
                        : null}
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
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>
                                        {reverseWords ? 'Russian words' : 'English words'}
                                    </th>
                                    <th>
                                        {reverseWords ? 'English words' : 'Russian words'}
                                    </th>
                                    {isShowDate ? 
                                    <th className='table__date'>
                                        Date of adding
                                    </th> 
                                    : null}
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