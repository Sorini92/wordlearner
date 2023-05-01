import "./navigation.scss";

const Navigation = () => {
    return (
        <>
            <div className="navigation__line"></div>
            <div className="navigation">
                <div className="navigation__tabs">
                    <a href="#" className="navigation__tab">Words</a>
                    <a href="#" className="navigation__tab">Sentences</a>
                </div>
                <input 
                    className="navigation__search"
                    placeholder="Search"
                />
                <button className="navigation__searchconfirm">Search</button>
            </div>
        </>
    )
}

export default Navigation;