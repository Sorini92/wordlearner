import { useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const getSearchParam = (search, param) => {
    const searchParams = new URLSearchParams(search)
    return searchParams.get(param);
}

const setSearchParam = (search, param, value) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set(param, value);
    return searchParams.toString();
}

const useSearchParamsState = ({name, serialize = String, deserialize = v => v}) => {

    let location = useLocation();
    let navigate = useNavigate();

    const [value, setValue] = useState(() => {
        const initialValue = deserialize(getSearchParam(location.search, name))
        return initialValue;
    })

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageValue = searchParams.get(name) || '';
        
        setValue(pageValue);
    }, [location.search, name]);
    
    const updateValue = useCallback((value) =>  {
        setValue(value)

        const newSearch = setSearchParam(location.search, name, serialize(value))

        navigate({ search: newSearch });
        // eslint-disable-next-line
    }, [location.search, name])

    return [value, updateValue];
}

export default useSearchParamsState;