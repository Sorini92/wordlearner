import { useState, useEffect } from 'react';

const getStorageValue = (key, defaultValue) => {

	const saved = localStorage.getItem(key);
	const initial = JSON.parse(saved);
	
    return initial || defaultValue;
}

const useLocalStorage = (key, defaultValue) => {
	
    const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

	useEffect(() => {
		if (key !== undefined && key !== null) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;