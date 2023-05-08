import { useState } from 'react';
import { useSelector } from 'react-redux';
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
                <tbody 
                    key={item.id} 
                    className={idForCompare !== item.id ? '' : 'activeWord'}
                    onClick={() => handleClick(item)}>
                    <tr>
                        <td className='table__word'>
                            {reverseWords ? item.russian : item.english}
                        </td>
                        <td className='table__translate'>
                            {reverseWords ? item.english : item.russian}
                        </td>
                    </tr>
                </tbody>
            )
        })
    }
    
    /* const filteredElements = (array) => {
        let data = [];
        if (searchedWord.length > 0) {
            if (!!searchedWord.match(/[^а-я]/g)) {
                data = array.filter(item => item.english.toLowerCase().includes(searchedWord))
            } else {
                data = array.filter(item => item.russian.toLowerCase().includes(searchedWord))
            }
        } else {
            if (selectedLetter.length !== 0) {
                if (!!selectedLetter.match(/[^а-я]/g)) {
                    data = array.filter(item => item.english.toLowerCase().slice(0, 1) === selectedLetter)
                } else {
                    data = array.filter(item => item.russian.toLowerCase().slice(0, 1) === selectedLetter)
                }
            } 
        }
        return data;
    } */  

    const table = () => {
        return (
            <>
                {words.length === 0 || (cuttedArrayOfWords.length === 0 && searchedWord.length > 0) || (cuttedArrayOfWords.length === 0 && selectedLetter.length > 0)? 
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
                    {elements(cuttedArrayOfWords)}
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