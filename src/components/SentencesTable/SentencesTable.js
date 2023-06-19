import { Fragment, useState } from 'react';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../Spinner/Spinner';
import pencil from '../../resources/pencil.png';
import './sentencesTable.scss';
import TranslationPopup from '../TranslationPopup/TranslationPopup';

const SentencesTable = ({items, loadingStatus, setSelectedSentence, selectedSentence, cuttedArrayOfSentences, searchedSentences, handleModifyModal}) => {

    const [selectedWord, setSelectedWord] = useState('');
    const [visiblePopup, setVisiblePopup] = useState(false);

    const sentence = (array) => {
        return array.map((item, i) => {

            const firstWord = i === 0 ? item.slice(0, 1).toUpperCase() + item.slice(1) : item;

            let itemWithSpace;

            switch (item) {
                case ",":
                    itemWithSpace = <>{item}&nbsp;</>
                break;
                case ".":
                    itemWithSpace = <>{item}</>
                break;
                case "-":
                    itemWithSpace = <>&nbsp;{item}</>
                break;
                default:
                    itemWithSpace = i === 0 ? 
                                        <>
                                            <span 
                                                onClick={() => {
                                                    setSelectedWord(item)
                                                    setVisiblePopup(!visiblePopup)
                                                }} 
                                                className={searchedSentences.includes(item) ? 'sentence__word highlighted' : 'sentence__word'}
                                            >
                                                {firstWord}
                                            </span>
                                        </> : 
                                        <>
                                            <>&nbsp;</>
                                            <span 
                                                onClick={() => {
                                                    setSelectedWord(item)
                                                    setVisiblePopup(!visiblePopup)
                                                }} 
                                                className={searchedSentences.includes(item) ? 'sentence__word highlighted' : 'sentence__word'}
                                            >
                                                {firstWord}
                                            </span>
                                        </>
            
            }

            return (
                <Fragment key={i}>
                    {itemWithSpace}
                    <TranslationPopup visiblePopup={visiblePopup} setVisiblePopup={setVisiblePopup}/>
                </Fragment>
            )
        })
    }

    const elements = items.map(item => {

        return (
            <CSSTransition 
                    timeout={500}
                    key={item.id}
                    classNames={{
                        appear: 'sentence-appear',
                        appearActive: 'sentence-appear-active',
                        enter: 'sentence-enter',
                        enterActive: 'sentence-enter-active',
                        exit: 'sentence-exit',
                        exitActive: 'sentence-exit-active'
                    }}
                >
                    <ul className={selectedSentence.id !== item.id ? 'sentence' : 'sentence activeSentence'} onClick={() => setSelectedSentence(item)}>
                        <li className='sentenceTable__leftItem'>
                            <div className='sentence'>{sentence(item.english)}</div>
                        </li>
                        <li className='sentenceTable__rightItem'>
                            <div className='sentence'>{sentence(item.russian)}</div>
                            <div onClick={() => handleModifyModal()} className='sentenceTable__pencil'>
                                    <img src={pencil} alt='modify pencil'/>
                            </div> 
                        </li>
                    </ul>
            </CSSTransition>
        )
    })

    const table = () => {
        return (
            <>
                {items.length === 0 || (cuttedArrayOfSentences.length === 0 && searchedSentences.length > 0)? 
                    <div className='emptyTable'>There are no sentences!</div> 
                    : 
                    <div className='sentenceTable'>
                        <TransitionGroup component="div" className='sentenceTable__wrapper'>
                            {elements}
                        </TransitionGroup>
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

export default SentencesTable;