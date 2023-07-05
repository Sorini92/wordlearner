import {Fragment, useEffect, useState} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import pencil from '../../resources/pencil.png';
import TranslationPopup from '../TranslationPopup/TranslationPopup';
import buscet from '../../resources/buscet.png';
import './sentencesTable.scss';

const SentencesTable = ({words, items, loadingStatus, setSelectedSentence, cuttedArrayOfSentences, searchedSentences, handleModifyModal, onDeleteSentence, handleAddWordModal, selectedWord, setSelectedWord}) => {

    const [translationResult, setTranslationResult] = useState([]);
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [isTranslationComplete, setTranslationComplete] = useState(false);
    const [position, setPosition] = useState({top: 0, left: 0, right: 0, width: 0});

    const translation = (array) => {
        let data = [];

        if (!!selectedWord.match(/[^а-я-]/g)) {
            const regex = new RegExp("\\b" + selectedWord + "(s|es|ed|d|ing)?\\b", "i");
            const ingRegex = new RegExp("\\b" + selectedWord.slice(0, -1) + "ing\\b", "i");

            data = array.filter(item => {
                return regex.test(item.english) || ingRegex.test(item.english);
            });
        } else {
            const regex = new RegExp(`(?:^|\\s)${selectedWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=\\s|$)`, "iu");

            data = array.filter(item => {
                return regex.test(item.russian);
            }); 
        }
        
        return data
    }

    useEffect(() => {
        setTranslationResult(translation(words));
        setTranslationComplete(true);
        // eslint-disable-next-line
    }, [isTranslationComplete]);
    
    const handleWordClick = (event, word) => {
        const wordPosition = event.target.getBoundingClientRect();
        const scrollTop = document.documentElement.scrollTop;
        setTranslationComplete(false);
        setTranslationResult(translation(words));
        setSelectedWord(word);
        setVisiblePopup(true);
        setPosition({ top: wordPosition.top + scrollTop, left: wordPosition.left, right: wordPosition.right, width: wordPosition.width });
    }

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
                                                onClick={(e) => handleWordClick(e, item)} 
                                                className={searchedSentences.includes(item) ? 'sentence__word highlighted' : 'sentence__word'}
                                            >
                                                {firstWord}
                                            </span>
                                        </> : 
                                        <>
                                            <>&nbsp;</>
                                            <span 
                                                onClick={(e) => handleWordClick(e, item)} 
                                                className={searchedSentences.includes(item) ? 'sentence__word highlighted' : 'sentence__word'}
                                            >
                                                {firstWord}
                                            </span>
                                        </>
            
            }

            return (
                <Fragment key={i}>
                    {itemWithSpace}
                </Fragment>
            )
        })
    }

    const elements = cuttedArrayOfSentences.map(item => {

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
                    <ul className='sentence' onClick={() => setSelectedSentence(item)}>
                        <li className='sentenceTable__leftItem'>
                            <div className='sentence'>{sentence(item.english)}</div>
                        </li>
                        <li className='sentenceTable__rightItem'>
                            <div className='sentence'>{sentence(item.russian)}</div>
                            <div onClick={() => onDeleteSentence(item.id)} className='sentenceTable__buscet'>
                                    <img src={buscet} alt='delete buscet'/>
                            </div> 
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
                    loadingStatus === "idle" ? <div className='emptyTable'>There are no sentences!</div> : null
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
            {visiblePopup && 
            <TranslationPopup 
                isTranslationComplete={isTranslationComplete}
                position={position} 
                visiblePopup={visiblePopup} 
                setVisiblePopup={setVisiblePopup} 
                handleAddWordModal={handleAddWordModal}
                translation={translationResult}
            />}
        </>
    )
}

SentencesTable.propTypes = {
    words:  PropTypes.array.isRequired,
    items:  PropTypes.array.isRequired,
    loadingStatus:  PropTypes.string.isRequired,
    setSelectedSentence:  PropTypes.func.isRequired,
    cuttedArrayOfSentences:  PropTypes.array.isRequired, 
    searchedSentences:  PropTypes.string.isRequired, 
    handleModifyModal:  PropTypes.func.isRequired,
    onDeleteSentence:  PropTypes.func.isRequired, 
    handleAddWordModal:  PropTypes.func.isRequired, 
    selectedWord:  PropTypes.string.isRequired,
    setSelectedWord:  PropTypes.func.isRequired,
}

export default SentencesTable;