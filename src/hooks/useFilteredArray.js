import { useEffect, useRef } from "react";

const useFilteredArray = (array, selectedLetter, searchedWord) => {
    
    const filtered = useRef([])
    const filteredLength = useRef(0)

    useEffect(() => {
        let data = [];

        if (searchedWord.length > 0) {
            if (!!searchedWord.match(/[^а-я]/g)) {
                data = array.filter(item => item.english.toLowerCase().includes(searchedWord))
            } else {
                data = array.filter(item => item.russian.toLowerCase().includes(searchedWord))
            }
        } else {
            if (selectedLetter.length !== 0) {
                if (!!selectedLetter.match(/[^а-я]/g)) {
                    data = array.filter(item => item.english.toLowerCase().slice(0, 1) === selectedLetter)
                } else {
                    data = array.filter(item => item.russian.toLowerCase().slice(0, 1) === selectedLetter)
                }
            } 
        }

        filtered.current = data;
        filteredLength.current = data.length;

    }, [array, selectedLetter, searchedWord]);

    return { 
        filtered: filtered.current, 
        filteredLength: filteredLength.current 
    };
};

export default useFilteredArray;