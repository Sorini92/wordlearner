import database from "../firebase";
import { getDocs, collection, disableNetwork } from 'firebase/firestore';

export const useGetData = () => {

        const request = async (url) => {
            /* await disableNetwork(database);
            console.log("Network disabled!"); */
            
            try {
                let dataRef;

                if (url.firstUrl !== 'users') {
                    dataRef = await collection(database, url.firstUrl);
                } else {
                    dataRef = await collection(database, url.firstUrl, url.secondUrl, url.thirdUrl);
                }
                
                const data = await getDocs(dataRef);

                const fileredData = data.docs.map((doc) => {
                    return {
                        ...doc.data()
                    }
                })

                return fileredData;
                
            } catch(e) {
                console.log(e)
                throw e;
            }
        }
        
    return {request}
}

