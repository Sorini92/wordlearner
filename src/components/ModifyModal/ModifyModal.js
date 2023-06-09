import database from "../../firebase";
import { setDoc, collection, doc } from "firebase/firestore"; 
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import './modifyModal.scss';

const ModifyModal = ({width, height, active, setActive, address, func, items,  selected, setMessage, setShowMessage}) => {
    
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

        const favoriteColRef = collection(database, address.firstUrl, address.secondUrl, 'favoriteWords')
        const wordsColRef = collection(database, address.firstUrl, address.secondUrl, 'words')
        
        const index = items.findIndex(e => e.english === english.toLowerCase());
        
        if (index === -1) {
            
            const obj = {
                favorite : dataForModify.favorite,
                english: english.toLowerCase(),
                russian: russian.toLowerCase(),
                id: dataForModify.id,
                date: dataForModify.date
            }
            
            dispatch(func(obj));
            setActive(false);

            if (dataForModify.favorite) {
                setDoc(doc(favoriteColRef, obj.id), obj);
                setDoc(doc(wordsColRef, obj.id), obj);
            } else {
                setDoc(doc(wordsColRef, obj.id), obj);
            }

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
        <div className={active ? "modifymodal active" : "modifymodal"} onClick={() => setActive(false)}>
            <div 
                style={{width: `${width}px`, height: `${height}px`}}
                className={active ? "modifymodal__content active" : "modifymodal__content"} 
                onClick={e => e.stopPropagation()}
            >
                <form className='modifymodal__form' onSubmit={handleSubmit}>
                    <div className='modifymodal__title'>Modify word</div>

                    <label htmlFor="english">English</label>
                    <input 
                        value={english}
                        maxLength={30}
                        onChange={(e) => setEnglish(e.target.value.replace(/[^a-z ]/g, ''))}
                        type="text" 
                        id='english' 
                        placeholder='Write here' 
                        required/>

                    <label htmlFor="russian">Russian</label>
                    <input 
                        value={russian}
                        maxLength={30}
                        onChange={(e) => setRussian(e.target.value.replace(/[^а-я ]/g, ''))}
                        type="text" 
                        id='russian' 
                        placeholder='Write here' 
                        required/>

                    <div className='modifymodal__btns'>
                        <button 
                            className='modifymodal__btn' 
                            onClick={(e) => {
                                e.preventDefault();
                                setActive(false);
                            }}    
                        >
                            Close
                        </button>
                        <button className='modifymodal__btn' type='submit'>Modify</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModifyModal;