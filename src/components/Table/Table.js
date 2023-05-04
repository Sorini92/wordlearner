import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWords, emptyBase, errorOnFetch} from '../../store/slices/wordSlice';
import { useGetData } from '../../hooks/useGetData';
import useAuth from '../../hooks/use-auth';
import Spinner from '../Spinner/Spinner';
import './table.scss';

const Table = ({onDelete, searchedWord, valueInSearchInput}) => {

    const [index, setIndex] = useState('');

    const {words, wordsLoadingStatus} = useSelector(state => state.words)
    const dispatch = useDispatch();
    const {fetchData} = useGetData();
    const {email} = useAuth();

    useEffect(() => {
        //dispatch(fetchData(`${email.split('@')[0]}/words`, setWords, emptyBase, errorOnFetch));
        dispatch(fetchData(`words`, setWords, emptyBase, errorOnFetch));
    }, []);

    const handeClick = (i, id) => {
        setIndex(i);
        onDelete(id); 
    }

    const elements = (array) => {
        return array.map((item, i) => {
            return (
                <Fragment key={item.id}>
                    <div 
                        onClick={() => handeClick(i, item.id)} 
                        className={index !== i ? 'table__word' : 'table__word activeWord'}>
                        {item.english}
                    </div>
                    <div onClick={() => handeClick(i, item.id)} 
                        className={index !== i ? 'table__translate' : 'table__word activeWord'}>
                        {item.russian}
                    </div>
                </Fragment>
            )
        })
    }

    const table = () => {
        return (
            <>
                {words.length === 0 || (searchedWord.length === 0 && valueInSearchInput.length !== 0) ? 
                <div className='emptyTable'>There are no words!</div> 
                : 
                <div className='table'>
                    {searchedWord.length === 0 ? elements(words) : elements(searchedWord)}
                </div> }
            </>
        )
    }

    return (
        <>
            {wordsLoadingStatus === "idle" ? 
            table()
            :
            <Spinner/>
            }
        </>
    )
}

export default Table;