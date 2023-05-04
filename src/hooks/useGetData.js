import { getDatabase, ref, onValue, query, orderByChild } from "firebase/database";

export const useGetData = () => {
    const fetchData = (link, setFunc, emptyBaseFunc, errorFunc) => (dispatch) => {

        const db = getDatabase();
        const words = ref(db, link);
        
        try {
            onValue(words, (snapshot) => {
                if (snapshot.exists()) {
                    const data = Object.values(snapshot.val());
                    dispatch(setFunc(data));
                } else {
                    dispatch(emptyBaseFunc())
                    console.log("No data available");
                }
            })
        } catch (e) {
            console.log(e);
            dispatch(errorFunc());
        }
    };

    return {fetchData}
}

