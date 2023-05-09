import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../Spinner/Spinner';
import './table.scss';

const Table = ({onDelete, searchedWord, reverseWords, cuttedArrayOfWords, selectedLetter}) => {

    const [idForCompare, setIdForCompare] = useState('');

    const {wordsLoadingStatus, words} = useSelector(state => state.words)

    const handleClick = (word) => {
        setIdForCompare(word.id);
        onDelete(word); 
    }
    
    const elements = (array) => {
        return array.map((item) => {
            return (
                 <CSSTransition 
                    timeout={500}
                    key={item.id}
                    
                    
                    >
                        {/* key={item.id} 
                        className={idForCompare !== item.id ? '' : 'activeWord'}
                        onClick={() => handleClick(item)} */}
                    {state => (
                        <tr className={idForCompare !== item.id ? 'word' : 'word activeWord'} onClick={() => handleClick(item)} >
                            <td className='table__word'>
                                {reverseWords ? item.russian : item.english}
                            </td>
                            <td className='table__translate'>
                                {reverseWords ? item.english : item.russian}
                            </td>
                        </tr>
                    )}
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
                <TransitionGroup component="table" className='table'>
                    {/* <table className='table'> */}
                        <thead>
                            <tr>
                                <th>
                                    {reverseWords ? 'Russian words' : 'English words'}
                                </th>
                                <th>
                                    {reverseWords ? 'English words' : 'Russian words'}
                                </th>
                            </tr>
                        </thead>
                        <tbody className='word'>
                            {elements(cuttedArrayOfWords)}
                        </tbody>
                    {/* </table> */}
                </TransitionGroup>
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