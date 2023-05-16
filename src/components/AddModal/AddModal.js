import database from "../../firebase";
import { setDoc, collection, doc } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import './addModal.scss';

const AddModal = ({active, setActive, address, func, data, setMessage, setShowMessage}) => {

    const [english, setEnglish] = useState('');
    const [russian, setRussian] = useState('');
    
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const index = data.findIndex(e => e.english === english.toLocaleLowerCase());

        if (index === -1) {
            const newObj = {
                english: english.toLocaleLowerCase(),
                russian: russian.toLocaleLowerCase(),
                date: Date.now(),
                id: uuidv4()
            }
            
            dispatch(func(newObj));

            const colRef = collection(database, address.firstUrl, address.secondUrl, address.thirdUrl)
            setDoc(doc(colRef, newObj.id), newObj);
            
            setShowMessage(true);
            setMessage({
                text: "It's was successfully added!",
                color: 'green'
            })

            setEnglish('');
            setRussian('');
            setActive(false);
        } else {
            setShowMessage(true);
            setMessage({
                text: "It's already there!",
                color: 'red'
            })
            setEnglish('');
            setRussian('');
        }
    }

    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                    <form className='modal__form' onSubmit={handleSubmit}>
                        <div className='modal__title'>Add new word</div>

                        <label htmlFor="english">English word</label>
                        <input 
                            value={english}
                            maxLength={30}
                            onChange={(e) => setEnglish(e.target.value.replace(/[^a-z]/g, ''))}
                            type="text" 
                            id='english' 
                            placeholder='Write here' 
                            required
                        />

                        <label htmlFor="russian">Russian word</label>
                        <input 
                            value={russian}
                            maxLength={30}
                            onChange={(e) => setRussian(e.target.value.replace(/[^а-я]/g, ''))}
                            type="text" 
                            id='russian' 
                            placeholder='Write here' 
                            required
                        />

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
        </>        
    )
}

export default AddModal;