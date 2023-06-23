import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../Spinner/Spinner';
import './irregularVerbsTable.scss';

const IrregularVerbsTable = ({searchedWord, cuttedArrayOfWords, selectedLetter, isBlured}) => {
    
    const {wordsLoadingStatus, verbs} = useSelector(state => state.irregularVerbs)

    const [idForCompare, setIdForCompare] = useState('');
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
        setIdForCompare(word.id);
    }

    const elements = (array) => {
        return array.map((item) => {

            const isItemBlurred = isBlured && unbluredWord !== item.id;
            
            return (
                <CSSTransition 
                    timeout={500}
                    key={item.id}
                    classNames={{
                        appear: 'verb-appear',
                        appearActive: 'verb-appear-active',
                        enter: 'verb-enter',
                        enterActive: 'verb-enter-active',
                        exit: 'verb-exit',
                        exitActive: 'verb-exit-active'
                    }}
                >
                    <tr 
                        className={idForCompare !== item.id ? 'verb' : 'verb activeVerb'} 
                        onClick={() => handleClick(item)}
                    >
                            <td 
                                onClick={() => handleUnblur(item.id)} 
                                className={isItemBlurred ? 'irregularVerbsTable__base blur' : 'irregularVerbsTable__base'}>
                                {item.baseForm}
                            </td>
                            <td 
                                onClick={() => handleUnblur(item.id)} 
                                className={isItemBlurred ? 'irregularVerbsTable__simple blur' : 'irregularVerbsTable__simple'}>
                                {item.pastParticiple}
                            </td> 
                            <td 
                                onClick={() => handleUnblur(item.id)} 
                                className={isItemBlurred ? 'irregularVerbsTable__participle blur' : 'irregularVerbsTable__participle'}>
                                {item.pastSimple}
                            </td>
                            <td className='irregularVerbsTable__translation'>
                                {item.translation}
                            </td> 
                    </tr>
                </CSSTransition>
            )
        })
    }

    const table = () => {
        return (
            <>
                {verbs.length === 0 || (cuttedArrayOfWords.length === 0 && searchedWord.length > 0) || (cuttedArrayOfWords.length === 0 && selectedLetter.length > 0)? 
                    <div className='emptyTable'>There are no words!</div> 
                    : 
                    <div className='irregularVerbsTable__wrapper'>
                        <table className='irregularVerbsTable'>
                            <thead>
                                <tr>
                                    <th className='irregularVerbsTable__base'>
                                        Base form
                                    </th> 
                                    <th className='irregularVerbsTable__simple'>
                                        Past simple
                                    </th> 
                                    <th className='irregularVerbsTable__participle'>
                                        Past participle
                                    </th>
                                    <th className='irregularVerbsTable__translation'>
                                        Translation
                                    </th> 
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

export default IrregularVerbsTable;