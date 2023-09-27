import database from "../../firebase";
import { setDoc, collection, doc } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import compareArrays from '../../utils/compareArrays';
import PropTypes from 'prop-types';
import { CSSTransition } from "react-transition-group";
import Portal from "../Portal/Portal";
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

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <Portal>
            <CSSTransition
                in={active}
                timeout={{ enter: 300, exit: 300 }}
                unmountOnExit
                classNames={"addSentenceModal"}
            >
                <div className="addSentenceModal" onClick={() => setActive(false)}>
                    <div 
                        style={{width: `${width}px`, height: `${height}px`}}
                        className="addSentenceModal__content"
                        onClick={e => e.stopPropagation()}
                        onKeyDown={handleEnterPress}
                    >
                        <form className='addSentenceModal__form' onSubmit={handleSubmit}>
                            <div className='addSentenceModal__title'>Add new sentence</div>

                            <label htmlFor="english">English</label>
                            <textarea 
                                value={english}
                                maxLength={maxLength}
                                onChange={(e) => setEnglish(e.target.value.replace(/[^a-zA-Z.,!?\-() ]/g, '').trimStart())}
                                type="text" 
                                id='english' 
                                placeholder='Write here' 
                                required
                            />

                            <label htmlFor="russian">Russian</label>
                            <textarea 
                                value={russian}
                                maxLength={maxLength}
                                onChange={(e) => setRussian(e.target.value.replace(/[^а-яА-Я.,!?\-() ]/g, '').trimStart())}
                                type="text" 
                                id='russian' 
                                placeholder='Write here' 
                                required
                            />

                            <div className='addSentenceModal__btns'>
                                <button 
                                    className='addSentenceModal__closebtn' 
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
            </CSSTransition>
        </Portal>        
    )
}

AddSentenceModal.propTypes = {
    width:  PropTypes.number.isRequired,
    height:  PropTypes.number.isRequired,
    maxLength:  PropTypes.number.isRequired,
    active:  PropTypes.bool.isRequired,
    setActive:  PropTypes.func.isRequired, 
    address:  PropTypes.object.isRequired, 
    func:  PropTypes.func,
    items:  PropTypes.array.isRequired, 
    setMessage:  PropTypes.func.isRequired, 
    setShowMessage:  PropTypes.func.isRequired
}

export default AddSentenceModal;