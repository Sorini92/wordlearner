import { getDatabase, ref, child, get } from "firebase/database";

export const useGetData = () => {
    const fetchData = (link, func) => (dispatch) => {
        const dbRef = ref(getDatabase());
    
        get(child(dbRef, link))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(func(Object.values(snapshot.val())));
                    
                } else {
                    console.log("No data available");
                }
                })
            .catch((error) => {
                console.error(error);
        });
    };

    return {fetchData}
}