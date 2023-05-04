import { getDatabase, ref, set, push } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useAuth from '../../hooks/use-auth';
import './addModal.scss';

const AddModal = ({active, setActive, address, func}) => {

    const [english, setEnglish] = useState('');
    const [russian, setRussian] = useState('');
    
    const {words} = useSelector(state => state.words);
    const dispatch = useDispatch();
    const {email} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const db = getDatabase();

        const index = words.findIndex(e => e.english === english.toLocaleLowerCase());

        if (index === -1) {
            const newObj = {
                english: english.toLocaleLowerCase(),
                russian: russian.toLocaleLowerCase(),
                id: uuidv4(),
                date: Date.now()
            }
            
            dispatch(func(newObj));
            //set(ref(db, `${email.split('@')[0]}/${address}/` + newObj.id), newObj);
            set(ref(db, `${address}/` + newObj.id), newObj);
            setEnglish('');
            setRussian('');
            setActive(false);
        } else {
            setEnglish('');
            setRussian('');
            alert('There are this word in the table!')
        }
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <form className='modal__form' onSubmit={handleSubmit}>
                    <div className='modal__title'>Add new word</div>

                    <label htmlFor="english">English word</label>
                    <input 
                        value={english}
                        onChange={(e) => setEnglish(e.target.value.replace(/[^a-z]/g, ''))}
                        type="text" 
                        id='english' 
                        placeholder='Write here' 
                        required/>

                    <label htmlFor="russian">Russian word</label>
                    <input 
                        value={russian}
                        onChange={(e) => setRussian(e.target.value.replace(/[^а-я]/g, ''))}
                        type="text" 
                        id='russian' 
                        placeholder='Write here' 
                        required/>

                    <div className='modal__btns'>
                        <button 
                            className='modal__btn' 
                            onClick={(e) => {
                                e.preventDefault();
                                setActive(false);
                            }}    
                        >Close
                        </button>
                        <button className='modal__btn' type='submit'>Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddModal;