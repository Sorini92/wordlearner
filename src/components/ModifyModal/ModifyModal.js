import database from "../../firebase";
import { setDoc, collection, doc } from "firebase/firestore"; 
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import useAuth from '../../hooks/use-auth';
import './modifyModal.scss';

const ModifyModal = ({active, setActive, address, func, data,  selected, setMessage, setShowMessage}) => {
    
    const dataForModify = data.find(item => item.id === selected.id);

    const [english, setEnglish] = useState('');
    const [russian, setRussian] = useState('');
    
    const dispatch = useDispatch();
    const {email} = useAuth();

    useEffect(() => {
        if (dataForModify !== undefined) {
            setEnglish(dataForModify.english);
            setRussian(dataForModify.russian);
        }
    }, [dataForModify])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const index = data.findIndex(e => e.english === english.toLocaleLowerCase());
        
        if (index === -1) {

            const obj = {
                english: english.toLocaleLowerCase(),
                russian: russian.toLocaleLowerCase(),
                id: selected.id,
                date: Date.now()
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
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <form className='modal__form' onSubmit={handleSubmit}>
                    <div className='modal__title'>Modify word</div>

                    <label htmlFor="english">English word</label>
                    <input 
                        value={english}
                        maxLength={30}
                        onChange={(e) => setEnglish(e.target.value.replace(/[^a-z]/g, ''))}
                        type="text" 
                        id='english' 
                        placeholder='Write here' 
                        required/>

                    <label htmlFor="russian">Russian word</label>
                    <input 
                        value={russian}
                        maxLength={30}
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