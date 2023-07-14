import { useState, useRef, useEffect } from 'react';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import './irregularVerbsTable.scss';

const IrregularVerbsTable = ({loadingStatus, items, searchedWord, cuttedArrayOfWords, selectedLetter, isBlured}) => {

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

        if (items.length === 0 || (cuttedArrayOfWords.length === 0 && searchedWord.length > 0) || (cuttedArrayOfWords.length === 0 && selectedLetter.length > 0)) {
            return (
                <div className='emptyTable'>There are no words!</div>
            )
        }

        return (
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

IrregularVerbsTable.propTypes = {
    searchedWord:  PropTypes.string.isRequired,
    cuttedArrayOfWords:  PropTypes.array.isRequired,
    selectedLetter:  PropTypes.string.isRequired,
    isBlured:  PropTypes.bool.isRequired,
}

export default IrregularVerbsTable;