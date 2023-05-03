import { getDatabase, ref, child, get, onValue } from "firebase/database";

export const useGetData = () => {
    const fetchData = (link, setFunc, emptyBaseFunc, errorFunc) => (dispatch) => {
        /* const dbRef = ref(getDatabase());
    
        get(child(dbRef, link))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(setFunc(Object.values(snapshot.val())));
                } else {
                    dispatch(emptyBaseFunc())
                    console.log("No data available");
                }
                })
            .catch((error) => {
                dispatch(errorFunc());
                console.error(error);
        }); */
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