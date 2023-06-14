import { CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../Spinner/Spinner';
import './sentencesTable.scss';

const SentencesTable = ({items, loadingStatus, setSelectedSentence, selectedSentence}) => {

    const elements = items.map(item => {

        const doSentence = (array) => {
            return array
                        .join(' ')
                        .charAt(0)
                        .toUpperCase() + 
                   array
                        .join(' ')
                        .slice(1)
                        .replace(/\s*([,.])/g, "$1");
        }

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
                        <li className='sentenceTable__leftItem'>{doSentence(item.english)}</li>
                        <li className='sentenceTable__rightItem'>{doSentence(item.russian)}</li>
                    </ul>
            </CSSTransition>
            //<ul onClick={() => setSelectedSentence(item)} key={item.id}>
            //    <li className='sentenceTable__leftItem'>{doSentence(item.english)}</li>
            //   <li className='sentenceTable__rightItem'>{doSentence(item.russian)}</li>
            //</ul>
        )
    })

    const table = () => {
        return (
            <div className='sentenceTable'>
                <TransitionGroup component="div" className='sentenceTable__wrapper'>
                    {elements}
                </TransitionGroup>
                {/* <div className='sentenceTable__wrapper'>
                    {elements}
                </div> */}
            </div>
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