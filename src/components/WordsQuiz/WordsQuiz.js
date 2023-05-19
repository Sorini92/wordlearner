import './wordsQuiz.scss';

const WordsQuiz = ({setVariant, setActive}) => {
    return (
        <div className="wordsquiz">
            <div className='wordsquiz__form'>
                <div onClick={() => setActive(false)} className='wordsquiz__close'>&times;</div>

                <div className='wordsquiz__wrapper'>
                    <div className="wordsquiz__question">Pen</div>
                    <ul className='wordsquiz__variants'>
                        <li className='wordsquiz__variant'>dfssdf</li>
                        <li className='wordsquiz__variant'>vxvxc</li>
                        <li className='wordsquiz__variant'>dfsredgredsdf</li>
                        <li className='wordsquiz__variant'>dfsswefdzxxcdf</li>
                    </ul>
                </div>

                <div className='wordsquiz__btns'>
                    <button className='wordsquiz__btn' onClick={() => setVariant('')}>To main page</button>
                    <button className='wordsquiz__btn'>Next quistion</button>
                </div>
            </div>
        </div>
    )
}

export default WordsQuiz;