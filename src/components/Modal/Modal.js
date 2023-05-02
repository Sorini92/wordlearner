import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import './modal.scss';

const Modal = ({active, setActive, address, addWord}) => {

    const [english, setEnglish] = useState('');
    const [russian, setRussian] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const db = getDatabase();

        const newObj = {
            english: english.toLocaleLowerCase(),
            russian: russian.toLocaleLowerCase(),
            id: uuidv4(),
        }
        
        dispatch(addWord(newObj));
        set(ref(db, `${address}/` + english.toLocaleLowerCase()), newObj);
        setEnglish('');
        setRussian('');
        setActive(false);
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

export default Modal;