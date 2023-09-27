import database from "../../firebase";
import { setDoc, collection, doc } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { CSSTransition } from "react-transition-group";
import Portal from "../Portal/Portal";
import './addWordModal.scss';

const AddWordModal = ({width, height, maxLength, active, setActive, address, func, items, setMessage, setShowMessage, selectedWord}) => {

    const [english, setEnglish] = useState('');
    const [russian, setRussian] = useState('');
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedWord !== undefined) {
            if (!!selectedWord.match(/[^а-я-]/g)) {
                setEnglish(selectedWord);
                setRussian('')
            } else {
                setEnglish('')
                setRussian(selectedWord);
            }
        }
    }, [selectedWord])

    const handleSubmit = (e) => {
        e.preventDefault();

        const index = items.findIndex(e => e.english === english.toLowerCase());

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
                classNames={"addmodal"}
            >
                <div className="addmodal" onClick={() => setActive(false)}>
                    <div 
                        style={{width: `${width}px`, height: `${height}px`}}
                        className="addmodal__content" 
                        onClick={e => e.stopPropagation()}
                        onKeyDown={handleEnterPress}
                    >
                        <form className='addmodal__form' onSubmit={handleSubmit}>
                            <div className='addmodal__title'>Add new word</div>

                            <label htmlFor="english">English</label>
                            <input 
                                value={english}
                                maxLength={maxLength}
                                onChange={(e) => setEnglish(e.target.value.replace(/[^a-zA-Z-.,!?() ]/g, '').trimStart())}
                                type="text" 
                                id='english' 
                                placeholder='Write here' 
                                required
                            />

                            <label htmlFor="russian">Russian</label>
                            <input 
                                value={russian}
                                maxLength={maxLength}
                                onChange={(e) => setRussian(e.target.value.replace(/[^а-яА-Я-.,!?() ]/g, '').trimStart())}
                                type="text" 
                                id='russian' 
                                placeholder='Write here' 
                                required
                            />

                            <div className='addmodal__btns'>
                                <button 
                                    className='addmodal__closebtn' 
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
            </CSSTransition>
        </Portal>     
    )
}

AddWordModal.propTypes = {
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
    selectedWord: PropTypes.string
}

export default AddWordModal;