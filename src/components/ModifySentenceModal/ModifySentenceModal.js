import database from "../../firebase";
import { setDoc, collection, doc } from "firebase/firestore"; 
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import makeSentence from "../../utils/makeSentense";
import compareArrays from "../../utils/compareArrays";
import './modifySentenceModal.scss';

const ModifySentenceModal = ({width, height, maxLength, active, setActive, address, func, items,  selected, setMessage, setShowMessage}) => {
    
    const dataForModify = items.find(item => item.id === selected.id);

    const [english, setEnglish] = useState('');
    const [russian, setRussian] = useState('');
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (dataForModify !== undefined) {
            setEnglish(makeSentence(dataForModify.english));
            setRussian(makeSentence(dataForModify.russian));
        }
    }, [dataForModify])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const englishArray = english.toLowerCase().split(/([ ,.]+)/).map(item=> item.trim()).filter(item => item !== ' ' && item !== '')
        const russianArray = russian.toLowerCase().split(/([ ,.]+)/).map(item=> item.trim()).filter(item => item !== ' ' && item !== '')
        
        const englishIndex = items.findIndex(item => (compareArrays(item.english, englishArray)))
        
        if (englishIndex === -1) {
            
            const obj = {
                english: englishArray,
                russian: russianArray,
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
                    <textarea 
                        value={english}
                        maxLength={maxLength}
                        onChange={(e) => setEnglish(e.target.value.replace(/[^a-zA-Z.,\- ]/g, ''))}
                        type="text" 
                        id='english' 
                        placeholder='Write here' 
                        required/>

                    <label htmlFor="russian">Russian</label>
                    <textarea 
                        value={russian}
                        maxLength={maxLength}
                        onChange={(e) => setRussian(e.target.value.replace(/[^а-яА-Я.,\- ]/g, ''))}
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

ModifySentenceModal.propTypes = {
    width:  PropTypes.number.isRequired,
    height:  PropTypes.number.isRequired,
    maxLength:  PropTypes.number.isRequired,
    active:  PropTypes.bool.isRequired,
    setActive:  PropTypes.func.isRequired, 
    address:  PropTypes.object.isRequired, 
    func:  PropTypes.func,
    items:  PropTypes.array.isRequired, 
    setMessage:  PropTypes.func.isRequired, 
    setShowMessage:  PropTypes.func.isRequired,
    selected: PropTypes.object.isRequired
}

export default ModifySentenceModal;