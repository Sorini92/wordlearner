import database from "../../firebase";
import { setDoc, collection, doc } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import compareArrays from '../../utils/compareArrays';
import './addSentenceModal.scss';

const AddSentenceModal = ({width, height, maxLength, active, setActive, address, func, items, setMessage, setShowMessage}) => {

    const [english, setEnglish] = useState('');
    const [russian, setRussian] = useState('');
    
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const englishArray = english.toLowerCase().split(/([ ,.]+)/).map(item=> item.trim()).filter(item => item !== ' ' && item !== '')
        const russianArray = russian.toLowerCase().split(/([ ,.]+)/).map(item=> item.trim()).filter(item => item !== ' ' && item !== '')
        
        const englishIndex = items.findIndex(item => (compareArrays(item.english, englishArray)))

        if (englishIndex === -1) {

            const newObj = {
                english: englishArray,
                russian: russianArray,
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
            <div className={active ? "addSentenceModal active" : "addSentenceModal"} onClick={() => setActive(false)}>
                <div 
                    style={{width: `${width}px`, height: `${height}px`}}
                    className={active ? "addSentenceModal__content active" : "addSentenceModal__content"} 
                    onClick={e => e.stopPropagation()}
                >
                    <form className='addSentenceModal__form' onSubmit={handleSubmit}>
                        <div className='addSentenceModal__title'>Add new sentence</div>

                        <label htmlFor="english">English</label>
                        <textarea 
                            value={english}
                            maxLength={maxLength}
                            onChange={(e) => setEnglish(e.target.value.replace(/[^a-zA-Z.,\- ]/g, ''))}
                            type="text" 
                            id='english' 
                            placeholder='Write here' 
                            required
                        />

                        <label htmlFor="russian">Russian</label>
                        <textarea 
                            value={russian}
                            maxLength={maxLength}
                            onChange={(e) => setRussian(e.target.value.replace(/[^а-яА-Я.,\- ]/g, ''))}
                            type="text" 
                            id='russian' 
                            placeholder='Write here' 
                            required
                        />

                        <div className='addSentenceModal__btns'>
                            <button 
                                className='addSentenceModal__btn' 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActive(false);
                                }}    
                            >
                                Close
                            </button>
                            <button className='addSentenceModal__btn' type='submit'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>        
    )
}

export default AddSentenceModal;