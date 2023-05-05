import './reverseArrows.scss';
import arrows from '../../resources/arrow.png';

const ReverseArrows = ({setReverseWords, reverseWords}) => {
    return (
        <div onClick={() => setReverseWords(!reverseWords)} className='reverse'>
            <img src={arrows} alt='arrows'/>
        </div>
    )
}

export default ReverseArrows;