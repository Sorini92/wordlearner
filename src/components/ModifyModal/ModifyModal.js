import { getDatabase, update, ref, remove } from "firebase/database";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useAuth from '../../hooks/use-auth';
import './modifyModal.scss';

const ModifyModal = ({active, setActive, address, func, word}) => {
    
    const {words} = useSelector(state => state.words);
    const wordForModify = words.find(item => item.id === word.id);

    const [english, setEnglish] = useState('');
    const [russian, setRussian] = useState('');
    
    const dispatch = useDispatch();
    const {email} = useAuth();

    useEffect(() => {
        if (wordForModify !== undefined) {
            setEnglish(wordForModify.english);
            setRussian(wordForModify.russian);
        }
    }, [wordForModify])

    const handleSubmit = (e) => {
        e.preventDefault();
        const db = getDatabase();
        
        const index = words.findIndex(e => e.english === english.toLocaleLowerCase());

        if (index === -1) {
            const temp = word.english;

            const obj = {
                english: english.toLocaleLowerCase(),
                russian: russian.toLocaleLowerCase(),
                id: word.id,
                date: Date.now()
            }
            
            dispatch(func(obj));
            setActive(false);

            const updates = {};

            //updates[`${email.split('@')[0]}/${address}/${obj.toLocaleLowerCase()}/`] = obj;

            updates[`${address}/${obj.english.toLocaleLowerCase()}/`] = obj;

            const wordRef = ref(db, `words/${temp}`);

            remove(wordRef)
                .then(() => {
                    console.log("Modificated");
                });
            
            return update(ref(db), updates);
        } else {
            alert('There are this word in the table or it is same word!')
        }
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <form className='modal__form' onSubmit={handleSubmit}>
                    <div className='modal__title'>Modify word</div>

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
                        <button className='modal__btn' type='submit'>Modify</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModifyModal;