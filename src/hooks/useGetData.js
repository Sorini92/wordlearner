import { database } from "../firebase";
import { getDocs, collection, orderBy, query, limit } from 'firebase/firestore';

export const useGetData = () => {
        
        const request = async (url) => {
            try {
                const dataRef = await collection(database, url.firstUrl, url.secondUrl, url.thirdUrl);
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

