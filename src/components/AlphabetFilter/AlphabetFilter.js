import { Fragment } from 'react';
import './alphabetFilter.scss';

const AlpabetFilter = ({setSelectedLetter}) => {

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const elements = (array => {
        return array.map((item, i) => {
            return (
                <Fragment key={i}>
                    <div className='alphabet__letter' onClick={() => setSelectedLetter(item)}>{item}</div>
                    <div className='alphabet__dot'>&bull;</div>
                </Fragment>
            )
        })
    })

    return (
        <div className='alphabet'>
            {elements(alphabet)}
            <div className='alphabet__all' onClick={(e) => setSelectedLetter('')}>all words</div>
        </div>
    )
}

export default AlpabetFilter;