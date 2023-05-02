import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWords} from '../../store/slices/wordSlice';
import './table.scss';
import Spinner from '../Spinner/Spinner';
import { useGetData } from '../../hooks/useGetData';

const Table = ({onDelete}) => {

    const [index, setIndex] = useState('');
    const [selectedWord, setSelectedWord] = useState('');

    const {words, sortType, wordsLoadingStatus} = useSelector(state => state.words)
    const dispatch = useDispatch();
    const {fetchData} = useGetData();

    useEffect(() => {
        dispatch(fetchData('words', setWords));
    }, [])

    const handeClick = (i, english, id) => {
        setIndex(i);
        setSelectedWord(english)
        onDelete(id, selectedWord)
    }
    console.log(sortType)
    const elements = words.map((item, i) => {
        return (
            <Fragment key={item.id}>
                <div 
                    onClick={() => handeClick(i, item.english, item.id)} 
                    className={index !== i ? 'table__word' : 'table__word activeWord'}>
                    {item.english}
                </div>
                <div onClick={() => handeClick(i, item.english, item.id)} 
                    className={index !== i ? 'table__translate' : 'table__word activeWord'}>
                    {item.russian}
                </div>
            </Fragment>
        )
    })

    return (
        <>
            {wordsLoadingStatus === "idle" ? 
            <div className='table'>
                {elements}
            </div> :
            <Spinner/>
            }
        </>
    )
}

export default Table;