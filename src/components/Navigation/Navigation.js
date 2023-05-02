import { useState } from "react";
import "./navigation.scss";

const Navigation = () => {

    const [word, setWord] = useState('');

    return (
        <>
            <div className="navigation__line"></div>
            <div className="navigation">
                <div className="navigation__tabs">
                    <a href="#" className="navigation__tab">Words</a>
                    <a href="#" className="navigation__tab">Sentences</a>
                </div>
                <input 
                    value={word}
                    className="navigation__search"
                    placeholder="Search"
                    onChange={(e) => setWord(e.target.value)}
                />
                {word.length > 0 ? <button className="navigation__searchconfirm">Search</button> : null}
            </div>
        </>
    )
}

export default Navigation;