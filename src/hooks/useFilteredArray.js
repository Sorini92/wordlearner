import { useEffect, useRef } from "react";

const useFilteredArray = (array, selectedLetter, searchedWord) => {
    
    const filtered = useRef([])
    const filteredLength = useRef(0)

    useEffect(() => {
        let data = [];

        if (searchedWord.length > 0) {
            if (!!searchedWord.match(/[^а-я]/g)) {
                data = array.filter(item => {
                    if (item.english !== undefined) {
                        return item.english.toLowerCase().includes(searchedWord)
                    } else {
                        return item.baseForm.toLowerCase().includes(searchedWord)
                    }
                })
            } else {
                data = array.filter(item => {
                    if (item.russian !== undefined) {
                        return item.russian.toLowerCase().includes(searchedWord)
                    } else {
                        return item.translation.toLowerCase().includes(searchedWord)
                    }
                })
            }
        } else {
            if (selectedLetter.length !== 0) {
                if (!!selectedLetter.match(/[^а-я]/g)) {
                    data = array.filter(item => {
                        if (item.english !== undefined) {
                            return item.english.toLowerCase().slice(0, 1) === selectedLetter
                        } else {
                            return item.baseForm.toLowerCase().slice(0, 1) === selectedLetter
                        }
                    })
                } else {
                    data = array.filter(item => {
                        if (item.russian !== undefined) {
                            return item.russian.toLowerCase().slice(0, 1) === selectedLetter
                        } else {
                            return item.translation.toLowerCase().slice(0, 1) === selectedLetter
                        }
                    })
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