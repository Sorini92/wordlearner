import database from "../../firebase";
import { setDoc, collection, doc } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import './addModal.scss';

const AddModal = ({width, height, active, setActive, address, func, data, setMessage, setShowMessage}) => {

    const [english, setEnglish] = useState('');
    const [russian, setRussian] = useState('');
    
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const index = data.findIndex(e => e.english === english.toLowerCase());

        if (index === -1) {

            const newObj = {
                english: english.toLowerCase(),
                russian: russian.toLowerCase(),
                date: Date.now(),
                favorite: false,
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
            <div className={active ? "addmodal active" : "addmodal"} onClick={() => setActive(false)}>
                <div 
                    style={{width: `${width}px`, height: `${height}px`}}
                    className={active ? "addmodal__content active" : "addmodal__content"} 
                    onClick={e => e.stopPropagation()}
                >
                    <form className='addmodal__form' onSubmit={handleSubmit}>
                        <div className='addmodal__title'>Add new word</div>

                        <label htmlFor="english">English</label>
                        <input 
                            value={english}
                            maxLength={30}
                            onChange={(e) => setEnglish(e.target.value.replace(/[^a-z ]/g, ''))}
                            type="text" 
                            id='english' 
                            placeholder='Write here' 
                            required
                        />

                        <label htmlFor="russian">Russian</label>
                        <input 
                            value={russian}
                            maxLength={30}
                            onChange={(e) => setRussian(e.target.value.replace(/[^а-я ]/g, ''))}
                            type="text" 
                            id='russian' 
                            placeholder='Write here' 
                            required
                        />

                        <div className='addmodal__btns'>
                            <button 
                                className='addmodal__btn' 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActive(false);
                                }}    
                            >
                                Close
                            </button>
                            <button className='addmodal__btn' type='submit'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>        
    )
}

export default AddModal;