import { CSSTransition, TransitionGroup} from 'react-transition-group';
import makeSentence from '../../utils/makeSentense';
import Spinner from '../Spinner/Spinner';
import pencil from '../../resources/pencil.png';
import './sentencesTable.scss';

const SentencesTable = ({items, loadingStatus, setSelectedSentence, selectedSentence, cuttedArrayOfSentences, searchedSentences, handleModifyModal}) => {

    const highlightLetters = (sentence, search) => {
        if (search.length === 0) {
            return sentence;
        }
      
        const words = search.split(' ').filter(word => word.trim() !== '');
      
        if (words.length === 0) {
            return sentence;
        }
      
        const regex = new RegExp(words.join('|'), 'gi');
      
        const highlightedSentence = sentence.replace(regex, match => `<span class="highlight">${match}</span>`);
      
        return <div dangerouslySetInnerHTML={{ __html: highlightedSentence }} />;
    };

    const elements = items.map(item => {

        const highlightedEnglish = highlightLetters(makeSentence(item.english), searchedSentences);
        const highlightedRussian = highlightLetters(makeSentence(item.russian), searchedSentences);

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
                        <li className='sentenceTable__leftItem'>{highlightedEnglish}</li>
                        <li className='sentenceTable__rightItem'>
                            {highlightedRussian}
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