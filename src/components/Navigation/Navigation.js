import { Link } from "react-router-dom";
import { useState } from "react";
import "./navigation.scss";

import { getDatabase, ref, onValue} from "firebase/database";

const Navigation = ({setSearchedWord}) => {

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
        setWord(value)
        const db = getDatabase();
        
        if (!!value.match(/[^а-я]/g)) {
            try {
                const words = ref(db, `/words/${word}`);
                onValue(words, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setSearchedWord([data]);
                    } else {
                        console.log("No data available");
                    }
                })
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const words = ref(db, `/words/${word}`);
                onValue(words, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setSearchedWord([data]);
                    } else {
                        console.log("No data available");
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }
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
                    /* onChange={(e) => handleSearch(e.target.value.replace(/[^a-z, а-я]/g, ''))} */
                    onChange={(e) => setWord(e.target.value.replace(/[^a-z, а-я]/g, ''))}
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