import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWords} from '../../store/slices/wordSlice';
import useAuth from '../../hooks/use-auth';
import Spinner from '../Spinner/Spinner';
import './table.scss';

const Table = ({onDelete, searchedWord, reverseWords}) => {

    const [index, setIndex] = useState('');

    const {words, wordsLoadingStatus} = useSelector(state => state.words)
    const dispatch = useDispatch();
    const {email} = useAuth();

    useEffect(() => {
        dispatch(fetchWords());
        // eslint-disable-next-line
    }, []);

    const handeClick = (i, word) => {
        setIndex(i);
        onDelete(word); 
    }

    const elements = (array) => {
        return array.map((item, i) => {
            return (
                <tbody key={item.id} onClick={() => handeClick(i, item)}>
                    <tr>
                        <td 
                            className={index !== i ? 'table__word' : 'table__word activeWord'}
                        >
                            {reverseWords ? item.russian : item.english}
                        </td>
                        <td 
                            className={index !== i ? 'table__translate' : 'table__word activeWord'}
                        >
                            {reverseWords ? item.english : item.russian}
                        </td>
                    </tr>
                </tbody>
            )
        })
    }

    const table = () => {
        return (
            <>
                {words.length === 0 ? 
                <div className='emptyTable'>There are no words!</div> 
                : 
                <table className='table'>
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
                    {searchedWord.length === 0 ? elements(words) : elements(searchedWord)}
                </table> }
            </>
        )
    }

    return (
        <>
            {wordsLoadingStatus === "loading" ? 
            <Spinner/>
            :
            table()
            }
        </>
    )
}

export default Table;