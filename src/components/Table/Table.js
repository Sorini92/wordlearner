import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addWords} from '../../store/slices/wordSlice';
import './table.scss';
import Spinner from '../Spinner/Spinner';
import { useGetData } from '../../hooks/useGetData';

const Table = () => {
    const {words, wordsLoadingStatus} = useSelector(state => state.words)
    const dispatch = useDispatch()
    const {fetchData} = useGetData();

    useEffect(() => {
        dispatch(fetchData('words', addWords));
    }, [])

    const elements = words.map((item) => {
        return (
            <Fragment key={item.id}>
                <div className='table__word'>{item.english}</div>
                <div className='table__translate'>{item.russian}</div>
            </Fragment>
        )
    })

    return (
        <div className='table'>
            {wordsLoadingStatus === 'idle' ? elements : <Spinner/>}
        </div>
    )
}

export default Table;