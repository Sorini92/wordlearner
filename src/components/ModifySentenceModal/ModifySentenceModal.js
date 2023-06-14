import database from "../../firebase";
import { setDoc, collection, doc } from "firebase/firestore"; 
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import './modifySentenceModal.scss';

const ModifySentenceModal = ({width, height, maxLength, active, setActive, address, func, items,  selected, setMessage, setShowMessage}) => {
    
    const dataForModify = items.find(item => item.id === selected.id);

    const [english, setEnglish] = useState('');
    const [russian, setRussian] = useState('');
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (dataForModify !== undefined) {
            setEnglish(dataForModify.english);
            setRussian(dataForModify.russian);
        }
    }, [dataForModify])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const index = items.findIndex(e => e.english === english.toLowerCase());
        
        if (index === -1) {
            
            const obj = {
                english: english.toLowerCase().split(/([ ,.]+)/).map(item=> item.trim()).filter(item => item !== ' ' && item !== ''),
                russian: russian.toLowerCase().split(/([ ,.]+)/).map(item=> item.trim()).filter(item => item !== ' ' && item !== ''),
                id: dataForModify.id,
                date: dataForModify.date
            }
            
            dispatch(func(obj));
            setActive(false);

            const colRef = collection(database, address.firstUrl, address.secondUrl, address.thirdUrl)
            setDoc(doc(colRef, obj.id), obj);
            

            setShowMessage(true);
            setMessage({
                text: "It's was successfully modifyied!",
                color: 'green'
            })
        } else {
            setShowMessage(true);
            setMessage({
                text: "It's already there!",
                color: 'red'
            })
        }
    }

    return (
        <div className={active ? "modifySentenceModal active" : "modifySentenceModal"} onClick={() => setActive(false)}>
            <div 
                style={{width: `${width}px`, height: `${height}px`}}
                className={active ? "modifySentenceModal__content active" : "modifySentenceModal__content"} 
                onClick={e => e.stopPropagation()}
            >
                <form className='modifySentenceModal__form' onSubmit={handleSubmit}>
                    <div className='modifySentenceModal__title'>Modify sentence</div>

                    <label htmlFor="english">English</label>
                    <input 
                        value={english}
                        maxLength={maxLength}
                        onChange={(e) => setEnglish(e.target.value.replace(/[^a-z ]/g, ''))}
                        type="text" 
                        id='english' 
                        placeholder='Write here' 
                        required/>

                    <label htmlFor="russian">Russian</label>
                    <input 
                        value={russian}
                        maxLength={maxLength}
                        onChange={(e) => setRussian(e.target.value.replace(/[^а-я ]/g, ''))}
                        type="text" 
                        id='russian' 
                        placeholder='Write here' 
                        required/>

                    <div className='modifySentenceModal__btns'>
                        <button 
                            className='modifySentenceModal__btn' 
                            onClick={(e) => {
                                e.preventDefault();
                                setActive(false);
                            }}    
                        >
                            Close
                        </button>
                        <button className='modifySentenceModal__btn' type='submit'>Modify</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModifySentenceModal;