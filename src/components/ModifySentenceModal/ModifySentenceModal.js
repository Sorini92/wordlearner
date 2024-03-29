import database from "../../firebase";
import { setDoc, collection, doc } from "firebase/firestore"; 
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import makeSentence from "../../utils/makeSentence";
import { CSSTransition } from "react-transition-group";
import Portal from "../Portal/Portal";
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
            text: "Successfully modified!",
            color: 'green'
        })
        
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
                classNames={"modifySentenceModal"}
            >
                <div className="modifySentenceModal" onClick={() => setActive(false)}>
                    <div 
                        style={{width: `${width}px`, height: `${height}px`}}
                        className="modifySentenceModal__content" 
                        onClick={e => e.stopPropagation()}
                        onKeyDown={handleEnterPress}
                    >
                        <form className='modifySentenceModal__form' onSubmit={handleSubmit}>
                            <div className='modifySentenceModal__title'>Modify sentence</div>

                            <label htmlFor="english">English</label>
                            <textarea 
                                value={english}
                                maxLength={maxLength}
                                onChange={(e) => setEnglish(e.target.value.replace(/[^a-zA-Z.,!?\-() ]/g, '').trimStart())}
                                type="text" 
                                id='english' 
                                placeholder='Write here' 
                                required/>

                            <label htmlFor="russian">Russian</label>
                            <textarea 
                                value={russian}
                                maxLength={maxLength}
                                onChange={(e) => setRussian(e.target.value.replace(/[^а-яА-Я.,!?\-() ]/g, '').trimStart())}
                                type="text" 
                                id='russian' 
                                placeholder='Write here' 
                                required/>

                            <div className='modifySentenceModal__btns'>
                                <button 
                                    className='modifySentenceModal__closebtn' 
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
            </CSSTransition>
        </Portal>
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