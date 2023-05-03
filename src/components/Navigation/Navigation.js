import { Link } from "react-router-dom";
import { useState } from "react";
import "./navigation.scss";

import { getDatabase, ref, onValue} from "firebase/database";

const Navigation = () => {

    const [word, setWord] = useState('');
    const [active, setActive] = useState(0);

    const links = [
        {to: '/words', text: 'Words'},
        {to: '/sentences', text: 'Sentences'},
    ]

    const handleClick = (index) => {
        setActive(index);
    };  

    const handleSearch = (value) => {
        const db = getDatabase();
        let word = 'd206c9b0-afc1-49d6-aa60-798c7a703f91';
        const starCountRef = ref(db, 'words/' + word);

        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
        });
    }

    const tabs = links.map((item, i) => {
        return (
            <Link 
                key={i} 
                to={item.to} 
                className={i === active ? `navigation__tab activeTab` : `navigation__tab`} 
                onClick={() => handleClick(i)}>
                    {item.text}
            </Link>
        )
    })

    return (
        <>
            <div className="navigation__line"></div>
            <div className="navigation">
                <div className="navigation__tabs">
                    {tabs}
                </div>
                <input 
                    value={word}
                    className="navigation__search"
                    placeholder="Search"
                    onChange={(e) => setWord(e.target.value)}
                />
                {word.length > 0 ? 
                <button 
                    type="submit"
                    className="navigation__searchconfirm"
                    onClick={() => handleSearch(word)}
                >
                    Search
                </button> : null}
            </div>
        </>
    )
}

export default Navigation;